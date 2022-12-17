import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { HttpPostParams } from "../../../data/protocols/http/http-post-client";

const mockedAxiosResult = {
  data: { email: "test_email" },
  status: 200,
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: "any_url",
  body: {
    email: "any_email",
  },
});

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values.", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusSoce and body.", async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    const httpResponse = await sut.post(request);
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
