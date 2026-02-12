# 📸 Instagram Clone – Backend

This is the backend of an Instagram Clone built using Node.js, Express, and MongoDB.

---

## ✅ Day 1 Completed

- Express server setup
- MongoDB connection
- User schema & model created
- Register API
- Login API
- Password hashing
- JWT authentication
- Token stored in cookies

---

## ✅ Day 2 Completed

- Switched from crypto (SHA256) to bcrypt for secure password hashing
- Created Post API
- Post includes:
  - caption
  - image
  - createdBy (user id)

---

## 📂 File Upload Handling

Express does not handle file uploads by default.

To solve this:
- Used **multer** to handle multipart/form-data
- Used **memory storage**
- Files are stored temporarily in server memory
- After receiving file:
  1. Server uploads image to ImageKit (cloud storage)
  2. After successful upload, file is removed from server memory

---

## ☁️ Why Cloud Storage?

Storing files directly on server is expensive because:

- High bandwidth usage
- Increased server storage cost
- Slower scalability

To avoid this:
- Images are stored on ImageKit (cloud provider)
- Only image URL is stored in database

---

## ⚠️ Edge Cases Handled

- User already exists
- User not found
- Invalid password
- File handling using multer

---

## 🧠 Learning Progress

- Secure password hashing with bcrypt
- File upload handling with multer
- Memory storage vs disk storage
- Cloud storage integration (ImageKit)
- Why backend scalability matters

---

🚀 Project in Progress...
