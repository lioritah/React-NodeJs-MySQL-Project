import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Text,
  Header as MantineHeader,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./login.style.module.css";

import { useForm } from "@mantine/form";
import { useState } from "react";
import { UnauthorizedError } from "../../errors/unauthorized";
import { login } from "../../services/api.service";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loginError, setLoginError] = useState<string>("");

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      setLoginError("");
      await login(values.username, values.password);
      localStorage.setItem("loginAt", new Date().toISOString());
      onLogin();
      navigate("/vacations");
    } catch (err: any) {
      if (err instanceof UnauthorizedError) {
        setLoginError(err.message);
      }
    }
  };

  return (
    <>
      <MantineHeader
        className={`${styles.Header}`}
        height={80}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <img
          src="https://grtvacations.net/wp-content/uploads/great-vacations-logo.png"
          alt=""
        />
        <Text className={`${styles.Text}`} mt={20} ta={"center"} fz={"xl"}>
          VACATIONS
        </Text>
      </MantineHeader>
      <Box className={`${styles.Box}`}>
        <img
          className={`${styles.Login}`}
          src="https://www.campwoodlibrary.org/site-assets/images/login-button-png-13.png/@@images/image.png"
          alt=""
        />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="Username"
            {...form.getInputProps("username")}
            error={!!loginError}
          />
          <PasswordInput
            label="Password"
            {...form.getInputProps("password")}
            error={loginError}
          />
          <Group
            sx={{ display: "flex", justifyContent: "space-between" }}
            position="right"
            mt="md"
          >
            <Text
              className={`${styles.Register}`}
              component={Link}
              to="/register"
              variant="link"
            >
              Click here to sign up
            </Text>

            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
