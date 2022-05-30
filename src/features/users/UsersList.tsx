import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks'
import { selectUsersAll } from './userSlice'

function UsersList() {
    const users = useAppSelector(state => selectUsersAll(state.users));
    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
    ))
    return (
        <section>
            <div>Users</div>
            <ul>{renderedUsers}</ul>
        </section>
    )
}

export default UsersList