# Google OAuth2 Authentication App

A Node.js application demonstrating Google OAuth2 authentication with Express and Passport.js.

## Features

- Google OAuth2 login
- Session management
- Protected routes
- User profile display
- MongoDB integration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with:
   ```
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   SESSION_SECRET=your-session-secret
   MONGODB_URI=your-mongodb-uri
   ```

3. Run the application:
   ```bash
   npm start
   ```

## Live Demo

Visit: [Your deployed URL will be here]

## How to Use

1. Click "Authenticate with Google"
2. Login with your Google account
3. View your profile information
4. Logout when done

## Tech Stack

- Node.js
- Express.js
- Passport.js
- MongoDB
- Google OAuth2