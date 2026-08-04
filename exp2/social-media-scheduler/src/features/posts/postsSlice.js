import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  editingPost: null,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updateStatus: (state, action) => {

      const post = state.posts.find(
        (p) => p.id === action.payload.id
      );

      if (post) {
        post.status = action.payload.status;
      }

    },

    setEditingPost: (state, action) => {

      state.editingPost = action.payload;

    },

    clearEditingPost: (state) => {

      state.editingPost = null;

    },

    updatePost: (state, action) => {

      const index = state.posts.findIndex(
        (p) => p.id === action.payload.id
      );

      if (index !== -1) {

        state.posts[index] = action.payload;

      }

    },

  },

});

export const {

  addPost,

  deletePost,

  updateStatus,

  setEditingPost,

  clearEditingPost,

  updatePost,

} = postsSlice.actions;

export default postsSlice.reducer;

