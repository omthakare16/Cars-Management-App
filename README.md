
# Cars Marketplace Application  

This application is a **Cars Marketplace** built with a **MERN stack** (MongoDB, Express, React, and Node.js). It allows users to create, view, update, and delete car listings with image uploads managed through **Cloudinary**. The app also features user authentication for secure operations.

---

## Features  

1. **Authentication**:  
   - User registration and login with JSON Web Tokens (JWT).  
   - Middleware for protected routes.  

2. **Car Management**:  
   - **Create**: Add car listings with title, description, tags, and up to 10 images.  
   - **View**: List all car listings by a user or view specific car details.  
   - **Update**: Edit car details and replace images.  
   - **Delete**: Remove car listings and their associated images from Cloudinary.  

3. **Image Upload**:  
   - Managed through **Cloudinary** for efficient storage and access.  
   - Limits images to a maximum of 10 per car.  

4. **Responsive Design**:  
   - Frontend optimized for various screen sizes using modern CSS libraries.  

---

## Tech Stack  

### Backend:  
- **Node.js**: Runtime environment.  
- **Express.js**: Web framework for routing and middleware.  
- **MongoDB**: NoSQL database for storing user and car details.  
- **Mongoose**: ODM for MongoDB integration.  
- **Cloudinary**: Cloud-based image storage and management.  
- **multer-storage-cloudinary**: Middleware for handling image uploads.  

### Frontend:  
- **React**: User interface library.  
- **axios**: HTTP client for API calls.  
- **React Router**: For routing and navigation.  
- **lucide-react**: Icons used for UI elements.  
- **Tailwind CSS**: Utility-first CSS framework for responsive design.  

---

## Installation  

### Prerequisites:  
- Node.js (v14+ recommended).  
- MongoDB (local or hosted).  
- Cloudinary account for image hosting.  

### Backend Setup:  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/cars-marketplace.git
   cd cars-marketplace/backend
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Create a `.env` file in the `backend` directory with the following:  
   ```env
   PORT=5000  
   MONGO_URI=your-mongodb-connection-string  
   JWT_SECRET=your-jwt-secret  
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name  
   CLOUDINARY_API_KEY=your-cloudinary-api-key  
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret  
   ```  

4. Start the backend server:  
   ```bash
   npm run dev
   ```  

### Frontend Setup:  

1. Navigate to the frontend directory:  
   ```bash
   cd ../frontend
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Start the development server:  
   ```bash
   npm start
   ```  

4. Update the API base URL in the `axios` configuration if needed.

---

## Usage  

1. Register or log in to the app.  
2. Add a new car listing by filling in the title, description, tags, and uploading images.  
3. Edit car details or replace images by navigating to the **Edit** page.  
4. View all cars or specific car details on the dashboard.  
5. Delete car listings when no longer needed.  

---

## API Endpoints  

| Method | Endpoint           | Description                    | Protected |
|--------|---------------------|--------------------------------|-----------|
| POST   | `/api/auth/register` | Register a new user.           | No        |
| POST   | `/api/auth/login`    | Authenticate and get a token.  | No        |
| GET    | `/api/cars`          | Get all cars by a user.        | Yes       |
| GET    | `/api/cars/:id`      | Get a specific car by ID.      | Yes       |
| POST   | `/api/cars`          | Create a new car listing.      | Yes       |
| PUT    | `/api/cars/:id`      | Update a car's details.        | Yes       |
| DELETE | `/api/cars/:id`      | Delete a car and its images.   | Yes       |

---

## Known Issues  

- Image removal in the frontend does not update Cloudinary immediately unless the form is submitted.  
- WebSocket implementation for real-time updates can be considered in future versions.  

---

## Future Enhancements  

1. Add user roles (e.g., admin, buyer).  
2. Implement search and filter functionality for cars.  
3. Add pagination for large datasets.  
4. Real-time notifications using WebSockets.  
5. Mobile-friendly app optimization.  


---

## Contact  

For any queries, feel free to contact:  
**Om Thakare**  
[GitHub](https://github.com/omthakare16) | [LinkedIn](https://linkedin.com/in/om-thakare)  
