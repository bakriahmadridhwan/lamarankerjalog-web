type RegisterRequest = {
  username: string;
  password: string;
  name: string;
};

type LoginRequest = {
  username: string;
  password: string;
};

type UpdateProfileRequest = {
  name: string;
};

type UpdatePasswordRequest = {
  password: string;
};

export const userRegister = async ({
  username,
  password,
  name,
}: RegisterRequest): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      name,
    }),
  });
};

export const userLogin = async ({
  username,
  password,
}: LoginRequest): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const userUpdateProfile = async (
  token: string,
  { name }: UpdateProfileRequest,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
    body: JSON.stringify({
      name,
    }),
  });
};

export const userUpdatePassword = async (
  token: string,
  { password }: UpdatePasswordRequest,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
    body: JSON.stringify({
      password,
    }),
  });
};

export const userDetail = async (token: string): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
  });
};

export const userLogout = async (token: string): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/logout`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
  });
};
