#!/bin/bash

runner="npm"

if command -v pnpm &> /dev/null; then
    runner="pnpm"
fi

if [ ! -d "node_modules" ]; then
    echo "node_modules does not exist. Installing dependencies..."
    $runner install
fi

if [ ! -f ".env" ]; then
    echo ".env file does not exist. Copying from .env.example..."
    cp .env.example .env
fi

$runner run dev
