from typing import Union

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.models.user import User, UserCreate, UserResponse  # Ensure correct import
# from app.security import  # Import password functions
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import oauth2_scheme, get_current_user, create_access_token, hash_password, verify_password 

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        count = db.query(User).count()
        return {"message": "Connexion à la base de données réussie !", "users_count": count}
    except Exception as e:
        return {"error": f"Erreur de connexion : {str(e)}"}        

@app.post("/users/signin", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

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

@app.post("/users/login")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_data = get_current_user(token)
    user = db.query(User).filter(User.username == user_data["username"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return {"message": f"Hello, {user.username}! This is a protected resource."}

@app.get("/admin-only")
def admin_route(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user["username"]).first()
    
    if not db_user or not db_user.is_admin:
        raise HTTPException(status_code=403, detail="Admins only")

    return {"message": "Welcome, Admin!"}