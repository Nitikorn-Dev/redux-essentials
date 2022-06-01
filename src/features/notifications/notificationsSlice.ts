import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../store";

export const fetchNotifications = createAsyncThunk(
    "nitifications/fetchNitifications", async (_, { getState, rejectWithValue }) => {
        try {
            console.log("fetch Notifications before")
            const allNotifications = selectAllNotifications(getState() as any);
            const [latestNotification] = allNotifications;
            const letestTimestamp = latestNotification ? latestNotification.date : '';
            const response = await client.get(
                `/fakeApi/notifications?since=${letestTimestamp}`
            );
            console.log("fetch Notifications after", response.data)
            return response.data;
        } catch (err: any) {
            if (!err.response) { throw err; };
            rejectWithValue(err.response.data);

        }
    }
)

interface Notification {
    isNew: boolean;
    read: boolean;
    date: any;
}
export interface initalNotificationState extends EntityState<Notification> {

}
const notificationsAdapter = createEntityAdapter<Notification>({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = notificationsAdapter.getInitialState();

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        allNotificationsRead(state: initalNotificationState) {
            // state.forEach(notification => {
            //     notification.read = true;
            // })
            Object.values(state.entities).forEach((notification) => {
                if (notification) {
                    notification.read = true;
                }
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state: initalNotificationState, action) => {
            // state.push(...action.payload);
            // state.forEach(notification => {
            //     notification.isNew = !notification.read;
            // })
            // state.sort((a, b) => b.date?.localeCompare(a.date))
            notificationsAdapter.upsertMany(state, action.payload);
            Object.values(state.entities).forEach((notification) => {
                if (notification) {
                    notification.isNew = !notification.read;
                }
            })
        })
    },
});
export const { allNotificationsRead } = notificationsSlice.actions;
export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors((state: RootState) => state.notifications);
// export const selectAllNotifications = (state: any) => state.notifications;
export default notificationsSlice.reducer;