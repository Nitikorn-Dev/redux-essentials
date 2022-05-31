import React from 'react'
import { useAppSelector } from '../hooks'
import { selectUsersById } from '../users/userSlice'

export const PostAuthor = ({ userId }: { userId: any }) => {
    const author = useAppSelector(state => selectUsersById(state, userId));
    return <span>by {author ? author.name : 'Unknown author'}</span>
}