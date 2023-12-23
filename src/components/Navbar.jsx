import {
  Box,
  Container,
  Text,
  ButtonGroup,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  useToast,
} from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/slices/usersSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("sosmed_app");
    dispatch(logoutAction());

    toast({
      title: "Logout Success",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top",
    });

    navigate("/");
  };

  return (
    <Box
      shadow={"sm"}
      // background={"white"}
      // position="fixed"
      w="100%"
      top={0}
      zIndex={1000}
    >
      <Container
        maxW="7xl"
        border="1px solid white"
        py="4"
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"26px"} fontWeight={"bold"} textColor={"orange.400"}>
          <Link to="/">BACOTAN</Link>
        </Text>

        {user.id ? (
          <Menu>
            <MenuButton fontSize={"20px"} fontWeight={"bold"}>
              Hi {user.username}
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight={"medium"}>Profile</MenuItem>
              <MenuItem fontWeight={"medium"} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup colorScheme="orange" spacing="2">
            <Button variant={"solid"} onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant={"outline"} onClick={() => navigate("/register")}>
              Register
            </Button>
          </ButtonGroup>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
