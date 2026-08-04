import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import platformsReducer from "../features/platforms/platformsSlice";
import uiReducer from "../features/ui/uiSlice";

const loadState = () => {
    try {
        const saved = localStorage.getItem("posts");

        if (!saved) return undefined;

        return {
            posts: {
                posts: JSON.parse(saved),
                editingPost: null,
            },
        };
    } catch (error) {
        console.error("Failed to load saved posts:", error);
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        platforms: platformsReducer,
        ui: uiReducer,
    },

    preloadedState: loadState(),
});

store.subscribe(() => {
    const state = store.getState();

    localStorage.setItem("posts", JSON.stringify(state.posts.posts));
});
