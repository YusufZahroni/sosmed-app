import { Container } from "@chakra-ui/react";
import CardLogin from "../components/CardLogin";

const Login = () => {
  return (
    <Container maxWidth="6xl" display="flex" justifyContent="center" mt="10">
      <CardLogin />
    </Container>
  );
};

export default Login;
