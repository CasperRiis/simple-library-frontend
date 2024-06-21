import { Button, HStack, Image, Link, Spacer } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <HStack bg="blue.700" justifyContent="space-between" padding={2}>
      <Link href="/">
        <Image src={logo} boxSize="50px"></Image>
      </Link>
      <SearchInput />
      <Spacer />
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
