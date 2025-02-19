from pydantic import BaseModel, EmailStr
from datetime import datetime
from enum import Enum
from typing import Optional

class VehicleType(str, Enum):
    CAR = "car"
    MOTORCYCLE = "motorcycle"
    BOAT = "boat"

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    vehicle_type: VehicleType
    brand: str
    model: str
    year: int
    mileage: float
    is_for_sale: bool = True
    is_for_rent: bool = False

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  # Permet la conversion des modèles SQLAlchemy en schémas Pydantic

class RentalDetailsBase(BaseModel):
    monthly_price: float
    minimum_duration_months: int
    includes_insurance: bool = True
    includes_assistance: bool = True
    includes_maintenance: bool = True
    includes_technical_check: bool = True

class DossierBase(BaseModel):
    product_id: int
    dossier_type: str  # 'purchase' ou 'rental'
    down_payment: Optional[float] = None
    loan_amount: Optional[float] = None
    rental_duration: Optional[int] = None
    start_date: Optional[datetime] = None

class DossierCreate(DossierBase):
    pass

class Dossier(DossierBase):
    id: int
    user_id: int
    status: str
    submitted_at: datetime
    reviewed_at: Optional[datetime] = None
    reviewed_by: Optional[int] = None

    class Config:
        orm_mode = True