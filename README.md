# 🎯 AI-Powered Random Quote Generator

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A beautiful, modern, and responsive web application that generates inspirational quotes with a sleek UI and smooth animations.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Technologies](#-technologies) • [Contributing](#-contributing)

</div>

---

## 📖 About

The **AI-Powered Random Quote Generator** is a sleek, modern web application built with React and TypeScript that fetches and displays random inspirational quotes. With a beautiful gradient design, dark mode support, and smooth animations, this app provides an elegant way to discover and share motivational quotes.

### ✨ Key Highlights

- 🎨 **Modern UI/UX** - Beautiful gradient design with smooth transitions
- 🌙 **Dark Mode** - Automatic theme detection with manual toggle
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🔄 **Multiple API Fallbacks** - Reliable quote fetching with backup sources
- 📋 **One-Click Sharing** - Easy quote sharing functionality
- 💾 **Local Storage** - Remembers your theme preference

---

## 🎯 Features

### Core Functionality
- ✅ **Random Quote Generation** - Fetch new quotes with a single click
- ✅ **Multiple API Support** - Automatic fallback to ensure reliability
- ✅ **Quote Sharing** - Share quotes via native share API or clipboard
- ✅ **Loading States** - Smooth loading animations
- ✅ **Error Handling** - Graceful error handling with user-friendly messages

### UI/UX Features
- ✅ **Dark/Light Mode Toggle** - Switch between themes effortlessly
- ✅ **Responsive Design** - Optimized for desktop, tablet, and mobile
- ✅ **Smooth Animations** - Elegant transitions and hover effects
- ✅ **Gradient Styling** - Eye-catching gradient text and backgrounds
- ✅ **Quote Cards** - Beautiful card-based quote display

### Technical Features
- ✅ **TypeScript** - Full type safety and better developer experience
- ✅ **Vite Build Tool** - Fast development and optimized production builds
- ✅ **Tailwind CSS** - Utility-first CSS framework for rapid styling
- ✅ **ESLint** - Code quality and consistency
- ✅ **Local Storage** - Persistent theme preferences

---



## 🚀 Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohammadNoman/random-quote-generator.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd random-quote-generator
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app should now be running! 🎉

---

## 💻 Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Using the Application

1. **Get a Random Quote**
   - Click the "Get Random Quote" button
   - Wait for the quote to load (you'll see a loading spinner)
   - Enjoy your inspirational quote!

2. **Toggle Dark Mode**
   - Click the sun/moon icon in the top-right corner
   - Your preference will be saved automatically

3. **Share a Quote**
   - Click the share icon on any quote card
   - Use native share dialog (mobile) or copy to clipboard (desktop)

---

## 🛠️ Technologies

This project is built with modern web technologies:

### Frontend Framework
- **[React 19.2.0](https://react.dev/)** - UI library for building user interfaces
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Typed JavaScript for better code quality

### Build Tools
- **[Vite 7.2.4](https://vitejs.dev/)** - Next-generation frontend build tool
- **[ESLint](https://eslint.org/)** - Code linting and quality assurance

### Styling
- **[Tailwind CSS 3.4.18](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS processing tool
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - Automatic vendor prefixing

### APIs Used
- **[Quotable API](https://quotable.io/)** - Primary quote source
- **[Type.fit API](https://type.fit/api/quotes)** - Fallback quote source
- **[AllOrigins](https://allorigins.win/)** - CORS proxy service

---

## 📁 Project Structure

```
random-quote-generator/
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg         # React logo
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.tsx              # Application entry point
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # TypeScript app config
├── tsconfig.node.json        # TypeScript node config
├── vite.config.ts            # Vite configuration
└── README.md                  # Project documentation
```

---

## 🎨 Customization

### Changing Colors

Edit the Tailwind classes in `src/App.tsx`:
- Primary color: `bg-blue-600`, `text-blue-500`
- Gradient: `from-blue-500 to-purple-600`

### Adding More Quote APIs

Edit the `quoteApis` array in `src/App.tsx`:
```typescript
const quoteApis = [
  // Add your custom API here
  async () => {
    const response = await fetch('YOUR_API_URL')
    const data = await response.json()
    return { content: data.quote, author: data.author }
  },
]
```

### Modifying Fallback Quotes

Edit the `fallbackQuotes` array in `src/App.tsx` to add your own quotes.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 🐛 Known Issues

- None at the moment! If you find any issues, please [open an issue](https://github.com/MohammadNoman/random-quote-generator/issues).

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Mohammad Noman**

- GitHub: [@MohammadNoman](https://github.com/MohammadNoman)
- Repository: [random-quote-generator](https://github.com/MohammadNoman/random-quote-generator)

---

## 🙏 Acknowledgments

- [Quotable API](https://quotable.io/) for providing free quote data
- [Type.fit](https://type.fit/api/quotes) for additional quote sources
- [Vite](https://vitejs.dev/) team for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All contributors and users of this project

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/MohammadNoman/random-quote-generator?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/MohammadNoman/random-quote-generator?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/MohammadNoman/random-quote-generator?style=flat-square)

---

<div align="center">

### ⭐ If you like this project, give it a star! ⭐

**Made with ❤️ using React, TypeScript, and Vite**

[⬆ Back to Top](#-ai-powered-random-quote-generator)

</div>
