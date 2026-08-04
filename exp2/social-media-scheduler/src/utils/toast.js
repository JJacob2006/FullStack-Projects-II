import { toast } from "react-toastify";

export const notify = {
    draftSaved: () => toast.success("Draft saved successfully!"),

    scheduled: () => toast.success("Post scheduled successfully!"),

    updated: () => toast.info("Post updated!"),

    deleted: () => toast.error("Post deleted."),

    published: () => toast.success("Post published!"),
};
