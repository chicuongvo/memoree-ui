import { axiosClient } from "@/lib/axios";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axiosClient.post("/auth/login", { email, password });
};
