# OI-Store

OI-Store is a full-featured e-commerce platform built with React, Firebase, and Redux. It provides a modern shopping experience with real-time updates, user authentication, and a robust admin dashboard.

## Features

- 🛍️ Product Management

  - Featured and recommended products
  - Product categories and filtering
  - Advanced product search
  - Product variants (sizes, colors)
  - Image gallery for products

- 🛒 Shopping Experience

  - Real-time shopping cart
  - Responsive design for all devices
  - Product image zoom
  - Size and color selection
  - Quantity controls

- 👤 User Management

  - User authentication
  - Profile management
  - Order history
  - Address management
  - Mobile number verification

- 📱 Admin Dashboard
  - Product management (CRUD operations)
  - Order management
  - User management
  - Featured/Recommended product controls
  - Sales analytics

## Tech Stack

- **Frontend:**

  - React 17.x
  - Redux + Redux Saga
  - Formik + Yup
  - SASS/SCSS
  - Ant Design Icons

- **Backend:**

  - Firebase
    - Authentication
    - Firestore
    - Storage
    - Cloud Functions

- **Build Tools:**
  - Vite
  - ESLint
  - Jest for testing

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/OI-Store.git
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Storage
   - Add your Firebase configuration to `.env`:

   ```bash
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MSG_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Development:**

   ```bash
   pnpm run dev # Start development server
   pnpm run build # Build for production
   pnpm run serve # Preview production build
   pnpm test # Run tests
   ```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── images/        # Static images
├── redux/         # Redux store configuration
├── services/      # Firebase and API services
├── styles/        # SCSS stylesheets
├── views/         # Page components
├── App.jsx        # Root component
└── index.jsx      # Application entry point
```

## Firebase Rules

### Storage Rules

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth!=null;
    }
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## Support

For support, email mohamedmohy900@gmail.com 
