import { useForm } from "@mantine/form";
import { NumberInput } from "@mantine/core";
import { VacationData } from "../../../interface/vacation";
import {
  createVacation,
  getVacationById,
  updateVacation,
} from "../../../services/api.service";
import { TextInput, Button, Group, FileInput } from "@mantine/core";
import { useEffect } from "react";

interface VacationFormProps {
  onVacationSaved: () => void;
  vacationId?: number;
}

export const VacationForm: React.FC<VacationFormProps> = ({
  onVacationSaved,
  vacationId,
}) => {
  const form = useForm<VacationData>({
    initialValues: {
      description: "",
      destination: "",
      date: "",
      price: 0,
      image: null as any,
    },
  });

  const loadVacationData = async (vacationId: number) => {
    const vacation = await getVacationById(vacationId);
    form.setValues({
      description: vacation.description,
      destination: vacation.destination,
      date: vacation.date,
      price: vacation.price,
      image: null as any,
    });
  };

  useEffect(() => {
    if (vacationId) {
      loadVacationData(vacationId);
    }
  }, []);

  const save = async (values: VacationData) => {
    if (!vacationId) {
      await createVacation(values);
    } else {
      await updateVacation(vacationId, values);
    }

    onVacationSaved();
  };

  return (
    <div style={{ maxWidth: 320, margin: "auto" }}>
      <form onSubmit={form.onSubmit(save)}>
        <TextInput
          required
          label="Destination"
          placeholder="Destination"
          {...form.getInputProps("destination")}
        />
        <TextInput
          required
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />

        <TextInput
          required
          label="Date"
          type="date"
          placeholder="Date"
          {...form.getInputProps("date")}
        />
        <NumberInput
          required
          label="Price"
          placeholder="Price"
          {...form.getInputProps("price")}
        />

        <FileInput
          required
          label="Image"
          placeholder="Select Image"
          {...form.getInputProps("image")}
        />

        <Group position="center" mt="xl">
          <Button type="submit" variant="outline">
            Save
          </Button>
        </Group>
      </form>
    </div>
  );
};
