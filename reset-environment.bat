@echo off
echo === Animal MoCap App Environment Reset Script ===
echo This script will clean caches and reset the build environment.
echo.

echo Step 1: Cleaning Gradle caches...
cd android
if exist .gradle (
  rmdir /s /q .gradle
  echo Removed .gradle directory
)
if exist build (
  rmdir /s /q build
  echo Removed build directory
)
cd app
if exist build (
  rmdir /s /q build
  echo Removed app/build directory
)
cd ../..
echo Gradle caches cleaned.
echo.

echo Step 2: Cleaning Metro bundler cache...
if exist node_modules\.cache (
  rmdir /s /q node_modules\.cache
  echo Removed bundler cache
)
echo.

echo Step 3: Cleaning Expo caches...
if exist .expo (
  rmdir /s /q .expo
  echo Removed .expo directory
)
echo.

echo Step 4: Cleaning modules build caches...
if exist modules\react-native-vision-camera\android\build (
  rmdir /s /q modules\react-native-vision-camera\android\build
  echo Removed modules/react-native-vision-camera/android/build
)
if exist node_modules\react-native-vision-camera\android\build (
  rmdir /s /q node_modules\react-native-vision-camera\android\build
  echo Removed node_modules/react-native-vision-camera/android/build
)
if exist node_modules\react-native-gesture-handler\android\build (
  rmdir /s /q node_modules\react-native-gesture-handler\android\build
  echo Removed node_modules/react-native-gesture-handler/android/build
)
if exist node_modules\react-native-fs\android\build (
  rmdir /s /q node_modules\react-native-fs\android\build
  echo Removed node_modules/react-native-fs/android/build
)
echo Module caches cleaned.
echo.

echo Step 5: Creating required Eclipse Buildship configs...
if not exist node_modules\react-native-vision-camera\android\.settings (
  mkdir node_modules\react-native-vision-camera\android\.settings
  echo Created missing .settings directory
)
echo arguments=^

auto.sync=false^

build.scans.enabled=false^

connection.gradle.distribution=GRADLE_DISTRIBUTION(WRAPPER)^

connection.project.dir=^

eclipse.preferences.version=1^

gradle.user.home=^

java.home=C\:\Program Files\Microsoft\jdk-17.0.14.7-hotspot^

jvm.arguments=^

offline.mode=false^

override.workspace.settings=true^

show.console.view=true^

show.executions.view=true > node_modules\react-native-vision-camera\android\.settings\org.eclipse.buildship.core.prefs
echo Created Buildship config for react-native-vision-camera
echo.

echo Step 6: Watchman flush (if installed)...
where watchman >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  watchman watch-del-all
  echo Watchman caches flushed
) else (
  echo Watchman not found, skipping...
)
echo.

echo Step 7: Reinstalling node_modules (this may take a while)...
echo If you want to skip this step, press Ctrl+C now.
timeout /t 10
npm install --legacy-peer-deps
echo.

echo Step 8: Applying patches...
npx patch-package
echo.

echo === Reset complete! ===
echo.
echo You can now try running the app with one of these commands:
echo - npx expo start
echo - npx react-native run-android
echo.
echo If you still encounter issues, check GitHub issues for solutions:
echo https://github.com/nuwud/animal-mocap-app/issues
echo.
pause
