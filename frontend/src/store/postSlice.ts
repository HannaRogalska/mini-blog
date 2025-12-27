import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../api/axios";

export interface Post {
  _id: string;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
};

export const fetchPosts = createAsyncThunk<Post[]>("user/post", async () => {
  const res = await instance.get("/posts/");
  return res.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
