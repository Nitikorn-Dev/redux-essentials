import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks';
import { selectAllPost } from '../posts/postsSlice';
import { selectUsersById } from './userSlice';

function UserPage() {
    const { userId } = useParams();
    const user = useAppSelector(state => selectUsersById(state.users, userId!));
    const postsForUser = useAppSelector(state => {
        const allPost = selectAllPost(state.posts);
        return allPost.filter(post => post.user === userId)
    });

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))
    return (
        <section>
            <h2>{user?.name}</h2>
            <ul>{postTitles}</ul>

        </section>
    )
}

export default UserPage