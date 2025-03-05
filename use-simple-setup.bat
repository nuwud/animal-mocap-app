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

echo 3. Backing up original app.json...
copy app.json app.json.backup
echo.

echo 4. Applying simple package.json...
copy package.simple.json package.json
echo.

echo 5. Applying simple babel config...
copy babel.config.simple.js babel.config.js
echo.

echo 6. Applying simple app.json...
copy app.simple.json app.json
echo.

echo 7. Removing node_modules...
if exist node_modules rmdir /S /Q node_modules
echo.

echo 8. Clearing npm cache...
npm cache clean --force
echo.

echo 9. Installing minimal dependencies...
npm install
echo.

echo Setup complete! You can now run:
echo npx expo start
echo.
echo To restore the original setup, run:
echo copy package.json.backup package.json
echo copy babel.config.js.backup babel.config.js
echo copy app.json.backup app.json
echo.
pause
