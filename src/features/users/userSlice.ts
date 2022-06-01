import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { client } from '../../api/client';
import { RootState } from '../store';

const usersAdapter = createEntityAdapter<User>();


interface User {
    id: string;
    name: string;
}
interface initUserState extends EntityState<User> {
    // data: User[];
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await client.get('/fakeApi/users');
        console.log("User fetch", response.data)
        return response.data;
    } catch (err: any) {
        if (!err.response) { throw err; };
        rejectWithValue(err.response.data);
    }
})

const initialState: initUserState = usersAdapter.getInitialState();

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state: initUserState, action) => {
                console.log("succeeded", action.payload)
                // state.data = action.payload;
                usersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                console.log(action.error)
            })
    }
})
export const { selectAll: selectAllUsers, selectById: selectUsersById } = usersAdapter.getSelectors((state: RootState) => state.users);
// export const selectUsersAll = (state: initUserState) => state.data;
// export const selectUsersById = (state: initUserState, userId: string) => state.data?.find(user => user.id === userId);
// export const selectUsersAll = (state: RootState) => state.users.data;
// export const selectUsersById = (state: RootState, userId: string) => state.users.data?.find(user => user.id === userId);
export default usersSlice.reducer