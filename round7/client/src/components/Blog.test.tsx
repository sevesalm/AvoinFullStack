import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Blog } from './Blog';

describe('Blog', () => {
  const testBlog = {
    author: 'Test Author',
    comments: ['Is good', 'Meh', 'Is baad'],
    likes: 10,
    title: 'Test Title',
    url: 'http://test.com'
  };

  it('shows blog details', () => {
    const blog = mount(<Blog blog={testBlog} />);
    const blogElement = blog.find('.blog').text();
    expect(blogElement).toContain(testBlog.title);
    expect(blogElement).toContain(testBlog.author);
    expect(blogElement).toContain(testBlog.url);
    const comments = blog.find('.blog-comments li');
    expect(comments.length).toEqual(3);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Blog blog={testBlog} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
