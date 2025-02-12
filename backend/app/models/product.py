from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Enum
from sqlalchemy.sql import func
import enum
from app.database import Base

class VehicleType(enum.Enum):
    CAR = "car"
    MOTORCYCLE = "motorcycle"
    BOAT = "boat"

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
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 