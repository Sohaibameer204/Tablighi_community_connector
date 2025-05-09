# 📱 Tableeghi Community Connector

The **Tableeghi Community Connector** is a React Native mobile application built with Expo that aims to streamline and enhance the way Tableeghi Jamaats organize, record, and share information. It offers digital tools to help Ameer users and participants register, comment on mosques, and follow essential Tableeghi principles.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Login, Signup, Password Reset, and Email Verification
- 🕌 **Mosque Registration & Status**
  - Register with mosque selection
  - Track mosque sentiment (positive/negative) using keyword-based sentiment logic
- 💬 **Comment System**
  - Ameer-only comment feature
  - Sentiment analysis (via keyword detection like "not aware", "lack", etc.)
  - Dynamic color-coding for mosque status
- 🧭 **Map Integration**
  - Locate nearby mosques using maps
- 📋 **Do & Don’t Guidelines**
  - Includes: 12 Usool, Adab of Ghasht, 5 Amal, Items to Bring, and the 6 Points
- 📅 **Event Tracker**
  - View upcoming Tableeghi Jamaat events
- 🔁 **Logout & Reset**
  - Secure logout, password reset, and splash screen for better UX

---

## 🏗️ Project Structure

src/
├── screens/
│ ├── AllTableeghiRecords.js
│ ├── CheckStatusScreen.js
│ ├── CommentScreen.js
│ ├── DoandDontScreen.js
│ ├── EventScreen.js
│ ├── HomeScreen.js
│ ├── LoginScreen.js
│ ├── LogoutScreen.js
│ ├── MapScreen.js
│ ├── MosqueList.js
│ ├── Mosques with facilities.js
│ ├── PasswordResetScreen.js
│ ├── RegistrationScreen.js
│ ├── SettingsScreen.js
│ ├── SignupScreen.js
│ ├── SplashScreen.js
│ ├── VerificationScreen.js
│ └── WelcomeScreen.js
├── firebase.js
assets/
└── (App images and icons)

---

## 🔄 CI/CD Integration

This project utilizes **Expo Application Services (EAS)** for a fully automated **CI/CD pipeline**:

- ⚙️ Builds and deploys the app with a single command
- 🔄 Pushes OTA (Over-The-Air) updates using Expo
- 📤 Delivers QR code & shareable link for easy access

### ⚡ To Build and Share:

1. **Install dependencies**:
   ```bash
   npm install
   
Run on local device or emulator:
npx expo start
📲 Scan the QR code with the Expo Go app to run the app on your phone!

Build the installable version using CI/CD:
eas build --platform android
After build completes:

Get your shareable link and QR code from your Expo dashboard

Access the application by copy these URL's into your expo go app or scan the below QR code 
Update details page URL
https://expo.dev/preview/update?message=CI%3A%20Auto%20deploy%20from%20GitHub%20Actions&updateRuntimeVersion=1.0.0&createdAt=2025-05-04T10%3A33%3A16.627Z&slug=exp&projectId=011616f7-d8fd-46d1-b7f5-f78de2292a60&group=5c0c8bf1-b5a6-43b6-9d6d-6c621ef617fa
Update deep link URL
exp+://expo-development-client/?url=https://u.expo.dev/011616f7-d8fd-46d1-b7f5-f78de2292a60/group/5c0c8bf1-b5a6-43b6-9d6d-6c621ef617fa


![QRcode png](https://github.com/user-attachments/assets/bfbc12ef-cc29-4d65-b0f7-8b15ef9fc821)

Share with anyone—no Play Store or App Store required!

🌍 Anyone with the link or QR code can install and use the app on their Android or iOS devices.

📧 Contact
For suggestions, feedback, or collaboration:

👤 Sohaib Khan
📧 Sohaibameer204@gmail.com
🔗 LinkedIn – www.linkedin.com/in/sohaib-khan-0a95692a4






