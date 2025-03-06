# Contributing to Animal MoCap App

Thank you for your interest in contributing to the Animal MoCap App! This document provides guidelines and steps for contributing to the project.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Project Structure](#project-structure)
3. [Workflow](#workflow)
4. [Code Style](#code-style)
5. [Testing](#testing)
6. [Pull Requests](#pull-requests)
7. [Issue Reporting](#issue-reporting)

## Development Setup

### Prerequisites

- Node.js (>= 16.x)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Git

### Setting Up the Project

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/animal-mocap-app.git
   cd animal-mocap-app
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/nuwud/animal-mocap-app.git
   ```

4. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   
5. Apply patches if needed:
   ```bash
   npx patch-package
   ```

### Running the App

- For Android development:
  ```bash
  npm run android
  ```

- For iOS development:
  ```bash
  npm run ios
  ```

- Using the development server only:
  ```bash
  npm start
  ```

### Common Issues and Solutions

#### Gradle Wrapper Missing
If you encounter issues with missing Gradle wrapper files, ensure you have the following files:
- `android/gradlew.bat`
- `android/gradlew`
- `android/gradle/wrapper/gradle-wrapper.jar`
- `android/gradle/wrapper/gradle-wrapper.properties`

If these are missing, you can create them using Android Studio or by running:
```bash
cd android
gradle wrapper
```

#### Permission Issues on Android
For camera-related features, ensure your AndroidManifest.xml has the correct permissions:
- `android.permission.CAMERA`
- `android.permission.READ_MEDIA_IMAGES` (for Android 13+)
- `android.permission.READ_MEDIA_VIDEO` (for Android 13+)
- `android.permission.READ_EXTERNAL_STORAGE` (with maxSdkVersion="32")
- `android.permission.WRITE_EXTERNAL_STORAGE` (with maxSdkVersion="32")

## Project Structure

```
├── App.tsx              # Main app entry point
├── src/
│   ├── app/             # App UI components
│   │   └── components/  # Reusable UI components
│   ├── core/            # Core utilities
│   │   └── permissions/ # Permission handling logic
│   ├── data/            # Data models and storage
│   └── vision/          # Computer vision modules
├── android/             # Android platform code
├── assets/              # Images and other assets
└── patches/             # Patches for dependencies
```

## Workflow

1. Sync your fork with the upstream repository:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   
3. Make your changes and commit them with clear, descriptive messages:
   ```bash
   git add .
   git commit -m "Description of the changes"
   ```

4. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a pull request from your branch to the main repository

## Code Style

- Follow the existing code style in the project
- Use ESLint and Prettier to ensure consistent formatting
- Write meaningful variable and function names
- Add comments for complex logic or non-obvious code
- Keep functions small and focused on a single task
- Use TypeScript for type safety when possible

## Testing

- Test your changes thoroughly before submitting a PR
- Test on multiple devices when possible (especially for UI changes)
- Include automated tests for new functionality when applicable
- Verify that your changes don't break existing functionality

## Pull Requests

When submitting a pull request:

1. Create a clear title that describes the changes
2. Include a detailed description of what the PR changes
3. Reference any related issues by number (e.g., "Fixes #123")
4. Include screenshots or recordings for UI changes
5. Make sure all tests pass
6. Keep PRs focused on a single task or fix to make review easier

## Issue Reporting

When reporting an issue:

1. Use a clear and descriptive title
2. Describe the steps to reproduce the issue
3. Include expected and actual behavior
4. Provide device/environment information:
   - OS and version
   - Device model
   - React Native version
   - Any other relevant environment details
5. Include screenshots or recordings if applicable
6. Add relevant logs or error messages

Thank you for contributing to the Animal MoCap App!
