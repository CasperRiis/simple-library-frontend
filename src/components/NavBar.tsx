import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

const NavBar = () => {
  return (
    <>
      <HStack justifyContent="space-between" padding={2}>
        <Image src={logo} boxSize="50px"></Image>
      </HStack>
    </>
  );
};

export default NavBar;
