import React from 'react';
import { useAppDispatch } from '../hooks';
import { PostType, reactionAdded } from '../posts/postsSlice';
const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
};

function ReactionButtons({ post }: { post: any }) {
    const dispatch = useAppDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name as keyof PostType["reactions"] }))}
                key={name}
                type="button"
                className='muted-button reaction-button'
            >
                {emoji}{post.reactions[name]}
            </button>
        )
    })

    return (<div>{reactionButtons}</div>)
}
export default ReactionButtons;