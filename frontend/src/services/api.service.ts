import { UnauthorizedError } from "../errors/unauthorized";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import {
  Follower,
  FollowingResponse,
  Vacation,
  VacationData,
} from "../interface/vacation";

const API_URL = "http://localhost:3001";
async function handleResponse(response: Response) {
  if (response.status === 401) {
    const data = await response.json();
    throw new UnauthorizedError(data.message);
  }
  if (response.status === 409) {
    const data = await response.json();
    throw new UserAlreadyExistsError(data.message);
  }
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.message);
  }

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function createVacationFormData(data: VacationData) {
  const formData = new FormData();
  formData.append("description", data.description);
  formData.append("destination", data.destination);
  formData.append("date", data.date);
  formData.append("image", data.image);
  formData.append("price", data.price.toString());

  return formData;
}

export async function login(username: string, password: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return await handleResponse(response);
}
export async function me(): Promise<{ username: string }> {
  const response = await fetch(`${API_URL}/api/v1/auth/me`, {
    credentials: "include",
  });
  return await handleResponse(response);
}

export async function admin(): Promise<boolean> {
  const response = await fetch(`${API_URL}/api/v1/auth/admin`, {
    credentials: "include",
  });
  if (response.status === 200) {
    return true;
  }
  return false;
}

export async function register(
  firstName: string,
  lastName: string,
  username: string,
  password: string
): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      password,
    }),
  });

  return await handleResponse(response);
}
export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/v1/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
export async function getVacations(): Promise<Vacation[]> {
  const response = await fetch(`${API_URL}/api/v1/vacations`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await handleResponse(response);
}
export function getImageUrl(imageName: string): string {
  return `${API_URL}/images/${imageName}`;
}

export async function createVacation(data: VacationData): Promise<Vacation> {
  const response = await fetch(`${API_URL}/api/v1/vacations`, {
    method: "POST",
    body: createVacationFormData(data),
    credentials: "include",
  });

  return await handleResponse(response);
}
export async function getVacationById(vacationId: number): Promise<Vacation> {
  const response = await fetch(`${API_URL}/api/v1/vacations/${vacationId}`);
  // console.log(vacationId);
  return await handleResponse(response);
}

export async function getFollowersById(
  vacationId: number
): Promise<FollowingResponse> {
  const response = await fetch(`${API_URL}/api/v1/following/${vacationId}`, {
    credentials: "include",
  });
  // console.log(vacationId);
  return await handleResponse(response);
}

export async function addFollowers(
  vacationId: number
): Promise<Follower & { mode: "delete" | "add" }> {
  const response = await fetch(`${API_URL}/api/v1/following`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      vacationId,
    }),
  });

  console.log(response);
  return await handleResponse(response);
}

export async function updateVacation(
  vacationId: number,
  data: VacationData
): Promise<Vacation> {
  const response = await fetch(`${API_URL}/api/v1/vacations/${vacationId}`, {
    method: "PUT",
    body: createVacationFormData(data),
    credentials: "include",
  });
  return await handleResponse(response);
}

export async function deleteVacation(vacationId: number): Promise<void> {
  await fetch(`${API_URL}/api/v1/vacations/${vacationId}`, {
    method: "DELETE",
    credentials: "include",
  });
}
