import { Card, Image, Text, Button, Group, Title } from "@mantine/core";
import { Vacation } from "../../../interface/vacation";
import { getImageUrl } from "../../../services/api.service";

interface VacationCardProps {
  vacation: Vacation;
  onEditClick: (vacationId: number) => void;
  onDeleteClick: (vacationId: number) => void;
}
export const VacationCard: React.FC<VacationCardProps> = ({
  vacation,
  onEditClick,
  onDeleteClick,
}) => {
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
        Price: {vacation.price}$
      </Text>
      <Group>
        <Button
          onClick={() => onEditClick(vacation.id)}
          variant="light"
          color="blue"
          mt="md"
          radius="md"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDeleteClick(vacation.id)}
          variant="filled"
          color="red"
          mt="md"
          radius="md"
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
};
