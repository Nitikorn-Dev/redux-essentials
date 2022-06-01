import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectAllUsers } from '../users/userSlice';
import { addNewPost } from './postsSlice';

function AddPostForm() {
    const users = useAppSelector(selectAllUsers)

    const dispatch = useAppDispatch();

    const [form, setForm] = useState({ title: "", content: "", user: "" });
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const hendleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
    }

    // const optionChange = (e:React.ChangeEvent<HTMLSelectElement>)=> {
    //     setForm({...form,userId:e.target.value})
    // }

    // const canSave = Boolean(form.title) && Boolean(form.content) && Boolean(form.user);


    const canSave = [form.title, form.content, form.user].every(Boolean) && addRequestStatus === 'idle'

    const onSavePost = () => {
        if (canSave) {
            try {
                dispatch(addNewPost({ ...form })).unwrap();
                setForm({ title: "", content: "", user: "" });
            } catch (err: any) {
                console.error("Failed to save the post: ", err);
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }
    const usersOptions = users?.map(user => (
        <option key={user.name} value={user.id}>
            {user.name}
        </option>
    ))
    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="title"
                    value={form.title}
                    onChange={hendleChange}
                />
                <label htmlFor='postAuthor'>Author:</label>
                <select id="postAuthor" value={form.user} name="user" onChange={hendleChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="content"
                    value={form.content}
                    onChange={hendleChange}
                />
                <button type="button" onClick={onSavePost} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm