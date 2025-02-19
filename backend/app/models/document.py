from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from app.database import Base
from sqlalchemy.orm import relationship


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    dossier_id = Column(Integer, ForeignKey("dossiers.id"), nullable=False)
    file_url = Column(String, nullable=False)  # Lien vers le stockage (S3)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    dossier = relationship("Dossier", back_populates="documents")