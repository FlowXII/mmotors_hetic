# Image de base Python
FROM python:3.9

# Définir le répertoire de travail
WORKDIR /backend

# Copier les dépendances
COPY backend/requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code source
COPY backend . 

# Exposer le port utilisé par FastAPI
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
