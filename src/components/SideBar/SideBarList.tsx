import { List } from "@chakra-ui/react";
import { FaBook, FaFlag, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import SideBarListItem from "./SideBarListItem";

const SideBarList = () => {
  return (
    <List>
      <SideBarListItem icon={FaBook} text="Books" />
      <SideBarListItem icon={FaFlag} text="Issued" />
      <SideBarListItem icon={FaRegThumbsUp} text="Returned" />
      <SideBarListItem icon={FaRegThumbsDown} text="Not Returned" />
    </List>
  );
};

export default SideBarList;
