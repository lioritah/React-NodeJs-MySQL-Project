import { Card, Image, Text, Group, Chip, Title } from "@mantine/core";
import { useDispatch } from "react-redux";
import { Vacation } from "../../../interface/vacation";
import { addFollowers, getImageUrl } from "../../../services/api.service";
import { toggleFollowVacation } from "../../../store/vacationsSlice";
import styles from "./vacation-card.style.module.css";

interface VacationCardProps {
  vacation: Vacation;
}

export const VacationCard: React.FC<VacationCardProps> = ({ vacation }) => {
  const dispatch = useDispatch();

  const createFollower = async (vacationId: number) => {
    try {
      const { mode } = await addFollowers(vacationId);
      dispatch(toggleFollowVacation({ vacationId, mode }));
    } catch (e) {}
  };

  return (
    <Card
      m={30}
      w={250}
      shadow="sm"
      p="sm"
      radius="md"
      withBorder
      sx={{ backgroundColor: "blanchedalmond", color: "black" }}
    >
      <Card.Section>
        <Image
          fit="cover"
          src={getImageUrl(vacation.imageName)}
          height={180}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Title weight={200}>{vacation.destination} </Title>
      </Group>
      <Text weight={150}>{vacation.description} </Text>
      <Text weight={150}>
        Date: {new Date(vacation.date).toLocaleDateString("he-IL")}
      </Text>

      <Text size="sm" color="dimmed">
        Price: {vacation.price}
      </Text>
      <Text size="sm" color="dimmed">
        Followers: {vacation.followers}
      </Text>

      <Chip
        className={`${styles.Box}`}
        checked={vacation.isUserFollowing}
        onChange={() => {
          createFollower(vacation.id);
        }}
      >
        Follow
      </Chip>
    </Card>
  );
};
