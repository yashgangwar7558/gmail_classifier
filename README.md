# Email Classification Web Application

This is a web application for fetching and classifying emails using OpenAI's GPT. Built with Next.js and Material UI, it supports user authentication, email fetching, and classification.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

## Installation

1. **Clone the Repository**

   ```bash
   https://github.com/yashgangwar7558/gmail_classifier
   cd gmail_classifier
   ```
   
 2. **Install Dependencies**
 
    ```
    npm install
    # or
    yarn install
    ```
   
3. **Set Up Environment Variables**
    Create a .env.local file in the root of your project and add the following variables:
    ```bash
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URI=http://localhost:3000
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    OPENAI_API_KEY=your_openai_api_key
    ```
    
# Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Navigate to http://localhost:3000 in your browser to view the application.

# Usage

1. **Login**
    - You will be redirected to the Google OAuth login page.
    - After successful login, you will be redirected back to the application.
2. **Fetch Emails**
    - Click the Fetch Emails button to retrieve emails from your inbox.
    - Ensure you have granted the necessary permissions to the application.
3. **Classify Emails**
    - Click the Classify Emails button to classify the fetched emails.
    - The classification will be shown next to each email in the list.
4. **View Email Details**
    - Click on an email in the list to view its details, including its subject, sender, recipient, and a snippet of its content.
    - The email's classification will be displayed in a chip on the details panel.
