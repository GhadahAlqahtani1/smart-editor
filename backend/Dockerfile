FROM python:3.10-slim

# حدد مجلد العمل
WORKDIR /app

# انسخ ملف المتطلبات وثبت الحزم
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# انسخ كل الملفات (app.py)
COPY . .

# أمر التشغيل عبر Gunicorn للاستماع على المنفذ 7860
# --bind 0.0.0.0:7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "app:app", "--workers", "1"]
