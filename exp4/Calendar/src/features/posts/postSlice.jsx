import { createSlice } from "@reduxjs/toolkit";
import postsData from "../../Api/postApi";

const initialState = {
  posts: postsData,
  selectedPost: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;

        if (
          state.selectedPost &&
          state.selectedPost.id === action.payload.id
        ) {
          state.selectedPost = action.payload;
        }
      }
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );

      if (
        state.selectedPost &&
        state.selectedPost.id === action.payload
      ) {
        state.selectedPost = null;
      }
    },

    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  selectPost,
} = postSlice.actions;

export default postSlice.reducer;