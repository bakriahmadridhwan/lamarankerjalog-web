export const APPLICATION_STATUSES = [
  "applied",
  "screening",
  "interview",
  "offer",
  "accepted",
  "rejected",
  "withdrawn",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type CreateApplicationRequest = {
  company: string;
  job_title: string;
  location?: string;
  link?: string;
  application_date: string;
  status: ApplicationStatus;
  notes?: string;
};

export type Application = {
  id: number;
  company: string;
  job_title: string;
  location?: string;
  link?: string;
  application_date: string;
  status: ApplicationStatus;
  notes?: string;
};

export type ListApplicationsRequest = {
  q?: string;
  location?: string;
  status?: ApplicationStatus | "";
  page?: number;
};

export type UpdateApplicationRequest = Partial<
  Omit<CreateApplicationRequest, "location" | "link" | "notes">
> & {
  location?: string | null;
  link?: string | null;
  notes?: string | null;
};

export const applicationCreate = async (
  token: string,
  request: CreateApplicationRequest,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
    body: JSON.stringify(request),
  });
};

export const applicationList = async (
  token: string,
  { q, location, status, page }: ListApplicationsRequest = {},
): Promise<Response> => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/applications`);

  if (q) url.searchParams.append("q", q);
  if (location) url.searchParams.append("location", location);
  if (status) url.searchParams.append("status", status);
  if (page) url.searchParams.append("page", String(page));

  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
  });
};

export const applicationDelete = async (token: string, id: number) => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/applications/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
  });
};

export const applicationDetail = async (
  token: string,
  id: number,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/applications/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
  });
};

export const applicationUpdate = async (
  token: string,
  id: number,
  request: UpdateApplicationRequest,
): Promise<Response> => {
  return await fetch(`${import.meta.env.VITE_API_PATH}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-TOKEN": token,
    },
    body: JSON.stringify(request),
  });
};
