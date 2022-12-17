import { HttpPostParams } from "../protocols/http/http-post-client";

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: "any_url",
  body: {
    email: "any_email",
  },
});
