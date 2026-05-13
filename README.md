# 🎉 Greeting App

A modern full-stack web application for creating and sharing personalized greeting cards for every special occasion. Users can customize cards with photos and names, preview them in real time, and download or share them instantly.

---

## 🌟 Features

### ✨ Core Features

- 🎨 **Personalized Greeting Cards** — Create custom greeting cards with user photos and names
- 📂 **Category-Based Browsing** — Explore cards by occasions like Birthday, Wedding, Holi, Diwali, Christmas, and Anniversary
- ⚡ **Real-Time Preview** — Instantly preview personalized cards with live photo and text overlays
- 📥 **Download & Share** — Export cards as high-quality PNG images or share them on social media
- 📱 **Responsive UI** — Optimized for desktop, tablet, and mobile devices

### 🔐 Authentication & User Management

- 🔑 **Google OAuth Authentication** using NextAuth.js
- 👤 **User Profile Management** with profile picture uploads
- 🛡️ **Secure Session Handling** with persistent login sessions

### 💎 Premium Features

- 🌟 Access to exclusive premium card templates
- 🖼️ HD downloads without watermarks
- 🚀 Early access to newly released templates
- 💳 Subscription-based premium plans

### 🎨 Card Customization

- 📍 Precise photo positioning on templates
- ✍️ Dynamic text overlays with custom typography
- 🟠 Circular profile image masks
- 🧩 Multiple layout configurations for different card styles

---

# 🛠️ Tech Stack

## Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **UI Library:** React 19
- **State Management:** React Hooks & Context API

## Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Image Storage:** Cloudinary
- **Authentication:** JWT / NextAuth.js
- **API Security:** CORS configuration

## Development Tools

- npm
- ESLint
- TypeScript Strict Mode
- dotenv
- Nodemon

---

# 📁 Project Structure

```bash
greeting-app/
│
├── frontend/                     # Next.js frontend
│   ├── app/
│   │   ├── api/                  # NextAuth API routes
│   │   ├── card/[id]/            # Single card page
│   │   ├── cards/[category]/     # Category pages
│   │   ├── components/           # Reusable components
│   │   ├── data/                 # Static card data
│   │   ├── home/
│   │   ├── login/
│   │   ├── pricing/
│   │   └── profile/
│   │
│   ├── auth.ts
│   ├── globals.css
│   └── public/
│
├── backend/                      # Express backend
│   ├── prisma/
│   ├── src/
│   │   ├── db.ts
│   │   └── generated/
│   │
│   └── server.ts
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js 18+
- npm
- PostgreSQL
- Google OAuth credentials
- Cloudinary account

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd greeting-app
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## 🔑 Environment Variables

### Frontend (`frontend/.env.local`)

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://username:password@localhost:5432/greeting_app
DIRECT_URL=postgresql://username:password@localhost:5432/greeting_app

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5000
```

---

## 🗄️ Database Setup

```bash
cd backend

npx prisma generate
npx prisma db push
```

---

## ▶️ Run the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

### Start Frontend Server

```bash
cd frontend
npm run dev
```

---

## 🌐 Open in Browser

Visit:

```bash
http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth authentication routes |

## User Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/profile` | Create or update user profile |
| GET | `/api/profile/:email` | Fetch user profile data |

---

# 🎨 Card System

## Card Data Structure

Each card includes:

- Unique ID
- Title
- Category
- Card template image
- Text overlay coordinates
- Photo overlay coordinates
- Premium access flag

## Image Processing

- HTML5 Canvas API for client-side rendering
- Cloudinary for image storage & optimization
- PNG export for high-quality downloads

---

# 🔒 Security Features

- OAuth 2.0 Authentication
- Secure CORS configuration
- File upload validation
- Environment variable protection
- TypeScript type safety

---

# 📱 Responsive Design

- Mobile-first approach
- Tailwind responsive utilities
- Touch-friendly interactions
- Dark mode support

---

# 🚀 Deployment

## Frontend Deployment (Vercel)

```bash
npm run build
```

Deploy the frontend to Vercel with the required environment variables.

---

## Backend Deployment (Railway / Render / Heroku)

```bash
npm run build
```

Deploy the backend with all environment variables configured.

---

## Database Hosting

Recommended services:

- Supabase
- Railway PostgreSQL
- Neon

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **ISC License**.

---

# 🙏 Acknowledgements

Special thanks to:

- Next.js
- React
- Tailwind CSS
- Prisma
- Cloudinary
- Vercel
- Google OAuth

---

<div align="center">

### ❤️ Made with love to spread joy and celebrations

</div>