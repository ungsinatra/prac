import { url } from "inspector";
import { api } from "./api";
import { user } from "../../types/user";

type ReqTypeData = {
  email: string;
  password: string;
};

type ResLoginData = {
  token: string;
  _id: user;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResLoginData, ReqTypeData>({
      query: (userData) => ({
        url: "/singin",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<user, user>({
      query: (userData) => ({
        url: "/singup",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<user, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
  
});


export const {useCurrentQuery,useLoginMutation,useRegisterMutation} = authApi;
export const {endpoints:{login,register,current} } = authApi;