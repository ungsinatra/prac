import axios from "axios";
import { BASE_URL } from "../constants";

type dialogApiType = {
  partner: string;
  text: string;
};
const ENDPOINT = "/chats";
export const dialogApi = {
  getAll: (id: string) => {
    console.log(id);
    axios.get(`${BASE_URL}${ENDPOINT}/${id}`);
  },
  create: ({ partner, text }: dialogApiType) =>
    axios.post(`${BASE_URL}${ENDPOINT}`, { partner, text }),
};
