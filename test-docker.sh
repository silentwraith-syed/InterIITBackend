#!/bin/bash

echo "🚀 Testing Docker Build for KGPTalks Backend"
echo "============================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker is installed"
echo ""

# Build Docker image
echo "📦 Building Docker image..."
docker build -t kgptalks-backend:test .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Docker build failed"
    exit 1
fi

echo ""
echo "🎉 Docker build test completed!"
echo ""
echo "To run with Docker Compose:"
echo "  docker-compose up --build"
echo ""
echo "To deploy to Railway:"
echo "  1. Push code to GitHub"
echo "  2. Follow steps in RAILWAY_DEPLOYMENT.md"
