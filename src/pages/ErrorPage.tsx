import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Text, Box } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box padding={4}>
        <Text>
          {isRouteErrorResponse(error)
            ? "Page not found"
            : "Unexpected error occured"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
