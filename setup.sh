#!/bin/bash

echo "🎬 Setting up The Kinship website..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 You can now run:"
    echo ""
    echo "   npm run dev     - Start development server"
    echo "   npm run build   - Build for production"
    echo "   npm start       - Start production server"
    echo ""
    echo "📖 For deployment instructions, see DEPLOYMENT.md"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
