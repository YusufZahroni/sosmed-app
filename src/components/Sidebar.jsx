import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Home", url: "/" },
  { name: "Notifications", url: "/notifications" },
  { name: "Message", url: "/messages" },
  { name: "Profile", url: "/profile" },
];

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <Box shadow={"sm"} h="100vh" w={"20%"} mx={"auto"}>
      {sidebarItems.map((item, index) => {
        return (
          <Flex
            key={index}
            py={"2"}
            onClick={() => navigate(item.url)}
            cursor="pointer"
          >
            <Text fontSize="20px">{item.name}</Text>
          </Flex>
        );
      })}
    </Box>
  );
};
export default SideBar;
