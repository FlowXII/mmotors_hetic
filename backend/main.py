from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models import User, Product, Dossier, Document, RentalDetails
from backend.app.models.schemas import DossierCreate, VehicleType
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Session
from app.database import get_db 

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- Vehicules ---
@router.get("/vehicles", tags=["Vehicles"])
def get_vehicles(
    db: Session = Depends(get_db),
    for_sale: bool | None = None,
    for_rent: bool | None = None,
    vehicle_type: VehicleType | None = None,
    brand: str | None = None
):
    query = db.query(Product)
    if for_sale is not None:
        query = query.filter(Product.is_for_sale == for_sale)
    if for_rent is not None:
        query = query.filter(Product.is_for_rent == for_rent)
    if vehicle_type:
        query = query.filter(Product.vehicle_type == vehicle_type)
    if brand:
        query = query.filter(Product.brand.ilike(f"%{brand}%"))
    return query.all()

# --- Dossiers ---
@router.post("/dossiers", status_code=status.HTTP_201_CREATED, tags=["Dossiers"])
def create_dossier(
    dossier: DossierCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_dossier = Dossier(
        **dossier.dict(),
        user_id=current_user.id,
        status="pending"
    )
    db.add(db_dossier)
    db.commit()
    db.refresh(db_dossier)
    return db_dossier

# --- Documents ---
@router.post("/dossiers/{dossier_id}/documents", tags=["Documents"])
def upload_document(
    dossier_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Stocker le fichier (AWS S3 dans la vraie vie)
    file_url = f"uploads/{dossier_id}/{file.filename}"
    
    db_doc = Document(
        dossier_id=dossier_id,
        file_url=file_url
    )
    db.add(db_doc)
    db.commit()
    return {"filename": file.filename, "dossier_id": dossier_id}

# --- Admin ---
@router.put("/admin/vehicles/{vehicle_id}/toggle", tags=["Admin"])
def toggle_vehicle_status(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    vehicle = db.query(Product).get(vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Logique de bascule
    if vehicle.is_for_sale and vehicle.is_for_rent:
        vehicle.is_for_rent = False
    else:
        vehicle.is_for_rent = not vehicle.is_for_rent
        vehicle.is_for_sale = not vehicle.is_for_sale
    
    db.commit()
    return vehicle