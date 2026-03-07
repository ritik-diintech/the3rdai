# The3rdAi

Welcome to the **The3rdAi** repository! This is a modern, high-performance web application built with React, Vite, and cutting-edge animation libraries to deliver a seamless and engaging user experience.

## ✨ Features
- **Modern UI/UX**: Designed with smooth animations and interactions for a premium feel.
- **Client-Side Routing**: Fast navigation across pages using React Router.
- **Rich Animations**: Powered by GSAP, Framer Motion, and Lenis for fluid scrolling and visual effects.
- **3D Graphics**: Integrates `@react-three/fiber` and `@react-three/drei` for interactive 3D elements.
- **Optimized Performance**: Built on Vite for lightning-fast HMR and optimized production builds.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Animations**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **3D Experiences**: [Three.js](https://threejs.org/), React Three Fiber
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository
2. Navigate into the project directory:
   ```bash
   cd "The3rdAi"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and visit the URL displayed in your terminal (usually `http://localhost:5173`).

## 📦 Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production into the `dist` directory.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Lints the codebase using ESLint.

## 🌐 Deployment & Hosting

This project is configured for deployment on platforms like Netlify.
It includes a `netlify.toml` and a `public/_redirects` file that automatically handle SPA (Single Page Application) routing, making sure that direct visits or page refreshes on child routes correctly load the `index.html` file.
