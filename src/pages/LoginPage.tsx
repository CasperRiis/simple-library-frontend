import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userCredentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    login(userCredentials).then(() => {
      navigate("/");
    });
  };

  return (
    <VStack spacing="4" align="center">
      <Box padding="8" width={{ base: "90%", md: "400px" }}>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Login
        </Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" required />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" required />
          </FormControl>
          <Button type="submit" mt={4} width="full">
            Login
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default LoginPage;
