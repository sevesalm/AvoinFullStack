import React from "react";
import { mount } from "enzyme";
import App, { LOCAL_STORAGE_USER_KEY } from "./App";
jest.mock("./services/blogs");
// import blogService from "./services/blogs";

describe("App", () => {
  let app;

  describe("when not logged in", () => {
    beforeEach(() => {
      app = mount(<App />);
      window.localStorage.clear();
    });

    it("renders only the login button", () => {
      app.update();
      const blogView = app.find(".blog-view");
      expect(blogView.length).toEqual(0);
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      const user = {
        username: "testuser",
        name: "Test User",
        token: "123123123"
      };

      window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

      app = mount(<App />);
    });

    it("renders a list of blogs", () => {
      app.update();
      const blogView = app.find(".blog-view");
      expect(blogView.length).toEqual(1);
      expect(app.find(".blog .blog-title").length).toEqual(2);
    });
  });
});
