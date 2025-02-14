FROM python:3.9
WORKDIR /backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend .

CMD ["./entrypoint.sh"]