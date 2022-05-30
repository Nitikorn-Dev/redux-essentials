import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NotificationsList from "./features/notifications/NotificationsList";


const Routers = () => useRoutes([
    {
        index: true,
        element:
            <React.Fragment>
                <AddPostForm />
                <PostsList />
            </React.Fragment>
    },
    {
        path: '/posts/:postId', element: <SinglePostPage />
    },
    {
        path: '/editPost/:postId', element: <EditPostForm />
    },
    {
        path: '/users', element: <UsersList />
    },
    {
        path: '/users/:userId', element: <UserPage />
    },
    {
        path: 'notifications', element: <NotificationsList />
    },
    {
        path: 'notfound', element: <>Notfound</>
    },
    {
        path: '*', element: <Navigate to="/notfound" replace />
    },

]);

export default Routers;