import ApiClient from "../services/api-client";
import { jwtDecode } from "jwt-decode";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const apiClient = new ApiClient<UserCredentials>("account/login");
const ROLE_CLAIM: string =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

interface UserCredentials {
  username: string;
  password: string;
}

type AuthContextProps = {
  isAuthenticated: boolean;
  role: string;
  login: (userCredentials: UserCredentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface DecodedToken {
  exp: number;
  role: string;
  [key: string]: any;
}

const isTokenValid = (token: string): boolean => {
  const decoded: DecodedToken = jwtDecode(token);
  return decoded.exp * 1000 > Date.now();
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && isTokenValid(storedToken)) {
      const decoded: DecodedToken = jwtDecode(storedToken);
      setIsAuthenticated(true);
      setRole(decoded[ROLE_CLAIM]);
    } else {
      setIsAuthenticated(false);
      setRole("");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (userCredentials: UserCredentials) => {
    return apiClient
      .post(userCredentials)
      .then((res) => {
        if (res) {
          const token = res.toString();
          setIsAuthenticated(true);
          const decoded: DecodedToken = jwtDecode(token);
          setRole(decoded[ROLE_CLAIM]);
          localStorage.setItem("token", token);
        } else {
          throw new Error("Invalid credentials");
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
