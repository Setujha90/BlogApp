# 📝 BlogApp - Full Stack Blogging Platform

<div align="center">
  <p>A modern, feature-rich blogging platform built with Next.js and Node.js</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=for-the-badge&logo=mongodb&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## 🚀 Features

### 📱 User Experience
- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **User Authentication** - Secure registration, login, and session management
- **Profile Management** - Customizable user profiles with avatar and cover images
- **Social Features** - Follow/unfollow users, view follower counts
- **Responsive Design** - Mobile-first approach with seamless desktop experience

### 📝 Content Management
- **Rich Text Editor** - TinyMCE integration for beautiful blog creation
- **Image Upload** - Cloudinary integration for thumbnail and content images
- **Draft System** - Save blogs as drafts or publish immediately
- **Blog Categories** - Tag-based organization and filtering
- **Search Functionality** - Find blogs by title, description, or tags

### 💬 Engagement Features
- **Like System** - Like/unlike blogs with real-time updates
- **Comment System** - Nested commenting with reply functionality
- **Bookmark System** - Save favorite blogs for later reading
- **View Tracking** - Blog view analytics and reading history
- **Social Sharing** - Share blogs with copy-to-clipboard functionality

### 🔒 Security & Administration
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access** - Admin and user role management
- **Report System** - Content moderation and reporting features
- **Protected Routes** - Middleware-based route protection

## 🏗️ Architecture

### Frontend (Next.js)
```
frontend/
├── src/
│   ├── app/
│   │   ├── (Routes)/           # App Router pages
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header/
│   │   │   ├── Home/
│   │   │   ├── Blog/
│   │   │   └── SideBar/
│   │   ├── redux/              # State management
│   │   ├── server/             # API service functions
│   │   ├── utils/              # Utility components
│   │   └── Profile/            # Profile-specific components
│   └── ...
```

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── controllers/            # Request handlers
│   │   ├── user.controller.js
│   │   ├── blog.controller.js
│   │   ├── comment.controller.js
│   │   └── report.controller.js
│   ├── models/                 # MongoDB schemas
│   │   ├── user.models.js
│   │   ├── blog.models.js
│   │   └── comment.models.js
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Custom middleware
│   ├── utils/                  # Utility functions
│   └── db/                     # Database configuration
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Redux Toolkit for global state
- **Rich Text Editor**: TinyMCE for blog content creation
- **HTTP Client**: Axios for API communication
- **Icons**: Font Awesome for UI icons

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer with Cloudinary integration
- **Password Security**: bcrypt for password hashing
- **Validation**: Custom middleware and validation

### DevOps & Tools
- **Cloud Storage**: Cloudinary for image management
- **Environment**: Environment variables for configuration
- **CORS**: Cross-origin resource sharing enabled
- **Cookie Management**: Cookie-parser for session handling

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager
- **Cloudinary account** for image uploads

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/BlogApp.git
cd BlogApp
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with the following variables:
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the frontend development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📱 API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/getCurrentUser` - Get current user

### Blog Management
- `GET /api/v1/blog` - Get all published blogs
- `POST /api/v1/blog/create` - Create new blog
- `GET /api/v1/blog/:id` - Get blog by ID
- `DELETE /api/v1/blog/:id/delete` - Delete blog
- `POST /api/v1/blog/:id/like` - Like/unlike blog
- `POST /api/v1/blog/:id/comment` - Add comment

### User Features
- `GET /api/v1/users/:id` - Get user profile
- `PATCH /api/v1/users/:id/updateProfilePic` - Update profile picture
- `PATCH /api/v1/users/:id/bookmark` - Bookmark blog
- `PATCH /api/v1/users/:id/follow` - Follow/unfollow user

## 🌟 Key Features Breakdown

### User Authentication System
- Secure JWT-based authentication with access and refresh tokens
- Password hashing using bcrypt
- Protected routes with middleware validation
- Automatic token refresh for seamless user experience

### Content Management
- Rich text editor with TinyMCE for creating beautiful blog posts
- Image upload functionality with Cloudinary integration
- Draft and publish system for content workflow
- Tag-based categorization and search functionality

### Social Features
- User following system with follower/following counts
- Real-time like and comment system
- Bookmark functionality for saving favorite content
- User profiles with customizable avatars and cover images

### Performance & UX
- Responsive design optimized for all device sizes
- Lazy loading and optimized image delivery
- Real-time updates for social interactions
- Clean, modern UI with Tailwind CSS

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TinyMCE** for the rich text editor
- **Cloudinary** for image management
- **Tailwind CSS** for the styling framework
- **Next.js** and **Express.js** communities for excellent documentation

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
</div>
