type RegisterRequest = {
  username: string;
  password: string;
  name: string;
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
