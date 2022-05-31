import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { selectUsersAll } from '../users/userSlice';
import { allNotificationsRead, selectAllNotifications } from './notificationsSlice'
import classnames from 'classnames'

function NotificationsList() {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectAllNotifications);
    const users = useAppSelector(state => selectUsersAll(state));

    React.useEffect(() => {
        dispatch(allNotificationsRead())
    });

    const renderedNotifications = notifications?.map((notification: any) => {
        const date = parseISO(notification.date);
        const timeAgo = formatDistanceToNow(date);
        const user = users.find(user => user.id === notification.user) || { name: 'Unknown User' };
        const notificationClassname = classnames('notification', { new: notification.isNew })
        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b>{notification.message}
                </div>
                <div title={notification.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        )

    })
    return (
        <section className='notificationsList'>
            <h2>NotificationsList</h2>
            {renderedNotifications}
        </section>
    )
}

export default NotificationsList