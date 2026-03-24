# Smart Dashboard Application

A responsive, high-performance product dashboard built with React and Tailwind CSS. This application fetches real-time data from the Fake Store API and provides a seamless user experience for browsing and managing products.

## ✨ Features

- **Dynamic Product Catalog**: Fetches and displays products from `https://fakestoreapi.com`.
- **Advanced Searching**: Real-time search across titles, descriptions, and categories.
- **Smart Filtering**: Filter products by category and sort by price or rating.
- **Detailed View**: Comprehensive product detail pages with high-quality layouts.
- **Add/Edit Products**: Fully functional form with validation using `React Hook Form`. 
- **Local Persistence**: Mocked API updates handled via React Context for immediate UI feedback.
- **Premium Design**: Dark mode aesthetic with glassmorphism, smooth animations, and responsive grid layouts.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Form Management**: React Hook Form
- **API Client**: Axios
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) 

### Installation

1. **Clone the repository** (if applicable) or navigate to the project folder.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 Assumptions & Improvements

- **API Limitations**: Since the public API is visually read-only (doesn't persist POST/PUT requests), I implemented a Context-based overriding system. This allows you to add and edit products locally and see the changes reflected immediately in the dashboard.
- **Image Handling**: Used `mix-blend-lighten` for product images to ensure they look great against the dark dashboard background.
- **Performance**: Used `useMemo` for filtering and sorting logic to ensure smooth performance even with many products.
