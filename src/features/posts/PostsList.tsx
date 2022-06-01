import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks'
import { PostAuthor } from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import { TimeAgo } from './TimeAgo';
import { fetchPosts, postErrors, postStatus, selectAllPosts, selectPostById, selectPostIds } from '../posts/postsSlice';
import { Spinner } from '../../components/Spinner';

let PostExcerpt: React.FC<{ postId: any }> = ({ postId }) => {
    const post = useAppSelector(state => selectPostById(state, postId))

    return (
        <React.Fragment>
            {
                post ?
                    <article className="post-excerpt" key={post.id}>
                        <h3>{post.title}</h3>
                        <div>
                            <PostAuthor userId={post.user} />
                            <TimeAgo timestamp={post.date} />
                        </div>
                        <p className="post-content">{post.content.substring(0, 100)}</p>
                        <ReactionButtons post={post} />
                        <Link to={`/posts/${post.id}`} className="button muted-button">
                            View Post
                        </Link>
                    </article>
                    : null
            }

        </React.Fragment>
    )
}

PostExcerpt = React.memo(PostExcerpt)

function PostsList() {
    const dispatch = useAppDispatch();
    // const posts = useAppSelector(selectAllPosts);
    const orderedPostIds = useAppSelector(selectPostIds);
    const status = useAppSelector(postStatus);
    const error = useAppSelector(postErrors);
    console.log('PostList', status)
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch, status])

    let content: any;
    if (status === 'loading') {
        content = <Spinner text='loading...' />
    } else if (status === 'succeeded') {
        // const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPostIds.map(postId => (
            <PostExcerpt postId={postId} key={postId} />
        ));
    } else if (status === 'failed') {
        content = <div>{error}</div>
    }
    // const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    // const renderedPosts = orderPosts.map(post => (
    //     <article className="post-excerpt" key={post.id}>
    //         <h3>{post.title}</h3>
    //         <div>
    //             <PostAuthor userId={post.user} />
    //             <TimeAgo timestamp={post.date} />
    //         </div>
    //         <p className="post-content">{post.content.substring(0, 100)}</p>
    //         <ReactionButtons post={post} />
    //         <Link to={`/posts/${post.id}`} className="button muted-button">
    //             View Post
    //         </Link>
    //     </article>
    // ))
    // const renderPosts = posts.map(post => (
    //     <article className="post-excerpt" key={post.id}>
    //         <h3>{post.title}</h3>
    //         <p className="post-content">{post.content}</p>
    //         <Link to={`/posts/${post.id}`} className="button muted-button">
    //             View Post
    //         </Link>
    //     </article>
    // ))
    return (
        <section className="post-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList