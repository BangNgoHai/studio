# Gridiron Manager - Firebase Studio

This is a Next.js application built with Firebase Studio for managing a football team. It includes AI-powered features for player analysis and team improvement suggestions.

## Getting Started

To run this application locally, you'll need to get the project files, install dependencies, and set up your environment.

### 1. Download the Project

Since you are working inside Firebase Studio, the project files are already available to you. To download them to your local computer, look for an "Export" or "Download ZIP" option in the Firebase Studio interface, likely located in the file menu or toolbar.

If this project were hosted on a version control platform like GitHub, you would typically start by "cloning" the repository with a command like this:
```bash
# Replace the URL with the actual repository URL if you have one
git clone https://github.com/example/gridiron-manager.git
cd gridiron-manager
```

### 2. Install Dependencies

Once you have the project files on your local machine, open a terminal in the project's root directory and install the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

This application uses Genkit with Google AI for its generative AI features. You will need a Google AI API key.

1.  Create a new file named `.env.local` in the root of your project.
2.  Add your Google AI API key to this file. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```
# .env.local
GOOGLE_API_KEY="YOUR_API_KEY_HERE"
```

### 4. Run the Development Servers

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

### 5. Open the Application

Once both servers are running, you can open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.
