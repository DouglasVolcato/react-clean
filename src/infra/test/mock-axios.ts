import axios from "axios";
import { AxiosHttpClient } from "../http/axios-http-client/axios-http-client";

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue({
    data: { email: "test_email" },
    status: 200,
  });
  return mockedAxios;
};
