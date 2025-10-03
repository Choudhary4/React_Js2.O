# React Revision - Lecture 01

A React.js revision project focusing on fundamental concepts and modern React development practices.

## 🚀 About This Project

This is a hands-on React revision project designed to reinforce core React concepts including:
- React functional components
- State management with `useState` hook
- Event handling
- Component lifecycle and modern hooks
- Modern React development setup with Vite

## 📋 Features

- **Counter Application**: Simple counter with increment/decrement functionality
- **State Management**: Demonstrates React's `useState` hook
- **Conditional Logic**: Prevents counter from going below zero
- **Modern Setup**: Built with Vite for fast development experience
- **Code Quality**: ESLint configuration for consistent code style

## 🛠️ Tech Stack

- **React**: ^19.1.1 (Latest version)
- **React DOM**: ^19.1.1
- **Vite**: ^7.1.7 (Build tool and dev server)
- **ESLint**: ^9.36.0 (Code linting)

## 📦 Installation

1. Clone this repository
2. Navigate to the project directory:
   ```bash
   cd lecture01
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Server
```bash
npm run dev
```
This starts the Vite development server. Open your browser and navigate to the provided local URL (typically `http://localhost:5173`).

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
lecture01/
├── public/
│   └── vite.svg           # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg      # React logo
│   ├── App.css            # App component styles
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🧩 Component Overview

### App Component (`src/App.jsx`)
The main component demonstrating:
- **State Hook**: Uses `useState(23)` to manage counter state
- **Event Handlers**: 
  - `addCounter()`: Increments the counter
  - `removeCounter()`: Decrements the counter (with zero boundary check)
- **Conditional Logic**: Prevents counter from going negative
- **JSX**: Modern React syntax for rendering UI

## 🎯 Learning Objectives

This project covers essential React concepts:

1. **Functional Components**: Modern React component syntax
2. **React Hooks**: `useState` for state management
3. **Event Handling**: Button click events and function binding
4. **Conditional Logic**: Implementing business rules (non-negative counter)
5. **Component Lifecycle**: Understanding how state changes trigger re-renders
6. **Modern Development**: Vite setup for optimal development experience

## 🔄 Next Steps for Revision

Consider extending this project with:
- [ ] `useEffect` hook for side effects
- [ ] Multiple state variables
- [ ] Props and component composition
- [ ] Conditional rendering
- [ ] Lists and keys
- [ ] Form handling
- [ ] Context API
- [ ] Custom hooks

## 📝 Notes

- Counter starts at 23 (initial state value)
- Minimum counter value is 0 (cannot go negative)
- Uses modern React 19.1.1 features
- ESLint configured for React best practices

## 🤝 Contributing

This is a personal revision project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational purposes as part of React.js revision.

---

**Happy Learning! 🎉**

*Keep practicing React concepts and building awesome applications!*
