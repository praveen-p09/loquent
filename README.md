# Loquent - Blog Website

Loquent is a full-stack blog website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, read, update, and delete blog posts through a modern and responsive user interface.

## Video Demonstration



https://github.com/praveen-p09/loquent/assets/128630671/1d9072db-3c34-4709-9121-48b2b3068cf8





## Features

- **User Authentication**: Secure authentication system using JSON Web Tokens (JWT) for login and registration.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on blog posts.
- **File Uploads**: Capability to upload images for blog post covers.
- **Responsive Design**: Mobile-friendly design for seamless user experience across devices.

## Technologies Used

- **Frontend**: React.js, Material-UI for UI components, Axios for HTTP requests.
- **Backend**: Node.js, Express.js for RESTful API, MongoDB Atlas for cloud database.
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing.
- **File Uploads**: Multer for handling file uploads.

## Prerequisites

Before running the application locally, ensure you have the following installed:

- yarn
- MongoDB Atlas account (for cloud database, optional if using local MongoDB)
- Git (optional, for cloning repository)

## Getting Started

### Root Directory Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/praveen-p09/loquent.git
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```
3. **Environment Variables**:
   Create a `.env` file in the root of the backend directory and add your MongoDB connection URI and JWT secret:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
   Create a `.env` file in the root of the frontend directory and specify the API URL:
   ```bash
   REACT_APP_API_URL=http://localhost:4000
   ```
4. **Run the App**:
   ```bash
   yarn start
   ```
   Starts server at `http://localhost:4000` and React app at `http://localhost:3000`

OR

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/praveen-p09/loquent.git
   cd api
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```
3. **Environment Variables**:
   Create a `.env` file in the root of the backend directory and add your MongoDB connection URI and JWT secret:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. **Run the Server**:
   ```bash
   yarn start
   ```
   Starts server at `http://localhost:4000`

### Frontend Setup

1. **Navigate to Frontend Directory**:
   ```bash
   cd ../client
   ```
2. **Install Dependencies**:
   ```bash
   yarn install
   ```
3. **Environment Variables**:
   Create a `.env` file in the root of the frontend directory and specify the API URL:
   ```bash
   REACT_APP_API_URL=http://localhost:4000
   ```
4. **Run the Development Server**:
   ```bash
   yarn start
   ```
   Starts React app at `http://localhost:3000`

### Contributing

Contributions are welcome! Fork the repository and submit a pull request with your improvements.
