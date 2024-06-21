import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import AuthorDetailPage from "./pages/AuthorDetailPage";

const AppRouter = () => (
  <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="book/:id" element={<BookDetailPage />} />
        <Route
          path="author/:id"
          element={<ProtectedRoute element={<AuthorDetailPage />} />}
        />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRouter;
