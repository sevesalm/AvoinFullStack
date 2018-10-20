import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import User from './User';

describe('User', () => {
  const testUser = {
    blogs: [
      {
        _id: 12345,
        author: 'Author',
        title: 'Title'
      }
    ],
    name: 'Test User'
  };

  it('shows user details', () => {
    const user = mount(
      <MemoryRouter>
        <User user={testUser} />
      </MemoryRouter>
    );
    const userElement = user.find('.user').text();
    expect(userElement).toContain(testUser.name);
    const blogs = user.find('ListItem');
    expect(blogs.length).toEqual(1);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <User user={testUser} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
