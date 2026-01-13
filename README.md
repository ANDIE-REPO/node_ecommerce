# Project Planning Document  
## E-Commerce Backend (Node.js + Express + MongoDB)

---

## Project Overview

This project is a backend-only E-commerce application built using **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**.

The focus of this project is to build a real-world backend with proper authentication, authorization, database modeling, and business rules, without involving frontend initially.

---

## What Has Been Completed (Version 1)

### Authentication & Authorization
- User signup and login using email and password  
- Password hashing using bcrypt  
- JWT-based authentication  
- JWT payload includes user id and role  
- Role-based authorization (user, admin)  
- Protected routes using JWT middleware  

---

### User Module
- Single User model for both users and admins  
- Fetch user profile  
- Change user password  
- Role stored in user schema  
- Admin restricted from user-only actions  

---

### Product Module
- Public product listing  
- Get single product by ID  
- Admin-only product creation  
- Admin-only product update  
- Admin-only soft delete  
- Role enforcement using middleware  

---

### Cart Module
- One cart per user  
- Add product to cart  
- Update product quantity  
- Remove product from cart  
- Fetch current cart  
- Cart cleared after successful order creation  

---

### Order Module
- Create order from cart (**users only**)  
- Admin explicitly blocked from placing orders  
- Order stores product snapshot (price, quantity)  
- Order status flow:
  - pending
  - confirmed
  - shipped
  - delivered
- User can view own orders  
- Admin can view all orders  
- Admin can update order status  

---

### Project & Infrastructure Setup
- MongoDB connection using Mongoose  
- Environment variables using `.env`  
- JWT utility separated  
- Single server entry file (`server.js`)  
- Clean and modular folder structure  
- APIs tested using Postman  
- First stable backend version pushed to GitHub  

---

## Current Version

- **Version:** v1.0.0  
- **Status:** Stable Backend MVP  
- **Scope:** Core E-commerce Backend Features  

---

## What To Do Next (Short-Term Goals)

### 1. Pagination, Filtering & Sorting
- Product pagination using page and limit  
- Filter products by category and price  
- Sort products by price and creation date  

### 2. Centralized Error Handling
- Global error-handling middleware  
- Custom error responses  
- Consistent HTTP status codes  

### 3. Security Hardening
- Rate limiting for APIs  
- Helmet for security headers  
- Improved CORS configuration  

### 4. Logging
- Winston logger integration  
- Request and error logging  

---

## Future Plans (Intermediate Level)

### Media & File Handling
- Product image upload using Cloudinary or S3  
- Image update and delete support  

### Database Optimization
- MongoDB indexes  
- Aggregation pipelines for:
  - Total sales  
  - Order statistics  
  - Top-selling products  

### Authentication Improvements
- Refresh token implementation  
- Logout functionality  
- Token invalidation strategy  

---

## Advanced / Optional Ideas
- Admin dashboard APIs  
- Order cancellation and returns  
- Coupons and discount system  
- Product reviews and ratings  
- Payment gateway integration  
- API documentation using Swagger  
- Backend deployment (Render or Railway)  

---

## Learning Outcomes
- Backend architecture design  
- Secure authentication and authorization  
- Role-based access control  
- MongoDB schema relationships  
- REST API best practices  
- Production-ready backend mindset  

---

## Final Note

This project is built as a serious backend portfolio project.  
It focuses on real-world logic, clean structure, and correct authorization instead of basic CRUD-only functionality.
