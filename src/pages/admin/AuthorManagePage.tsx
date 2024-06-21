import {
  Heading,
  Box,
  SimpleGrid,
  FormControl,
  Button,
  FormLabel,
  Input,
  useToast,
  Divider,
} from "@chakra-ui/react";
import ApiClient from "../../services/api-client";
import { Author } from "../../entities/Author";

const apiClient = new ApiClient<Author>("author");

const AuthorManagePage = () => {
  const toast = useToast();

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const author: Author = {
      id: 0,
      name: (target.elements.namedItem("name") as HTMLInputElement)?.value,
      nationality: (
        target.elements.namedItem("nationality") as HTMLInputElement
      )?.value,
      birthYear: Number(
        (target.elements.namedItem("birthYear") as HTMLInputElement)?.value
      ),
      imageUrl: (target.elements.namedItem("imageUrl") as HTMLInputElement)
        ?.value,
    };
    apiClient
      .post(author)
      .then(() => {
        event.target.reset();
        toast({
          title: "Post success",
          description: "Author created successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Post failed",
          description: "Unexpected error. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box marginBottom={8} padding={6}>
      <Heading size="lg" mb={4}>
        Add Author
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" required />
          </FormControl>
          <FormControl>
            <FormLabel>Nationality</FormLabel>
            <Input type="text" name="nationality" required />
          </FormControl>
          <FormControl>
            <FormLabel>Birth Year</FormLabel>
            <Input type="number" name="birthYear" required />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="imageUrl" />
          </FormControl>
        </SimpleGrid>
        <Button type="submit" mt={4}>
          Submit
        </Button>
      </Box>
      <Divider marginY={4} />
    </Box>
  );
};

export default AuthorManagePage;
