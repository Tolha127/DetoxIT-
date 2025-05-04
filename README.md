# DetoxIT - Electronic Device Recycling Platform

A modern web application built with React that connects electronic device donors with recipients, promoting sustainability and reducing electronic waste.

## Overview

DetoxIT facilitates the process of donating unused electronic devices to those in need. The platform allows users to:
- Donate devices they no longer use
- Request devices they need
- Browse available devices in the catalog
- Track the impact of their contributions

## Project Structure

```
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles (Tailwind)
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── eslint.config.js     # ESLint configuration
```

## Development Guidelines

- Modify `index.html` and `src/App.jsx` as needed
- Create new folders or files in `src/` directory as needed
- Style components using TailwindCSS utility classes
- Avoid modifying `src/main.jsx` and `src/index.css`
- Only modify `vite.config.js` if absolutely necessary

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Tolha127/DetoxIT-.git
   cd DetoxIT-
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

## Available Scripts
- `pnpm install` or `npm install` - Install dependencies
- `pnpm run dev` or `npm run dev` - Start development server
- `pnpm run build` or `npm run build` - Build for production
- `pnpm run lint` or `npm run lint` - Lint source files

## Features

- **User Authentication**: Secure sign-up, login, and password recovery
- **Device Donation**: Step-by-step process for listing devices for donation
- **Device Requests**: Form for requesting specific devices with detailed specifications
- **Interactive Dashboard**: Modern, professional dashboard with statistics and activity tracking
- **Device Catalog**: Browse available devices with filtering options
- **Responsive Design**: Fully responsive for mobile and desktop devices
- **User Profiles**: Detailed user profiles with donation history and impact metrics

## Tech Stack

- React 18
- Vite
- TailwindCSS
- React Router
- ESLint
- JavaScript
