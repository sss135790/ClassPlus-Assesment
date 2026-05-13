# 🎉 Greeting App

A modern, full-stack web application for creating and sharing personalized greeting cards. Built with cutting-edge technologies to deliver a seamless user experience for celebrating special occasions.

## 🌟 Features

### ✨ Core Functionality
- **Personalized Greeting Cards**: Create custom cards with user photos and names
- **Category-Based Organization**: Browse cards by occasion (Wedding, Birthday, Holi, Diwali, Christmas, Anniversary)
- **Real-time Preview**: See your personalized card instantly with photo and text overlays
- **Download & Share**: Download high-quality PNG images or share directly to social media
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🔐 Authentication & User Management
- **Google OAuth Integration**: Secure login with Google accounts
- **Profile Management**: Upload profile pictures and manage user information
- **Session Management**: Persistent sessions with NextAuth.js

### 💎 Premium Features
- **Premium Card Templates**: Unlock exclusive, high-quality card designs
- **HD Downloads**: High-resolution image downloads without watermarks
- **Early Access**: Get first access to new card designs and templates
- **Subscription Model**: Monthly premium plans for enhanced features

### 🎨 Card Customization
- **Photo Positioning**: Precise placement of profile photos on cards
- **Text Overlay**: Custom name placement with perfect typography
- **Circular Photo Masks**: Professional circular cropping for profile images
- **Multiple Layouts**: Various positioning options for different card designs

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Authentication**: NextAuth.js 5.0.0-beta.31
- **UI Components**: React 19.2.4 with custom components
- **State Management**: React hooks and context
- **Build Tool**: Next.js built-in bundler

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.2.1
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: Cloudinary for image uploads and management
- **Authentication**: JWT tokens via NextAuth.js
- **CORS**: Configured for secure cross-origin requests

### Development Tools
- **Package Manager**: npm
- **Development Server**: Next.js dev server + nodemon for backend
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Environment**: dotenv for configuration management

## 📁 Project Structure

```
greeting-app/
├── frontend/                    # Next.js frontend application
│   ├── app/                     # Next.js App Router pages
│   │   ├── api/                 # API routes (NextAuth)
│   │   ├── card/[id]/           # Individual card detail pages
│   │   ├── cards/[category]/    # Category card listing pages
│   │   ├── components/          # Reusable React components
│   │   ├── data/                # Static data and card definitions
│   │   ├── home/                # Home page with categories
│   │   ├── login/               # Authentication page
│   │   ├── pricing/             # Premium subscription page
│   │   └── profile/             # User profile management
│   ├── auth.ts                  # NextAuth configuration
│   ├── globals.css              # Global styles
│   └── public/                  # Static assets (card images)
├── backend/                     # Express.js backend API
│   ├── prisma/                  # Prisma database schema
│   ├── src/                     # Source code
│   │   ├── db.ts                # Database connection
│   │   └── generated/           # Prisma client
│   └── server.ts                # Main server file
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greeting-app
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**

   Create `.env.local` in the frontend directory:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

   Create `.env` in the backend directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/greeting_app
   DIRECT_URL=postgresql://username:password@localhost:5432/greeting_app
   MONGODB_URI=mongodb://localhost:27017/greeting_app
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

5. **Database Setup**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

6. **Start the development servers**

   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication routes

### User Profile
- `POST /api/profile` - Create/update user profile with image upload
- `GET /api/profile/:email` - Fetch user profile data

### Card Data
- Static card data served from frontend `/data/cards.ts`
- Categories: wedding, birthday, holi, diwali, christmas, anniversary

## 🎨 Card System

### Card Structure
Each card contains:
- **ID**: Unique identifier
- **Title**: Card name
- **Category**: Occasion type
- **Image**: Base card template
- **Name Position**: X,Y coordinates for text overlay
- **Photo Position**: X,Y coordinates and size for photo overlay
- **Premium**: Boolean flag for premium-only cards

### Image Processing
- **Canvas API**: Client-side image composition
- **Cloudinary**: Server-side image storage and optimization
- **Format**: PNG export for high quality
- **Resolution**: Maintains original card resolution

## 🔒 Security Features

- **OAuth 2.0**: Secure Google authentication
- **CORS**: Configured for frontend-backend communication
- **File Validation**: Image upload restrictions (5MB, image types only)
- **Environment Variables**: Sensitive data stored securely
- **TypeScript**: Type safety throughout the application

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Tailwind CSS responsive utilities
- **Touch-Friendly**: Large touch targets for mobile interaction
- **Dark Mode**: System preference detection and manual toggle

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel with environment variables
```

### Backend (Railway/Heroku)
```bash
npm run build
# Deploy with environment variables configured
```

### Database
- **PostgreSQL**: Managed database service (Supabase)
- **Prisma**: Automated migrations and schema management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Google for OAuth integration
- Cloudinary for image management
- All contributors and users

---

**Made with ❤️ for spreading joy and celebrations**#   C l a s s P l u s - A s s e s m e n t  
 