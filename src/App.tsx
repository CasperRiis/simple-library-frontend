import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import RegisterPage from "./pages/RegisterPage";
import BookEditPage from "./pages/admin/BookEditPage";
import BookAddPage from "./pages/admin/BookAddPage";
import AuthorEditPage from "./pages/admin/AuthorEditPage";
import AuthorManagePage from "./pages/admin/AuthorManagePage";

const App = () => (
  <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="book/:id" element={<BookDetailPage />} />
        <Route
          path="author/:id"
          element={
            <ProtectedRoute
              element={<AuthorDetailPage />}
              requiredRoles={["Admin", "User"]}
            />
          }
        />
        <Route
          path="book/add"
          element={
            <ProtectedRoute
              element={<BookAddPage />}
              requiredRoles={["Admin"]}
            />
          }
        />
        <Route
          path="book/:id/edit"
          element={
            <ProtectedRoute
              element={<BookEditPage />}
              requiredRoles={["Admin"]}
            />
          }
        />
        <Route
          path="author/manage"
          element={
            <ProtectedRoute
              element={<AuthorManagePage />}
              requiredRoles={["Admin"]}
            />
          }
        />
        <Route
          path="author/:id/edit"
          element={
            <ProtectedRoute
              element={<AuthorEditPage />}
              requiredRoles={["Admin"]}
            />
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
