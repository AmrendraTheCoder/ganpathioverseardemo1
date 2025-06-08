#!/bin/bash

echo "🚀 Optimizing development environment..."

# Clear caches
echo "🧹 Clearing caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Clear browser cache related files
rm -rf .eslintcache

# Memory optimization for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Enable faster file watching (macOS specific)
export WATCHMAN_ENABLE=true

# Start development server with optimizations
echo "⚡ Starting optimized development server..."
npm run dev

echo "✅ Development server optimized and running!" 