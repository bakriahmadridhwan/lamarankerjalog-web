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
