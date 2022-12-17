import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import { HttpPostParams } from "../../../data/protocols/http/http-post-client";
import { mockAxios } from "../../test/mock-axios";
import { mockPostRequest } from "../../../data/test/mock-http-post";

const mockedAxiosResult = {
  data: { email: "test_email" },
  status: 200,
};

jest.mock("axios");

interface SutTypes {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe("AxiosHttpClient", () => {
  test("Should call axios with correct values.", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should return the correct statusSoce and body.", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    const httpResponse = sut.post(request);
    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
