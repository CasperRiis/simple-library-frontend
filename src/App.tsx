import "./App.css";
import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SideBarList from "./components/SideBar/SideBarList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <GridItem bg="blue.700" gridArea={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem bg="gray.900" gridArea={"aside"} paddingX={5}>
          <SideBarList />
        </GridItem>
      </Show>
      <GridItem gridArea={"main"}>
        <HStack spacing={5} paddingLeft={2} marginBottom={5}></HStack>
      </GridItem>
    </Grid>
  );
}

export default App;
