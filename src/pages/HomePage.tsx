import { Grid, Show, GridItem, HStack, Box } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import SideBarList from "../components/SideBar/SideBarList";
import BookGrid from "../components/BookGrid";

const HomePage = () => {
  return (
    <>
      <BookGrid />
    </>
    // <Grid
    //   templateAreas={{
    //     base: `"nav" "main"`,
    //     lg: `"nav nav" "aside main"`,
    //   }}
    //   templateColumns={{
    //     base: "1fr",
    //     lg: "300px 1fr",
    //   }}
    // >
    //   <Show above="lg">
    //     <GridItem gridArea={"aside"}>
    //       <SideBarList />
    //     </GridItem>
    //   </Show>
    //   <GridItem gridArea={"main"}>
    //     <Box paddingLeft={2}>
    //       <HStack spacing={5} paddingLeft={2} marginBottom={5}></HStack>
    //     </Box>
    //   </GridItem>
    // </Grid>
  );
};

export default HomePage;
