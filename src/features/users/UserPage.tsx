import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks';
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice';
import { RootState } from '../store';
import { selectUsersById } from './userSlice';

function UserPage() {
    const { userId } = useParams();
    const user = useAppSelector(state => selectUsersById(state, userId!));
    // const postsForUser = useAppSelector(state => {
    //     const allPost = selectAllPosts(state);
    //     return allPost.filter(post => post.user === userId)
    // });

    // const selectPostByUserId = useCallback(selectPostsByUser, [])
    const postsForUser = useAppSelector(state => selectPostsByUser(state, String(userId)))
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