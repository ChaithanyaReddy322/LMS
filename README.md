MERN Stack LMS (Learning Management System)
LMS is an open-source platform crafted to accelerate the development of modern, scalable learning management systems. It combines a robust backend with a rich, component-driven frontend, enabling developers to build feature-rich educational platforms efficiently.

💡 Overview & Features
Core Features
Customizable UI Components: Reusable, accessible React components for forms, media, notifications, and navigation.

Modern Build Tools: Leverages Vite, Tailwind CSS, and Radix UI for fast development and consistent styling.

Secure Authentication & Media Management: Centralized user management and seamless media uploads via Cloudinary.

Integrated Payment Workflows: PayPal SDK support for smooth transaction handling.

Modular Architecture: Clear separation of client and server, facilitating maintainability and scalability.

🚀 Getting Started
Prerequisites
This project requires the following dependencies:

Programming Language: JavaScript

Package Manager: Npm

Database: MongoDB Atlas (or local instance)

Installation
Build LMS from the source and install dependencies:

Clone the repository:

git clone [https://github.com/chaitanyareddy322/LMS](https://github.com/chaitanyareddy322/LMS)

Navigate to the project directory:

cd LMS

Install dependencies for both client and server:

npm install
cd server && npm install
cd ../client && npm install

⚙️ Environment Setup (CRITICAL STEP)
The application uses environment variables for configuration and secrets. You must create .env files in both the server and client directories.

A. Server Environment (server/.env)
Create a file named .env inside the root of the server folder and fill it with your own credentials.

Variable

Description

Example Value

PORT

The port the Express server will run on.

5000

CLIENT_URL

The URL of your React frontend for CORS handling.

http://localhost:5173

MONGODB_URI

Your MongoDB Atlas connection string.

mongodb+srv://user:<password>@cluster0...

JWT_SECRET

Secret key for signing and verifying JWT tokens. Must be a strong, random string.

a_very_secure_secret_key

CLOUDINARY_CLOUD_NAME

Your Cloudinary cloud name.

your_cloud_name

PAYPAL_CLIENT_ID

Your PayPal Sandbox Client ID.

AZS_...

B. Client Environment (client/.env)
Create a file named .env inside the root of the client folder and define the API base URL.

Variable

Description

Example Value

VITE_API_URL

The base endpoint for all client-side API requests. Vite requires the VITE_ prefix.

http://localhost:5000/api

▶️ Usage
Run the project:
Start the backend server (from the server directory):

npm start
# Server runs on http://localhost:5000

Start the frontend application (from the client directory):

npm run dev
# Client runs on http://localhost:5173

The application will now be accessible in your browser at http://localhost:5173/auth.

🧪 Testing
LMS currently uses manual testing for core functionality.

Run the server with the following command:

npm start

📧 Support and Queries
If you have any queries, require support, or encounter issues, please feel free to contact the author:

Email: chaitanyareddyremata@gmail.com
