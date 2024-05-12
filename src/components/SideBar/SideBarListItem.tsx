import { HStack, Text, ListItem, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

const SideBarListItem = ({ icon, text }: { icon: IconType; text: string }) => {
  return (
    <ListItem paddingY="5px">
      <HStack>
        <Button>
          <Icon as={icon}></Icon>
          <Text paddingLeft={1}>{text}</Text>
        </Button>
      </HStack>
    </ListItem>
  );
};

export default SideBarListItem;
