import React from "react";
import { shallow } from "enzyme";
import SimpleBlog from "./SimpleBlog";

describe("SimpleBlog", () => {
  const testBlog = {
    title: "Test Title",
    author: "Test Author",
    likes: 10
  };

  it("is rendered correctly", () => {
    const blog = shallow(<SimpleBlog blog={testBlog} />);
    const blogDetails = blog.find(".blog-details").text();
    expect(blogDetails).toContain(testBlog.title);
    expect(blogDetails).toContain(testBlog.author);
    expect(blog.find(".blog-likes").text()).toContain(testBlog.likes);
  });

  it("is registering clicks", () => {
    const handleClick = jest.fn();
    const blog = shallow(<SimpleBlog blog={testBlog} onClick={handleClick} />);
    const button = blog.find("button");
    button.simulate("click");
    button.simulate("click");
    expect(handleClick.mock.calls.length).toEqual(2);
  });
});
