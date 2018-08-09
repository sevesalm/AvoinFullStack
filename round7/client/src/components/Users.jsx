import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Users = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Blogs</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>
            <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Users);
