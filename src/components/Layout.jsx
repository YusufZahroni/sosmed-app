/* eslint-disable react/prop-types*/
import { Container } from "@chakra-ui/react";
import SideBar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Container
      maxW="full"
      display="flex"
      paddingY="5"
      marginTop="50px"
      paddingLeft={"0px"}
      paddingBottom={"0px"}
    >
      <SideBar />
      {children}
    </Container>
  );
};

export default Layout;
