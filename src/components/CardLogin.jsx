import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { loginAction } from "../redux/slices/usersSlice";
import { baseUrl } from "../utils/config";
YupPassword(yup);

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Name / Email cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6)
    .minUppercase(1)
    .minLowercase(1),
});

const CardLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const isEmail = values.usernameOrEmail.includes("@");
      try {
        let userData;
        if (isEmail) {
          userData = await axios.get(
            baseUrl +
              `/users?email=${values.usernameOrEmail}&password=${values.password}`
          );
        } else {
          userData = await axios.get(
            baseUrl +
              `/users?username=${values.usernameOrEmail}&password=${values.password}`
          );
        }

        if (!userData.data.length) return alert("Wrong credential");

        localStorage.setItem("sosmed_app", JSON.stringify(userData.data[0]));
        dispatch(loginAction(userData.data[0]));

        toast({
          title: "Login Success",
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box w={"450px"} shadow={"dark-lg"} p={"20"} rounded={"xl"}>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            Sign in
            <Text display={"inline"} color={"orange.400"} fontWeight={"bold"}>
              <Link to="/"> BACOTAN</Link>
            </Text>
          </Text>

          <Text>
            Not have account?
            <Text
              display={"inline"}
              color={"orange.400"}
              fontWeight={"bold"}
              textDecor="underline"
            >
              <Link to="/Register">Register Now</Link>
            </Text>
          </Text>

          <FormControl
            isInvalid={Boolean(
              formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
            )}
          >
            <FormLabel>Username / Email</FormLabel>
            <Input
              type="text"
              name="usernameOrEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.usernameOrEmail}
            />
            <FormErrorMessage>{formik.errors.usernameOrEmail}</FormErrorMessage>
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
                placeholder={"Enter Password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password} //optional
                mb={"0"}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h={"1.75rem"}
                  size={"sm"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Center>
            <Button type={"submit"} colorScheme={"orange"}>
              Login
            </Button>
          </Center>
        </Stack>
      </form>
    </Box>
  );
};

export default CardLogin;
