# Online Grocery Store - MERN Stack

A fully functional Online Grocery Store built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## Features

### User Features
- **Browse Products**: View a wide variety of grocery items by category.
- **Search**: Fast search functionality for products.
- **Cart Management**: Add, remove, and update item quantities in the cart.
- **User Authentication**: Secure login and registration.
- **Order History**: View past orders and status.
- **Address Management**: Save multiple delivery addresses.

### Seller/Admin Features
- **Product Management**: Add, update, and manage product stock.
- **Order Management**: View and track all customer orders.
- **Image Uploads**: Integrated with Cloudinary for product image hosting.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, React Hot Toast.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens) with Cookies.
- **Image Hosting**: Cloudinary.
- **File Uploads**: Multer.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account or local MongoDB instance.
- Cloudinary account for image storage.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd online-grocery-store
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your credentials:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SELLER_EMAIL=admin@example.com
   SELLER_PASSWORD=admin_password
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```

### Running the App

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## Deployment

The project is configured for deployment on:
- **Backend**: [Render](https://render.com/) (using `render.yaml`)
- **Frontend**: [Vercel](https://vercel.com/) (using `vercel.json`)

## License

This project is licensed under the ISC License.
