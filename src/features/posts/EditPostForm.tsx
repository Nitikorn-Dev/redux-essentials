import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks';
import { postUpdated, selectPostById } from './postsSlice';

function EditPostForm() {
    const { postId } = useParams();
    // const post = useAppSelector(state => state.posts.data.find(post => post.id === postId));
    const post = useAppSelector((state) => selectPostById(state, postId!))
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ id: postId, title: post?.title, content: post?.content });
    const hendleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const onSavePost = () => {
        dispatch(postUpdated({ ...form }))
        navigate(`/posts/${postId}`);
    }
    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="title"
                    placeholder="What's on your mind?"
                    value={form.title}
                    onChange={hendleChange}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="content"
                    value={form.content}
                    onChange={hendleChange}
                />
            </form>
            <button type="button" onClick={onSavePost}>
                Save Post
            </button>
        </section>
    )
}

export default EditPostForm