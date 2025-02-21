from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime, Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from app.database import Base
import enum
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class VehicleType(enum.Enum):
    CAR = "car"
    MOTORCYCLE = "motorcycle"
    BOAT = "boat"

class TransactionType(enum.Enum):
    SALE = "sale"
    RENTAL = "rental"



class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    vehicle_type = Column(Enum(VehicleType), nullable=False)
    brand = Column(String, index=True)
    model = Column(String)
    year = Column(Integer)
    mileage = Column(Float)
    is_for_sale = Column(Boolean, default=True)
    is_for_rent = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    dossiers = relationship("Dossier", back_populates="product")



class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    vehicle_type: VehicleType
    transaction_type: TransactionType
    brand: str | None = None
    model: str | None = None
    year: int | None = None
    mileage: float | None = None

class ProductResponse(ProductCreate):
    id: int
    created_at: str
    updated_at: str | None = None

    class Config:
        from_attributes = True 


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

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True