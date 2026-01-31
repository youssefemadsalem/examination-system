# 📝 Examination Portal

A modern, responsive online examination system built with vanilla JavaScript, HTML, and CSS. This application provides a complete solution for conducting online exams with user registration, authentication, timed assessments, and instant results.

![JavaScript](https://img.shields.io/badge/JavaScript-43.4%25-yellow)
![CSS](https://img.shields.io/badge/CSS-34.4%25-blue)
![HTML](https://img.shields.io/badge/HTML-22.2%25-orange)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration** - Secure sign-up with comprehensive form validation
- **User Login** - Authentication with session management
- **Protected Routes** - Automatic redirection for unauthorized access
- **Exam Protection** - Prevents page refresh, back navigation, and tab closing during exams

### 📋 Examination System
- **Timed Exams** - 5-minute countdown timer with visual progress bar
- **Multiple Choice Questions** - Clean, intuitive question interface
- **Question Navigation** - Jump to any question using the navigation grid
- **Mark for Review** - Flag questions to revisit later
- **Progress Tracking** - Real-time statistics for answered, unanswered, and marked questions
- **Auto-submit** - Automatic submission when time expires
- **Session Recovery** - Resume exam if accidentally interrupted

### 📊 Results & Scoring
- **Instant Results** - Immediate score calculation upon submission
- **Grade Assignment** - Automatic grading (A+ to F)
- **Pass/Fail Status** - 50% passing threshold
- **Detailed Statistics** - View correct and incorrect answer counts
- **Performance Feedback** - Visual indicators for pass/fail status

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with Font Awesome icons
- **Real-time Validation** - Instant feedback on form inputs
- **Confirmation Modals** - Prevent accidental submissions
- **Warning Dialogs** - Alert users before leaving during an exam

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### website link 
[@www.examination-system](https://youssefemadsalem.github.io/examination-system/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/7atoom/examination-system.git
   cd examination-system
   ```

2. **Open the application**
   
   Simply open `index.html` in your web browser, or use a local development server:
   
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click on index.html → "Open with Live Server"
   ```

3. **Access the application**
   
   Navigate to `http://localhost:8000` (or the appropriate port)

## 📁 Project Structure

```
examination-system/
├── index.html              # Main entry point / exam info page
├── assets/
│   └── libs/
│       └── fontawesome/    # Font Awesome icons
├── css/
│   ├── main.css            # Global styles
│   ├── login.css           # Login page styles
│   ├── registration.css    # Registration page styles
│   ├── exam. css            # Exam page styles
│   ├── results.css         # Results page styles
│   └── responsive.css      # Responsive design styles
├── js/
│   ├── main.js             # Main application logic
│   ├── login.js            # Login functionality
│   ├── registration.js     # Registration functionality
│   ├── exam.js             # Exam logic & question management
│   ├── results.js          # Results display & calculations
│   └── utils/
│       ├── Auth.js         # Authentication utilities
│       ├── storage.js      # Local storage management
│       ├── timer.js        # Exam timer functionality
│       └── validation.js   # Form validation helpers
├── data/
│   └── questions.json      # Exam questions database
└── pages/
    ├── login.html          # Login page
    ├── registration. html   # Registration page
    ├── exam.html           # Exam page
    └── results.html        # Results page
```

## 🎯 Usage

### For Students

1. **Register** - Create an account with your name, email, and password
2. **Login** - Sign in with your credentials
3. **Review Info** - Read the exam instructions on the home page
4. **Start Exam** - Begin the timed examination
5. **Answer Questions** - Select answers and navigate between questions
6. **Submit** - Submit your exam before time runs out
7. **View Results** - See your score, grade, and performance summary

### Exam Rules
- 📝 10 multiple-choice questions
- ⏱️ 5-minute time limit
- ✅ 50% required to pass
- 🔄 Questions appear in random order
- ⚠️ Cannot leave the exam page once started

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript (ES6+)** - Vanilla JS for all functionality
- **Font Awesome** - Icon library
- **LocalStorage** - Client-side data persistence
- **SessionStorage** - Exam session management

## 🔒 Security Features

- Password validation (minimum 8 characters, uppercase, lowercase, number)
- Email format validation
- Protected routes requiring authentication
- Exam integrity protection (prevents navigation away)
- Session-based authentication

## 📱 Responsive Design

The application is fully responsive and optimized for: 
- 🖥️ Desktop (1200px+)
- 💻 Laptop (992px - 1199px)
- 📱 Tablet (768px - 991px)
- 📱 Mobile (< 768px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Authors

**7atoom**,**youssefemadsalem**

- GitHub: [@7atoom](https://github.com/7atoom), [@youssefemadsalem](https://github.com/youssefemadsalem)

---

⭐ Star this repository if you found it helpful! 



