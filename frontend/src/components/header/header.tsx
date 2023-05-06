import React from "react";
import {
  Header as MantineHeader,
  Text,
  Menu,
  Group,
  Avatar,
  UnstyledButton,
  NavLink,
  Button,
} from "@mantine/core";
import { forwardRef } from "react";
import { IconChevronRight } from "@tabler/icons";
import styles from "./header.style.module.css";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  user?: string;
  isAdmin?: boolean;
  onLogout: () => void;
}
interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image?: string;
  name?: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);
export const Header: React.FC<HeaderProps> = ({ user, isAdmin, onLogout }) => {
  const location = useLocation();
  return (
    <>
      {!!user && (
        <>
          <MantineHeader
            className={`${styles.Header}`}
            height={80}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button.Group>
              <NavLink
                label="Vacations"
                component={Link}
                to="/vacations"
                active={location.pathname === "/vacations"}
              />
              <NavLink
                sx={{ color: "black" }}
                label="Favorites"
                component={Link}
                to="/favorites"
                active={location.pathname === "/favorites"}
              />
            </Button.Group>
            <Group>
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                position="bottom"
              >
                <Menu.Target>
                  <UserButton image={user} name={user} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={onLogout}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MantineHeader>
        </>
      )}
      {!!isAdmin && (
        <>
          <MantineHeader
            className={`${styles.Header}`}
            height={80}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button.Group>
              <NavLink
                label="Vacations"
                component={Link}
                to="/vacations"
                active={location.pathname === "/vacations"}
              />
              <NavLink
                sx={{ color: "black" }}
                label="Vacations Chart"
                component={Link}
                to="/vacations-chart"
                active={location.pathname === "/vacations-chart"}
              />
            </Button.Group>
            <Group>
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                position="bottom"
              >
                <Menu.Target>
                  <UserButton image={user} name={user} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={onLogout}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MantineHeader>
        </>
      )}
    </>
  );
};
