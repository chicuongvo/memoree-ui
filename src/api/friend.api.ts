import { axiosClient } from "@/lib/axios";

export const getAllFriends = async () => {
  const res = await axiosClient.get("/friendships");
  return res?.data.data;
};

export const getAllRequestSent = async () => {
  const res = await axiosClient.get("/friendships/requests-sent");
  return res?.data.data;
};

export const getAllRequestReceived = async () => {
  const res = await axiosClient.get("/friendships/requests-received");
  return res?.data.data;
};

export const deleteFriendship = async (id: number) => {
  return axiosClient.delete(`/friendships/${id}`);
};

export const acceptFriendRequest = async (id: number) => {
  return axiosClient.patch(`/friendships/${id}`);
};
