from datetime import datetime
from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status, Body, Request, FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from app.database import get_db
from app.models import User, UserCreate, UserResponse, Product, TransactionType, Dossier, ProductCreate, ProductResponse, DossierCreate, DossierResponse, DossierStatus, DossierType
# from app.security import  # Import password functions
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import oauth2_scheme, get_current_user, create_access_token, hash_password, verify_password 

router = FastAPI()

@router.get("/")
def read_root():
    return {"Hello": "World"}

@router.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "error": "Validation Error",
            "message": exc.errors(),
            "path": request.url.path
        }
    )

@router.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Database Error",
            "message": str(exc),
            "path": request.url.path
        }
    )


@router.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        count = db.query(User).count()
        return {"message": "Connexion à la base de données réussie !", "users_count": count}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": "Database connection error", "message": str(e)}
        )  

@router.post("/users/signin", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        return JSONResponse(status_code=400, content={"error": "Email already registered"})

    new_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password), 
        is_admin=user.is_admin,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/users/login")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        return JSONResponse(status_code=400, content={"error": "Incorrect username or password"})

    access_token = create_access_token(data={"sub": user.username, "user_id": user.id, "is_admin": user.is_admin})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_data = get_current_user(token)
    user = db.query(User).filter(User.username == user_data["username"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return {"message": f"Hello, {user.username}! This is a protected resource."}

@router.get("/admin-only")
def admin_route(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user["username"]).first()

    if not isinstance(user, dict) or "is_admin" not in db_user:
        raise HTTPException(status_code=401, detail="Could not validate user credentials.")

    
    if not db_user or not db_user.is_admin:
        raise HTTPException(
        status_code=403,
        detail="Missing permissions: You do not have admin access."
    )

    return {"message": "Welcome, Admin!"}

@router.get("/admin/check")
def check_admin(current_user: dict = Depends(get_current_user)):
    print(f"Current User Data: {current_user}")  

    if not isinstance(current_user, dict) or "is_admin" not in current_user:
        return JSONResponse(
            status_code=401,
            content={"error": "Unauthorized", "message": "Could not validate user credentials."}
        )

    if not current_user.get("is_admin", False):
        return JSONResponse(
            status_code=403,
            content={"error": "Missing permissions", "message": "You do not have admin access."}
        )

    return {"message": "You have admin privileges"}

@router.get("/products/", response_model=List[ProductResponse])
def get_vehicles(transaction_type: TransactionType | None = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    if transaction_type:
        query = query.filter(Product.transaction_type == transaction_type)
    return query.all()


@router.get("/products/{product_id}", response_model=ProductResponse)
def get_vehicle(product_id: int, db: Session = Depends(get_db)):
    vehicle = db.query(Product).filter(Product.id == product_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.post("/products/", response_model=ProductResponse)
def add_vehicle(
    vehicle_data: ProductCreate, 
    db: Session = Depends(get_db), 
    user: dict = Depends(get_current_user)
):
    if not user["is_admin"]:
        raise HTTPException(status_code=403, detail="Admins only")

    new_vehicle = Product(**vehicle_data.dict())  
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    return new_vehicle

@router.put("/products/{product_id}/switch")
def switch_vehicle_status(product_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):

    if "is_admin" not in user:
        raise HTTPException(status_code=403, detail="User data is missing 'is_admin' key")

    if not user["is_admin"]:
        raise HTTPException(status_code=403, detail="Admins only")

    vehicle = db.query(Product).filter(Product.id == product_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    vehicle.is_for_rent, vehicle.is_for_sale = vehicle.is_for_sale, vehicle.is_for_rent  
    db.commit()

    return {"message": f"Vehicle {vehicle.name} is now {'for rent' if vehicle.is_for_rent else 'for sale'}"}


@router.post("/dossiers/")
def create_dossier(
    dossier_data: DossierCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):

    user_id = current_user.get("id")  
    if user_id is None:
        return JSONResponse(status_code=401, content={"error": "Unauthorized", "message": "User ID not found in token."})

    valid_dossier_types = {t.value for t in DossierType}

    if dossier_data.dossier_type not in valid_dossier_types:
        return JSONResponse(
            status_code=400, 
            content={"error": "Invalid dossier_type", "message": f"Must be one of {valid_dossier_types}"}
        )
    
    dossier = Dossier(
        user_id=user_id,
        product_id=dossier_data.product_id,
        dossier_type=dossier_data.dossier_type,  
        status="PENDING",  
        down_payment=dossier_data.down_payment,
        loan_amount=dossier_data.loan_amount,
        rental_duration=dossier_data.rental_duration,
        start_date=dossier_data.start_date,
    )

    db.add(dossier)
    db.commit()
    db.refresh(dossier)

    return dossier  

@router.get("/dossiers/")
def get_all_dossiers(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    if not user.get("is_admin", False):
        return JSONResponse(
            status_code=403, 
            content={"error": "Missing permissions", "message": "Admins only"}
        )

    return db.query(Dossier).all()


@router.put("/dossiers/{dossier_id}/validate")
def validate_dossier(
    dossier_id: int,
    status: DossierStatus = Body(..., embed=True),  
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
   
    if not current_user.get("is_admin", False):
        return JSONResponse(
            status_code=403, 
            content={"error": "Missing permissions", "message": "Only admins can validate dossiers."}
        )

    dossier = db.query(Dossier).filter(Dossier.id == dossier_id).first()
    if not dossier:
        return JSONResponse(
            status_code=404, 
            content={"error": "Dossier not found", "message": "No dossier with this ID."}
        )

    if dossier.status != DossierStatus.PENDING:
        return JSONResponse(
            status_code=400, 
            content={"error": "Invalid status", "message": "Dossier is already processed."}
        )

    dossier.status = status  
    dossier.reviewed_at = datetime.utcnow()
    dossier.reviewed_by = current_user["id"]

    db.commit()
    db.refresh(dossier)

    return {"message": f"Dossier {dossier_id} has been {status.value.lower()}."}