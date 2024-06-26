import { api } from "../api";

export const editUsername = async (username: string) =>
  api
    .patch("/users/me/change-name", {
      username,
    })
    .then((res) => res.data);

export const signInUser = async () =>
  api.get("/users/me").then((res) => res.data);

export const signOutUser = async () =>
  api.get("/users/me/sign-out", { withCredentials: true });

export const deleteAccount = async () => await api.delete("/users/me");
