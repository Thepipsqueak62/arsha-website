import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:3000",
});

export const signup = (username: string, email: string, password: string) =>
    API.post("/auth/sign-up", { username, email, password }); // <-- leading /

export const signin = (email: string, password: string) =>
    API.post("/auth/sign-in", { email, password });

export const passwordResetRequest = (email: string) =>
    API.post("/auth/password-reset-request", { email });

export const passwordReset = (token: string, newPassword: string) =>
    API.post("/auth/password-reset", { token, newPassword });


export const getMe = (token: string) =>
    API.get("/dashboard/me", { headers: { Authorization: `Bearer ${token}` } });
