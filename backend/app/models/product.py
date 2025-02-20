# from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Enum
# from sqlalchemy.sql import func
# import enum
# from app.database import Base

# class VehicleType(enum.Enum):
#     CAR = "car"
#     MOTORCYCLE = "motorcycle"
#     BOAT = "boat"

# class Product(Base):
#     __tablename__ = "products"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True, nullable=False)
#     description = Column(Text)
#     price = Column(Float, nullable=False)
#     vehicle_type = Column(Enum(VehicleType), nullable=False)
#     brand = Column(String, index=True)
#     model = Column(String)
#     year = Column(Integer)
#     mileage = Column(Float)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Boolean, Column, Integer, String, Float, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
import enum
from app.database import Base

# ✅ Vehicle Type Enum
class VehicleType(enum.Enum):
    CAR = "car"
    MOTORCYCLE = "motorcycle"
    BOAT = "boat"

# ✅ Purchase or Rental Enum
class TransactionType(enum.Enum):
    SALE = "sale"
    RENTAL = "rental"

# ✅ Dossier Status Enum
class DossierStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(String)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    vehicle_type: Mapped[VehicleType] = mapped_column(Enum(VehicleType), nullable=False)
    transaction_type: Mapped[TransactionType] = mapped_column(Enum(TransactionType), nullable=False)
    brand: Mapped[str] = mapped_column(String, nullable=True)
    model: Mapped[str | None] = mapped_column(String)
    year: Mapped[int | None] = mapped_column(Integer)
    mileage: Mapped[float | None] = mapped_column(Float)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[DateTime | None] = mapped_column(DateTime(timezone=True), onupdate=func.now())

class Dossier(Base):
    __tablename__ = "dossiers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey("products.id"), nullable=False)
    status: Mapped[DossierStatus] = mapped_column(Enum(DossierStatus), default=DossierStatus.PENDING, nullable=False)
    document_link: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
