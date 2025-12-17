# Use a base image that supports both Python and Node.js
# Or use a multi-stage build. Multi-stage is cleaner.

# --- Stage 1: Build Frontend ---
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source
COPY frontend/ ./
# Build the React app
RUN npm run build


# --- Stage 2: Build Backend & Final Image ---
FROM python:3.11-slim

# Install system dependencies
# libgl1-mesa-glx is not available in Debian Bookworm (python:3.11-slim), use libgl1 instead.
# For robust OpenCV support (even headless), usually libgl1 and libglib2.0-0 are enough.
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend requirements first to leverage caching
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
RUN pip install gunicorn

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend assets from Stage 1
# We place them in /app/frontend/dist so app.py can find them at "../frontend/dist"
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Set environment variables
ENV FLASK_APP=backend/app.py
ENV PORT=5000

# Expose port
EXPOSE 5000

# Run with Gunicorn
# Adjust workers/threads as needed for your workload
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--chdir", "backend", "app:create_app()"]
