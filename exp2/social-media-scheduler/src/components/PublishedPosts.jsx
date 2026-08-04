import { CircleCheckBig } from "lucide-react";

import PostSection from "./PostSection";
import { STATUS } from "../constants/status";

function PublishedPosts() {
    return (
        <PostSection
            title="Published Posts"
            status={STATUS.PUBLISHED}
            icon={<CircleCheckBig size={22} />}
            emptyMessage="You haven't published any posts yet. Once a post is marked as published, it will appear here."
        />
    );
}

export default PublishedPosts;
