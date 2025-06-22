# Clinic-management
# 🏥 Wellness Home – Clinic Management System

**Wellness Home** is a modern and responsive healthcare management web application built to streamline clinical workflows including patient registration, billing, login-based access control, and token management. Built using HTML, CSS, JavaScript, and Firebase.

---

## 📌 Features

- 🧑‍⚕️ **Doctor & Receptionist Login**
- 📝 **Add & View Patient Records** (with Firebase integration)
- 🎫 **Token Generation System**
- 💵 **Dynamic Bill Generator**
- 📋 **Dashboard UI for Receptionists & Doctors**
- 🌐 **Responsive Design with Animated Interface**

---

## 🧠 Technologies Used

- **HTML5 & CSS3**
- **Vanilla JavaScript**
- **Firebase Firestore** (for storing patient records)
- **Boxicons & Google Fonts**
- **Responsive CSS Grid & Flexbox Layout**

---

## 📁 Project Structure

├── index.html # Homepage with login and billing
├── recep.html # Receptionist dashboard for token generation
├── record.html # Patient info form and database display
├── style.css # Global styling
├── record.css # Styling specific to record.html
├── script.js # Main logic for login, billing, and patient management
├── recep.js # Token generation logic
├── record.js # Firebase integration and patient data handling
├── imgg.png # Image used in About section
├── dash.html # # Doctor dashboard 
├── dash.css #  Doctor dashboard Styling
├── dash.js #  Doctor dashboard working
## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
Open HTML files in your browser:

index.html → Main application (Login + Billing)

recep.html → Receptionist Token System

record.html → Patient Management (connected to Firebase)

No build tools or server setup required.

🔐 Firebase Setup
Add your Firebase credentials in record.js under:

js
Copy
Edit
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  ...
};
The Firestore database stores patient details in a collection named patients.

📞 Contact
📧 Email: wellnesshome.help@gmail.com

📱 Phone: +91 1234567890
