import { createApi, retry, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://158.160.28.109/api",
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).UserReducer ||
      localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
