from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime, Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from app.database import Base
import enum
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class DossierStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class DossierType(str, enum.Enum):
    PURCHASE = "purchase"
    RENTAL = "rental"

class Dossier(Base):
    __tablename__ = "dossiers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    dossier_type = Column(Enum(DossierType), nullable=False)
    status = Column(Enum(DossierStatus), default=DossierStatus.PENDING)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed_at = Column(DateTime(timezone=True))
    reviewed_by = Column(Integer, ForeignKey("users.id", name="fk_dossiers_reviewed_by"), nullable=True)  

    down_payment = Column(Float)
    loan_amount = Column(Float)
    rental_duration = Column(Integer)
    start_date = Column(DateTime)

  
    user = relationship("User", foreign_keys=[user_id], back_populates="dossiers") 
    reviewer = relationship("User", foreign_keys=[reviewed_by], back_populates="reviewed_dossiers")  
    product = relationship("Product", back_populates="dossiers")


class DossierCreate(BaseModel):
    product_id: int
    dossier_type: str  
    down_payment: Optional[float] = None
    loan_amount: Optional[float] = None
    rental_duration: Optional[int] = None
    start_date: Optional[datetime] = None

class DossierResponse(DossierCreate):
    id: int
    user_id: int
    status: str  
    created_at: str

    class Config:
        from_attributes = True  