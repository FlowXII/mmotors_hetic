from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, DateTime, Enum
from sqlalchemy.sql import func
import enum
from sqlalchemy.orm import relationship
from app.database import Base
class DossierStatus(str, enum.Enum):
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
    reviewed_by = Column(Integer, ForeignKey("users.id"))
    # Champs spécifiques
    down_payment = Column(Float)
    loan_amount = Column(Float)
    rental_duration = Column(Integer)
    start_date = Column(DateTime)

    user = relationship("User")
    product = relationship("Product")
    documents = relationship("Document", back_populates="dossier")