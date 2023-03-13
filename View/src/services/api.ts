import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4466",
});

const signin = (username: string, password: string) =>
  api.post("/auth/signin", { username, password });

const signout = () => api.get("/auth/signout");

const signup = (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  return api.post("/auth/signup", {
    name,
    username,
    email,
    password,
  });
};

const session = () => api.get("/auth/session");

const user = (username: string) => api.get(`/user/${username}`);

export { signin, signout, signup, session, user };
