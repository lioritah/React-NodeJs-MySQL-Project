import React, { useEffect, useState } from "react";
import { Grid, Button, Modal } from "@mantine/core";
import { deleteVacation, getVacations } from "../../services/api.service";
import { Vacation } from "../../interface/vacation";
import { VacationCard } from "./vacation-card/vacation-card";
import { VacationForm } from "./vacation-form/vacation-form";

export const AdminVacations: React.FC = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [editVacationId, setEditVacationId] = useState<number | undefined>();
  const [isVacationFormOpen, setIsVacationFormOpen] = useState<boolean>(false);

  const getVacationsList = async () => {
    const vacationsFromApi = await getVacations();
    setVacations(vacationsFromApi);
  };

  const onVacationSaved = () => {
    setIsVacationFormOpen(false);
    getVacationsList();
  };
  const onEditClick = (vacationId: number) => {
    setEditVacationId(vacationId);
    setIsVacationFormOpen(true);
  };

  const onDeleteClick = async (vacationId: number) => {
    await deleteVacation(vacationId);
    getVacationsList();
  };

  useEffect(() => {
    getVacationsList();
  }, []);

  return (
    <>
      <Button
        mb="md"
        uppercase
        color="lime"
        onClick={() => setIsVacationFormOpen(true)}
      >
        + Create New Vacation
      </Button>
      <Grid>
        {vacations.map((v) => (
          <Grid.Col md={6} lg={3} key={v.id} span="auto">
            <VacationCard
              vacation={v}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Modal
        title="New Vacation"
        opened={isVacationFormOpen}
        onClose={() => setIsVacationFormOpen(false)}
      >
        <VacationForm
          onVacationSaved={onVacationSaved}
          vacationId={editVacationId}
        />
      </Modal>
    </>
  );
};
