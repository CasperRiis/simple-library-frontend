import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BookCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.02)",
        transition: "all 0.2s",
      }}
      overflow="hidden"
      borderRadius={10}
    >
      {children}
    </Box>
  );
};

export default BookCardContainer;
