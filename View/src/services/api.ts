import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4466",
});

const signin = (username: string, password: string) =>
  api.post("/auth/signin", { username, password });

const signout = () => api.post("/auth/signout");

export { signin, signout };
