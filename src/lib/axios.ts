import { Axios } from "axios";

export const api = new Axios({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "x-nuzlocke-source": "WEB_CLIENT",
  },
});
