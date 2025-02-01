# FullStackFrontEnd

This is a React frontend project hosted on Vercel, designed to manage products and perform various operations with a modern and user-friendly interface.

### 🚀 Live Demo
https://full-stack-front-end-8nfo.vercel.app/products

### 🛠️ Setup Instructions
#### Prerequisites
Ensure you have the following installed:
- Node.js (which includes npm)

### Clone the Repository
```bash
    git clone https://github.com/nitisscode/FullStackFrontEnd.git
```
```bash
    cd FullStackFrontEnd
```

### Install Dependencies
```bash
    npm install
```
### Run the Development Server
```bash
    npm run dev
```
The application will run at http://localhost:5173/

### 📁 Code Structure
```bash
        src/
        ├── api/
        │   └── api.js               # Handles API service functions (backend interactions)
        ├── assets/
        │   └── react.svg             # Static assets (images, icons, etc.)
        ├── components/
        │   ├── auth/
        │   │   ├── login.jsx         # Login page component
        │   │   └── signup.jsx        # Signup page component
        │   ├── products/
        │   │   └── productslist.jsx  # Component for displaying the product list
        │   └── context/
        │       └── authcontext.jsx   # Context provider for authentication state
        ├── pages/                    # Folder reserved for future page components
        ├── utils/
        │   └── privateroute.jsx      # Handles protected routing for authenticated users
        ├── App.css                   # Main CSS file for application styling
        ├── App.jsx                   # Root component containing route definitions
        ├── index.css                 # Global CSS styles
        ├── main.jsx                  # Application entry point
        ├── .env                      # Environment variable file (not shared)
        ├── .gitignore                # Git ignore rules
        ├── .eslintrc.js              # ESLint configuration
        ├── index.html                # Entry HTML file
        ├── package-lock.json         # Locks dependency versions
        ├── package.json              # Project dependencies and scripts
        ├── README.md                 # Project documentation
        ├── vercel.json               # Vercel deployment configuration
        └── vite.config.js            # Vite configuration
```

### 📚 Explanation of Key Components:
- api/api.js:
    exports backend api;
- components/auth:
    Contains the following components for user authentication:

        - login.jsx: Handles user login.
        - signup.jsx: Handles user registration.

- components/products:
    Contains productslist.jsx, which displays the list of products.
- context/authcontext.jsx:
    Provides authentication state management using React Context API.

- utils/privateroute.jsx:
    Manages protected routes, ensuring that only authenticated users can access certain pages.

- App.jsx:
    The root component responsible for defining the application's routes and layout.

- main.jsx:
    The entry point of the application, responsible for rendering the root component.


### ✨ Deployment on Vercel
    Steps to Deploy:
    1. Login to Vercel:
        Visit Vercel and log in or create an account.
        
    2. Import GitHub Repository:
        Click "New Project" and import your GitHub repository.
    
    3. Configure Project Settings:
        Vercel automatically detects the framework (React). Keep the default settings.

    4. Deploy:
       Click "Deploy."
       Once the deployment is complete, you will get a live URL for your project.

### 📝 Usage Instructions
- Register and Login
- Register: Sign up with your details.
- Login: Enter your credentials to access protected features.
- Perform CRUD Operations
- Read: View the product list.
- Create: Can add a new product.
- Update: Can edit your existing product details.
- Delete: Can remove products.

### 🔄 API Endpoints
- POST /api/signup : User registration
- POST /api/login : User login
- GET /api/products : Fetch products
- POST /api/add-products : Add product
- PATCH /api/products/:id : Update product
- DELETE /api/products/:id : Delete product

### 🛡️ Authentication Handling
- Tokens are stored in localStorage.
- Protected routes require authentication.
- Tokens are passed in the Authorization header for secure API requests.


### 🤝 Contributing
- Fork the repository.
- Create a new branch (git checkout -b feature/NewFeature).
- Commit your changes (git commit -m 'Add NewFeature').
- Push to the branch (git push origin feature/NewFeature).
- Open a Pull Request.

### 📧 Contact
    Author: Nitish Kumar
    Email: nitishkumar50805@gmail.com