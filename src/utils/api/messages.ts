import { BASE_URL } from "../constants"; 
import axios from "axios";

const ENDPOINT = '/messages'

export const messagesApi = { 
  getAllDialogId:(id:string) => axios.get(`${BASE_URL}${ENDPOINT}?dialog=${id}`),
  removeBydId:(id:string) => axios.get(`${BASE_URL}${ENDPOINT}?id=${id}`),
  send: (text:string, dialogId:string, attachments:string) =>
  axios.post(`${BASE_URL}${ENDPOINT}`, {
    text: text,
    dialog_id: dialogId,
    attachments
  })
}