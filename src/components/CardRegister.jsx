import { useFormik } from "formik";
import {
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import YupPassword from "yup-password";
import { baseUrl } from "../utils/config";
YupPassword(yup);
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username cannot be empty"),
  email: yup.string().email().required("Invalid email"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .minUppercase(1),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("Password cannot be empty"),
});

const CardRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data: isEmailExist } = await axios.get(
          baseUrl + `/users?email=${values.email}`
        );
        if (isEmailExist.length) return alert("email already exist");

        const { data: isUsernameExist } = await axios.get(
          baseUrl + `/users?username=${values.username}`
        );
        if (isUsernameExist.length) return alert("username already exist");

        await axios.post(baseUrl + "/users", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        toast({
          title: "Register Success",
          status: "success",
          duration: 1200,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast({
          title: error.message,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  return (
    <Box w={"450px"} shadow={"dark-lg"} p={"20"} rounded={"xl"} mb={"10"}>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            Welcome To
            <Text display={"inline"} color={"orange.400"} fontWeight={"bold"}>
              <Link to="/"> BACOTAN</Link>
            </Text>
          </Text>

          <Text mb={"4"}>
            Already have an account ?
            <Text display={"inline"} color={"orange.400"} fontWeight={"bold"}>
              <Link to="/Login"> Login Now</Link>
            </Text>
          </Text>

          <FormControl
            isInvalid={Boolean(
              formik.errors.username && formik.touched.username
            )}
          >
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(formik.errors.email && formik.touched.email)}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              onChange={formik.handleChange}
              bg={"whitesmoke.200"}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(
              formik.errors.password && formik.touched.password
            )}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(
              formik.errors.confirmPassword && formik.touched.confirmPassword
            )}
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirm ? "text" : "password"}
                placeholder="Enter password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <Center mt={"4"}>
            <Button type={"submit"} colorScheme="orange">
              Register
            </Button>
          </Center>
        </Stack>
      </form>
    </Box>
  );
};

export default CardRegister;
