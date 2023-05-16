export type acceptedType = {
  _id: string;
  isAccepted: "invite" | "deny" | "pending";
  senderId: string;
  receiverId?: string;
};

export type reply = {
  _id: string;
  vacancyId: string;
  userResumeId: string;
  vacancyName: string;
  userId: string;
  userTestAnswer: string;
  userName: string;
  createdDate: string;
  accepted: acceptedType;
};
