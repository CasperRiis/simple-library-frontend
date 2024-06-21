import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserCredentials | null;
  login: (userCredentials: UserCredentials) => Promise<void>;
  logout: () => void;
};

interface UserCredentials {
  username: string;
  password: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserCredentials | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userCredentials: UserCredentials) => {
    return new Promise<void>((resolve) => {
      // authenticate user, usually with an API call
      // if successful:
      setIsAuthenticated(true);
      setUser(userCredentials);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userCredentials));
      resolve();
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
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
