import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Text,
  Header as MantineHeader,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import styles from "./register.style.module.css";

import { register } from "../../services/api.service";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";

interface RegisterProps {
  onRegister: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [registerError, setRegisterError] = useState<string>("");

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }) => {
    try {
      setRegisterError("");
      await register(
        values.firstName,
        values.lastName,
        values.username,
        values.password
      );
      onRegister();
      navigate("/");
    } catch (err: any) {
      if (err instanceof UserAlreadyExistsError) {
        setRegisterError(err.message);
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
          className={`${styles.Register}`}
          src="https://www.pngplay.com/wp-content/uploads/1/Sign-Up-PNG-Free-Commercial-Use-Images.png"
          alt=""
        />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="First Name"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            required
            label="Last Name"
            {...form.getInputProps("lastName")}
          />
          <TextInput
            required
            label="Username"
            {...form.getInputProps("username")}
            error={!!registerError}
          />
          <PasswordInput
            label="Password"
            {...form.getInputProps("password")}
            error={registerError}
          />

          <Group
            sx={{ display: "flex", justifyContent: "space-between" }}
            position="left"
            mt="md"
          >
            <Text
              className={`${styles.Login}`}
              component={Link}
              to="/login"
              variant="link"
            >
              Already have an account ?
            </Text>

            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
