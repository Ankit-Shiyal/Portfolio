# Ankit Shiyal - Portfolio Website

Full Stack Developer Portfolio built with React, Node.js, MongoDB, and Tailwind CSS.

## Tech Stack

**Frontend:** React + Vite, Tailwind CSS, Framer Motion
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas
**Email:** Nodemailer (Gmail)
**Deployment:** Frontend → Vercel, Backend → Render

## Features

- Modern hero section with typing animation
- Animated skill bars and circular progress indicators
- Dynamic project cards with category filtering and search
- Education timeline
- Fully functional contact form with MongoDB storage and email notifications
- Dark/Light theme toggle with localStorage persistence
- Responsive design (Mobile, Tablet, Laptop, Desktop)
- SEO optimized (Meta tags, Open Graph, Sitemap, Robots.txt)
- Performance optimized (Lazy loading, Code splitting, Image optimization)
- Glassmorphism effects and premium animations

## Project Structure

```
portfolio/
├── frontend/          # React + Vite frontend
│   ├── public/        # Static assets
│   └── src/           # Source code
│       ├── components/ # React components
│       └── context/   # Context providers
├── backend/           # Express.js backend
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── config/        # Configuration
├── .gitignore
└── README.md
```

## Local Development

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account for Nodemailer

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=ankitshiyal2005@gmail.com
```

Run the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## API Routes

| Method | Route           | Description          |
|--------|-----------------|----------------------|
| POST   | /api/contact    | Submit contact form  |
| GET    | /api/health     | Health check         |

## Deployment

### Frontend (Vercel)

1. Push the frontend folder to a GitHub repository
2. Import the project in Vercel
3. Set the root directory to `frontend`
4. Set build command: `npm run build`
5. Set output directory: `dist`

### Backend (Render)

1. Push the backend folder to a GitHub repository
2. Create a new Web Service on Render
3. Set root directory to `backend`
4. Set start command: `npm start`
5. Add environment variables (MONGODB_URI, EMAIL_USER, EMAIL_PASS, etc.)

## Environment Variables

| Variable        | Description                    |
|-----------------|--------------------------------|
| PORT            | Server port (default: 5000)    |
| MONGODB_URI     | MongoDB connection string      |
| EMAIL_USER      | Gmail address for Nodemailer   |
| EMAIL_PASS      | Gmail app password             |
| CONTACT_EMAIL   | Email to receive notifications |
| FRONTEND_URL    | Frontend URL for CORS          |

## Contact

- **Email:** [ankitshiyal2005@gmail.com](mailto:ankitshiyal2005@gmail.com)
- **Phone:** +91 9624908290
- **GitHub:** [Ankit-Shiyal](https://github.com/Ankit-Shiyal)
- **LinkedIn:** [ankit-shiyal](https://linkedin.com/in/ankit-shiyal-740734307)
