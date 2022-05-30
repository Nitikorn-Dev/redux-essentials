import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
    "nitifications/fetchNitifications", async (_, { getState, rejectWithValue }) => {
        try {
            console.log("fetch Notifications before")
            const allNotifications = selectAllNotifications(getState());
            const [latestNotification] = allNotifications;
            const letestTimestamp = latestNotification ? latestNotification.data : '';
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


const notificationsSlice = createSlice({
    name: "notifications",
    initialState: [],
    reducers: {
        allNotificationsRead(state: any[]) {
            state.forEach(notification => {
                notification.read = true;
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state: any[], action) => {
            state.push(...action.payload);
            state.forEach(notification => {
                notification.isNew = !notification.read;
            })
            state.sort((a, b) => b.date?.localeCompare(a.date))

        })
    },
});
export const { allNotificationsRead } = notificationsSlice.actions
export const selectAllNotifications = (state: any) => state.notifications;
export default notificationsSlice.reducer;