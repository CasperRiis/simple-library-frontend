import { HStack, Image, Link } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack bg="blue.700" justifyContent="flex-start" padding={2}>
      <Link href="/">
        <Image src={logo} boxSize="50px"></Image>
      </Link>
      <SearchInput />
    </HStack>
  );
};

export default NavBar;
