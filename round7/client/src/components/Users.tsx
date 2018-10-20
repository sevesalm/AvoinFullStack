import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import { IUser } from '../reducers/userReducer';

const Users = ({ users }: { users: IUser[] }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Blogs</TableCell>
      </TableRow>
    </TableHead>
    <tbody>
      {users.map((user: IUser) => (
        <TableRow key={user.id}>
          <TableCell>
            <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
          </TableCell>
          <TableCell>{user.blogs.length}</TableCell>
        </TableRow>
      ))}
    </tbody>
  </Table>
);

const mapStateToProps = (state: any) => ({
  users: state.users
});

export default connect(mapStateToProps)(Users);
