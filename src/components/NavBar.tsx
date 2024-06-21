import {
  Button,
  HStack,
  Image,
  Link,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(window.location.pathname);
  };

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <HStack bg="blue.700" justifyContent="space-between" padding={2}>
      <Link href="/">
        <Image src={logo} boxSize="50px"></Image>
      </Link>
      <SearchInput />
      <Spacer />
      {isAuthenticated && role === "Admin" && isLargerThan800 ? (
        <>
          <Link onClick={() => navigate("/author/manage")}>
            <Button mr={4} variant="ghost">
              Manage Author
            </Button>
          </Link>
          <Link onClick={() => navigate("/book/add")}>
            <Button mr={4} variant="ghost">
              Add Book
            </Button>
          </Link>
        </>
      ) : null}
      {isAuthenticated ? (
        <Link onClick={handleLogout}>
          <Button mr={4} variant="ghost">
            Logout
          </Button>
        </Link>
      ) : null}
      {!isAuthenticated ? (
        <Link onClick={() => navigate("/login")}>
          <Button mr={4} variant="ghost">
            Login
          </Button>
        </Link>
      ) : null}
    </HStack>
  );
};

export default NavBar;
