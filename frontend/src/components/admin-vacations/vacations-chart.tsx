import React, { useCallback, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Vacation } from "../../interface/vacation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  barThickness: 35,
  plugins: {
    legend: {
      position: "top" as const,
    },

    title: {
      display: true,

      text: "Chart.js Bar Chart",
    },
  },
} as any;

const labels = (vacations: Vacation[]) => vacations.map((v) => v.destination);

export const data = (vacations: Vacation[]) => ({
  labels: labels(vacations),
  datasets: [
    {
      label: "Followers",
      data: vacations.map((v) => v.followers),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
});

const useVacations = () => {
  const vacations = useSelector<RootState, Vacation[]>(
    (state) => state.vacationsState.vacations
  );
  return vacations;
};

export function VacationsChart() {
  const vacations = useVacations();
  const dataSet = useMemo(
    () => data(vacations.filter((v) => v.followers > 0)),
    [vacations]
  );
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar options={options} data={dataSet} />
    </div>
  );
}
