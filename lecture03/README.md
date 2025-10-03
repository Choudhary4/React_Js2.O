# React Revision - Lecture 03: Props & Component Composition

A practical exploration of React props, component reusability, and data mapping with modern styling using Tailwind CSS.

## 🎯 Learning Objectives

This lecture demonstrates fundamental React concepts:

### ✅ What You'll Learn
- **Props**: Passing data between components
- **Component Composition**: Building reusable UI components
- **Array Mapping**: Rendering dynamic lists with `.map()`
- **Default Props**: Using default parameters in functional components
- **Tailwind CSS**: Modern utility-first CSS framework integration
- **Key Prop**: Understanding React's reconciliation with unique keys

---

## 🚀 Project Overview

### 📋 Features
- **Dynamic Card Rendering**: Renders multiple cards from data array
- **Reusable Card Component**: Single component, multiple instances
- **Props Demonstration**: Shows how data flows from parent to child
- **Tailwind Styling**: Modern, responsive design with hover effects
- **Default Values**: Demonstrates fallback props

### 🎨 What It Builds
A card-based interface showcasing:
- User profiles with names and action buttons
- Responsive design with hover animations
- React Fiber logo integration
- Clean, modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

- **React**: ^19.1.1 (Latest version with concurrent features)
- **Vite**: ^7.1.7 (Lightning-fast build tool)
- **Tailwind CSS**: ^4.1.14 (Utility-first CSS framework)
- **ESLint**: ^9.36.0 (Code quality and consistency)

---

## 📦 Installation & Setup

1. **Navigate to lecture03:**
   ```bash
   cd lecture03
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
lecture03/
├── src/
│   ├── components/
│   │   └── Card.jsx           # Reusable Card component
│   ├── App.jsx                # Main app with data and mapping
│   ├── App.css                # Component styles
│   ├── index.css              # Global styles + Tailwind
│   └── main.jsx               # App entry point
├── public/                    # Static assets
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint rules
└── README.md                  # This documentation
```

---

## 🧩 Component Analysis

### Card Component (`src/components/Card.jsx`)

**Purpose:** Reusable UI component that displays user information

**Props:**
```javascript
function Card({userName = 'saurabh', btxButton}) {
  // Component implementation
}
```

**Key Features:**
- **Default Props**: `userName` defaults to 'saurabh'
- **Dynamic Content**: Accepts `userName` and `btxButton` props
- **Tailwind Styling**: Responsive design with hover effects
- **Semantic HTML**: Proper structure with img, headings, and buttons

**Styling Highlights:**
- `rounded-2xl` - Smooth rounded corners
- `hover:shadow-lg` - Interactive hover effects
- `transition-shadow duration-300` - Smooth animations
- `object-cover` - Proper image scaling

### App Component (`src/App.jsx`)

**Purpose:** Main application that manages data and renders multiple cards

**Data Structure:**
```javascript
const CardData = [
  {
    "userName": "Saurabh",
    "btxButton": "Click Me"
  },
  {
    "userName": "Kuntal", 
    "btxButton": "Learn More"
  }
  // ... more cards
];
```

**Mapping Implementation:**
```javascript
{CardData.map((item, index) => (
  <Card 
    key={index} 
    userName={item.userName} 
    btxButton={item.btxButton}
  />
))}
```

---

## 🎓 Key Concepts Explained

### 1. **Props (Properties)**
- **Definition**: Data passed from parent to child components
- **Flow**: Unidirectional (parent → child)
- **Usage**: `<Card userName="John" btxButton="Click Me" />`

### 2. **Default Props**
```javascript
function Card({userName = 'defaultName', btxButton = 'Click'}) {
  // If no userName prop is passed, it defaults to 'defaultName'
}
```

### 3. **Array Mapping in JSX**
```javascript
// Transform array data into JSX elements
{arrayData.map((item, index) => (
  <Component key={index} prop={item.value} />
))}
```

### 4. **Key Prop Importance**
- **Purpose**: Helps React identify which items have changed
- **Best Practice**: Use unique, stable identifiers
- **Current**: Using array index (acceptable for static lists)
- **Better**: Use unique IDs when available

### 5. **Component Composition**
- **Reusability**: One component, multiple instances
- **Maintainability**: Update styling in one place
- **Scalability**: Easy to add new card instances

---

## 🎨 Tailwind CSS Integration

### Setup
- Configured in `package.json` dependencies
- Imported in `index.css`
- Vite plugin configured for optimization

### Key Classes Used
- **Layout**: `max-w-sm`, `w-full`, `h-48`
- **Spacing**: `p-5`, `mt-4`, `mb-2`
- **Colors**: `bg-white`, `text-gray-800`, `bg-blue-600`
- **Effects**: `shadow-md`, `hover:shadow-lg`, `transition-shadow`
- **Typography**: `text-xl`, `font-bold`, `text-sm`

---

## 🚀 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint for code quality
npm run lint
```

---

## 🔄 Next Steps & Extensions

### Immediate Improvements
- [ ] Add unique IDs to CardData for better keys
- [ ] Implement prop validation with PropTypes
- [ ] Add more interactive features (click handlers)
- [ ] Create different card variants

### Advanced Concepts to Explore
- [ ] **State Management**: Add state to cards (like/unlike)
- [ ] **Event Handling**: Button click functionality
- [ ] **Conditional Rendering**: Show/hide elements based on props
- [ ] **Component Variants**: Different card styles
- [ ] **Form Integration**: Add input forms for dynamic data

### Performance Optimizations
- [ ] **React.memo**: Prevent unnecessary re-renders
- [ ] **useMemo**: Optimize expensive calculations
- [ ] **Code Splitting**: Lazy load components
- [ ] **Image Optimization**: Implement lazy loading

---

## 🎯 Learning Outcomes

After completing this lecture, you should understand:

1. **How props work** - Data flow from parent to child
2. **Component reusability** - Write once, use everywhere
3. **Array mapping** - Dynamic list rendering
4. **Default parameters** - Fallback values for props
5. **Tailwind CSS** - Utility-first styling approach
6. **Project structure** - Organizing React components

---

## 📝 Notes

- **React Version**: Uses React 19.1.1 with latest features
- **Styling**: Tailwind CSS 4.1.14 with utility classes
- **Build Tool**: Vite for fast development experience
- **Code Quality**: ESLint configured for React best practices

---

## 🤝 Contributing

This is part of the React Revision series. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

Educational project for React.js learning and revision.

---

**Happy Learning! 🎉**

*Master React props and component composition - the foundation of scalable React applications!*
