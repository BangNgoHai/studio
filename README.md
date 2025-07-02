# Gridiron Manager - Firebase Studio

This is a Next.js application built with Firebase Studio for managing a football team. It includes AI-powered features for player analysis and team improvement suggestions.

## Getting Started

To run this application locally, you'll need to have Node.js and npm installed.

### 1. Install Dependencies

First, install the necessary project dependencies by running the following command in your terminal:

```bash
npm install
```

### 2. Set Up Environment Variables

This application uses Genkit with Google AI for its generative AI features. You will need a Google AI API key.

1.  Create a new file named `.env.local` in the root of your project.
2.  Add your Google AI API key to this file. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```
# .env.local
GOOGLE_API_KEY="YOUR_API_KEY_HERE"
```

### 3. Run the Development Servers

This application requires two development servers to be running simultaneously in separate terminal windows: one for the Next.js frontend and one for the Genkit AI flows.

**Terminal 1: Start the Genkit Server**

This server watches for changes in your AI flow files.

```bash
npm run genkit:watch
```

**Terminal 2: Start the Next.js Server**

This server runs the main application.

```bash
npm run dev
```

### 4. Open the Application

Once both servers are running, you can open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.
