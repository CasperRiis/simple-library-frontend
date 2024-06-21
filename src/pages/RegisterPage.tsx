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

const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
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
      username: event.target.username.value,
      password: event.target.password.value,
    };
    register(userCredentials)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast({
          title: "Register failed.",
          description: "Unexpected error. Please try again.",
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
          Register
        </Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" required />
          </FormControl>
          <FormControl paddingTop="4">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" required />
          </FormControl>
          <Button type="submit" mt={4} width="full">
            Register
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default RegisterPage;
