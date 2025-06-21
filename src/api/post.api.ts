import { axiosClient } from "@/lib/axios";

export const getNewsFeed = async () => {
  const res = await axiosClient.get("/posts/news-feed");
  return res?.data.data;
};

export const createPost = async (formData: FormData) => {
  return axiosClient.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getPostByAuthorID = async id => {
  const res = await axiosClient.get(`/users/${id}/posts`);
  return res.data.data;
};
