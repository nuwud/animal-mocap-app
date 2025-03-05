@echo off
echo ======================================
echo Switching to Simple Setup
echo ======================================
echo.

echo 1. Backing up original package.json...
copy package.json package.json.backup
echo.

echo 2. Backing up original babel.config.js...
copy babel.config.js babel.config.js.backup
echo.

echo 3. Applying simple package.json...
copy package.simple.json package.json
echo.

echo 4. Applying simple babel config...
copy babel.config.simple.js babel.config.js
echo.

echo 5. Removing node_modules...
if exist node_modules rmdir /S /Q node_modules
echo.

echo 6. Clearing npm cache...
npm cache clean --force
echo.

echo 7. Installing minimal dependencies...
npm install
echo.

echo Setup complete! You can now run:
echo npx expo start
echo.
echo To restore the original setup, run:
echo copy package.json.backup package.json
echo copy babel.config.js.backup babel.config.js
echo.
pause
