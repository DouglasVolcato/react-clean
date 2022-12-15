import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL.", async () => {
    const url = "any_url";
    const httpPostClintSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClintSpy);
    await sut.auth();
    expect(httpPostClintSpy.url).toBe(url);
  });
});
