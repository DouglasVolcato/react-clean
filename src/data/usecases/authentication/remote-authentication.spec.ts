import { HttpPostClient } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL.", async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;
      post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = "any_url";
    const httpPostClintSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClintSpy);
    await sut.auth();
    expect(httpPostClintSpy.url).toBe(url);
  });
});

// describe("first", () => {
//   test("teste", () => {
//     expect("1").toBe("1");
//   });
// });
