import { membersChatType } from "../types/chats";

export const usefindResiverMessage = (
  members: membersChatType[],
  userId: string | null
) => {
  if (!userId) {
    return;
  }
  let res;
  members.forEach((element) => {
    if (!element.userId.includes(userId)) {
      res = element.name;
    } else {
      res = "Вы";
    }
  });
  return res;
};
