Employee Onboarding API

Code Test – Deepak – Gaia

This is a sample backend project for Gaia, Employee onboarding :

Employee registration & login

HR/admin access

Employee profile management

Document upload & storage

Run
1. Clone the project
git clone <repo-url>
cd employee-onboarding-api

2. Install dependencies
npm install

3. Setup environment file

Create a .env file in the project root (you can copy from .env.example)

Example values:

PORT=5000
MONGO_URI=mongodb://localhost:27017/gaia_onboarding
JWT_SECRET=supersecretkey
NODE_ENV=development

4. Start the server
npm run dev   # for development (nodemon)
npm start     # for production


Server will run on  ==>  http://localhost:5000