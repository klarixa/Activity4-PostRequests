#!/bin/bash

# POST Requests Discovery Challenge Setup
# Activity 04: Master HTTP POST, PUT, DELETE operations

echo "🎯 Setting up POST Requests Discovery Challenge..."
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the activity-04-post-requests directory"
    exit 1
fi

echo "📋 Checking required files..."
required_files=("index.html" "script.js" "styles.css" "README.md")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (missing)"
    fi
done

echo ""
echo "🌐 Testing API connectivity..."
if curl -s --head https://jsonplaceholder.typicode.com/posts | head -n 1 | grep -q "200 OK"; then
    echo "   ✅ JSONPlaceholder API is accessible"
else
    echo "   ⚠️  JSONPlaceholder API may be temporarily unavailable"
fi

echo ""
echo "📚 Discovery Challenge Overview:"
echo "   🎯 Master HTTP POST, PUT, DELETE operations"
echo "   📊 Focus: CRUD operations, request headers, data serialization"
echo "   🔬 Method: RESTful API exploration and implementation"
echo ""

echo "🚀 Starting local development server..."
echo ""
echo "🎓 DISCOVERY LEARNING OBJECTIVES:"
echo "   1. Understand the difference between GET and POST requests"
echo "   2. Learn about HTTP headers and Content-Type"
echo "   3. Master JSON serialization for API communication"
echo "   4. Explore RESTful API design patterns"
echo "   5. Implement complete CRUD operations"
echo ""

if command -v python3 &> /dev/null; then
    echo "   📡 Server starting at: http://localhost:8000"
    echo "   🛑 Press Ctrl+C to stop"
    echo ""
    python3 -m http.server 8000
else
    echo "   ❌ Python not found. Use VS Code Live Server or similar."
fi

echo ""
echo "✨ Master HTTP methods beyond GET! 🎯"