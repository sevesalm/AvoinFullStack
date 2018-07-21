import React from "react";
import { shallow, mount } from "enzyme";
import Blog from "./Blog";

describe("Blog", () => {
  const testBlog = {
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
    likes: 10
  };

  it("shows only title and author initially", () => {
    const blog = shallow(<Blog blog={testBlog} />);
    const blogElement = blog.find(".blog").text();
    expect(blogElement).toContain(testBlog.title);
    expect(blogElement).toContain(testBlog.author);
    expect(blog.find(".blog-details").length).toEqual(0);
  });

  it("shows details after clicking the title", () => {
    const blog = mount(<Blog blog={testBlog} incrementLikes={jest.fn()} />);
    blog.find(".blog-title").simulate("click");
    const blogDetails = blog.find(".blog-details");
    expect(blogDetails.length).toEqual(1);
    expect(blogDetails.text()).toContain(testBlog.url);
    expect(blogDetails.text()).toContain(testBlog.likes);
  });
});
