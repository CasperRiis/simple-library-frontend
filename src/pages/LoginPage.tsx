import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userCredentials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    login(userCredentials)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast({
          title: "Login failed.",
          description: "Invalid email or password.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
            <FormLabel>Email</FormLabel>
            <Input type="text" name="email" required />
          </FormControl>
          <FormControl paddingTop="4">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" required />
          </FormControl>
          <Button type="submit" mt={4} width="full">
            Login
          </Button>
          <Box textAlign="center" mt={4}>
            <Link to="/register">Register here</Link>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default LoginPage;
