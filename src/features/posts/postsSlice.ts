import { createAsyncThunk, createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
// import { sub } from 'date-fns';
import { client } from '../../api/client';
import { RootState } from '../store';

type Optional<T> = {
    [P in keyof T]?: T[P]
}
export interface PostType {
    id: string;
    title: string;
    content: string;
    date: any;
    user: any;
    reactions: {
        thumbsUp: number;
        hooray: number;
        heart: number;
        rocket: number;
        eyes: number;
    };
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface initalPostState {
    data: PostType[],
    status: Status,
    error: string | null | undefined

}



// const initialState: initalPostState[] = [
//     {
//         id: '1',
//         title: 'First Post!',
//         user: {},
//         content: 'Hello!',
//         reactions: {
//             thumbsUp: 0,
//             hooray: 0,
//             heart: 0,
//             rocket: 0,
//             eyes: 0,
//         },
//         date: sub(new Date(), { minutes: 10 }).toISOString()
//     },
//     {
//         id: '2',
//         title: 'Second Post',
//         user: {},
//         content: 'More text',
//         reactions: {
//             thumbsUp: 0,
//             hooray: 0,
//             heart: 0,
//             rocket: 0,
//             eyes: 0,
//         },
//         date: sub(new Date(), { minutes: 5 }).toISOString()
//     }
// ]

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
//     try {
//         const response = await client.get('/fakeApi/posts');
//         console.log('fatchPosts', response.data)
//         return response.data;
//     } catch (err: any) {
//         console.log(err);
//         if (err.response) {
//             throw err;
//         }
//         rejectWithValue(err.response.data);
//     }
// })
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await client.get('/fakeApi/posts')
        console.log("fetchPosts", response.data)
        return response.data
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        console.log("Err", err.response.data)
        rejectWithValue(err.response.data)

    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post: Optional<PostType>, { rejectWithValue }) => {
    try {
        console.log("AddNew Poste Paramiter:", post)
        const response = await client.post('/fakeApi/posts', post)
        console.log("addNewPosts", response.data)
        return response.data
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        console.log("Err", err.response.data)
        rejectWithValue(err.response.data)

    }
})

const initialState: initalPostState = {
    data: [],
    status: 'idle',
    error: null


}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state: any, action: any) {
                state.push(action.payload);
            },
            prepare(title: string, content: string, user: string) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user
                    }
                }
            },
        },
        postUpdated(state: initalPostState, action: any) {
            const { id, title, content } = action.payload
            const existingPost = state.data.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state: initalPostState, action: PayloadAction<{ postId: string, reaction: keyof PostType["reactions"] }>) {
            const { postId, reaction } = action.payload;
            const existingPost = state.data.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }

        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("succeeded", action.payload)
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                console.log(action.error)
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("succeeded", action.payload)
                state.data.push(action.payload);
            })
    },
})
export const selectAllPosts = (state: RootState) => state.posts.data;
export const selectPostById = (state: initalPostState, postId: string) => state.data.find(post => post.id === postId);
export const postErrors = (state: initalPostState) => state.error;
export const postStatus = (state: initalPostState) => state.status;

const selectItemId = (state: RootState, userId: string) => userId

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state: RootState, userId: string) => userId],
    (data, userId) => data.filter((post) => post.user === userId)
)
export const { addPost, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer