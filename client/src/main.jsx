import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import StudentProvider from "./context/student-context/index.jsx";
import { Toaster } from "react-hot-toast"; // <-- 1. Add this import

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <App />
          <Toaster position="top-right" /> {/* <-- 2. Add this component */}
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);