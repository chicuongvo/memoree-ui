import { axiosClient } from "@/lib/axios";

export const getProfile = async id => {
  const res = await axiosClient.get(`/users/${id}`);
  return res.data.data;
};
