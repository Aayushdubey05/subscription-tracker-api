# Subscription-tracker-api

## Introduction

**Subscription-tracker-api** is a Node.js backend API designed to help users manage and track their various subscriptions. It provides secure authentication, subscription CRUD operations, renewal reminders via email, and integrates with modern tools like Arcjet for security and Upstash for workflow automation. The API is built using Express, MongoDB (via Mongoose), and supports modular, scalable development.

---

## Project Details

This project offers a robust backend for a subscription management platform. Key features include:

- **User Authentication:** Secure signup, login, and JWT-based session management.
- **Subscription Management:** Create, update, delete, and view subscriptions with details like plan, price, renewal date, and payment method.
- **Renewal Reminders:** Automated email reminders before subscription renewals using customizable templates.
- **Security:** Arcjet middleware for rate limiting, bot detection, and attack shielding.
- **Workflow Automation:** Upstash workflows for handling background tasks like sending reminders.
- **RESTful API Structure:** Organized routes for users, authentication, subscriptions, and workflows.
- **Error Handling:** Centralized error middleware for consistent API responses.

**Tech Stack:**
- Node.js (ESM)
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Nodemailer for emails
- Arcjet for security
- Upstash for workflows
- Day.js for date handling

---

## Running the Project Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Aayushdubey05/subscription-tracker-api.git

   cd subscription-tracker-api 

   npm install
   
   npm run dev

2. **API Endpoints**</br>
    POST /api/v1/auth/signup — Register a new user</br>
    POST /api/v1/auth/login — Login and receive JWT</br>
    POST /api/v1/subscriptions — Create a new subscription (authenticated) </br>
    GET /api/v1/subscriptions/users/:id — Get all subscriptions for a user</br>
    ...and more (see routes/ folder)

    **Example Output**</br> 
    Server is running on http://localhost:5000
    </br>
    Connected to MongoDB at mongodb+srv://... in developement mode

    **Example API Response**</br>
    *Signup*
    ```sh
    POST /api/v1/auth/signup
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }

    Response
    {
      "success": true,
      "message": "User created Successfully",
      "data": {
        "token": "<jwt_token>",
        "user": {
          "_id": "68532cdb2e0a88ca9fe4f4cb",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    }

    ```

    *Subscription Creation*
    ```sh

    POST /api/v1/subscriptions
    {
      "name": "Netflix",
      "price": 499,
      "currency": "INR",
      "frequency": "monthly",
      "category": "entertainment",
      "paymentMethod": "credit_card",
      "startDate": "2024-06-01"
    }

    Response
    {
      "succcess": true,
      "data": {
        "_id": "6853cb2ceab275a33ff62ad0",
        "name": "Netflix",
        "price": 499,
        "currency": "INR",
        "frequency": "monthly",
        "category": "entertainment",
        "paymentMethod": "credit_card",
        "status": "active",
        "startDate": "2024-06-01T00:00:00.000Z",
        "renewalDate": "2024-07-01T00:00:00.000Z",
        "user": "68532cdb2e0a88ca9fe4f4cb"
      }
    }
    
    ```
</br></br>
**Email Reminder**</br>
You will receive a styled HTML email reminding you of your upcoming subscription renewal.

**Enjoy managing your subscriptions with Subscription-tracker-api!**

