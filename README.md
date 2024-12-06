# Passthesalt

Is a full-stack password manager application designed to securely store and retrieve user login credentials. The system ensures that passwords are encrypted before being saved to the database and can only be decrypted when needed by the client. Built using React.js with Vite and Tailwind CSS for the frontend, and Node.js, Sequelize, and PostgreSQL for the backend, this application is a secure, scalable, and maintainable solution for managing sensitive user information.

## Key Features:

Secure Password Storage:
The application uses the crypto library's AES encryption algorithm to encrypt passwords during storage. When a user retrieves their credentials, the system decrypts the password, ensuring sensitive data is protected at all times.

### User Authentication:

- A secure authentication system is implemented using JWT (JSON Web Tokens) to handle user login, registration, and session management. JWT tokens are used to secure API endpoints and ensure only authenticated users can access certain resources, such as password data.

### Database with Sequelize and PostgreSQL:

- The backend uses Sequelize ORM with a PostgreSQL database to create a scalable and maintainable structure for storing user credentials and data. The database is designed to grow with the application, utilizing migrations and models for easy updates and structure management.

### Scalable and Maintainable API:

- The API is built to be both scalable and maintainable, with a focus on security, performance, and code quality. It supports creating, updating, deleting, and retrieving user credentials while keeping security at the forefront with encryption and secure authentication methods.

### Seamless User Registration and Password Hashing:

- During user registration, Sequelize hooks and validations ensure that all inputs are properly validated. Passwords are automatically hashed using bcrypt before being stored in the database, ensuring that even the database cannot access the original password, which adds an additional layer of security against potential breaches.

### Technologies Used:

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM
- Security: AES Encryption, JWT, bcrypt
