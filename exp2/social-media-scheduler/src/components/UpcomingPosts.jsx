import { CalendarClock } from "lucide-react";

import PostSection from "./PostSection";
import { STATUS } from "../constants/status";

function UpcomingPosts() {
    return (
        <PostSection
            title="Upcoming Schedule"
            status={STATUS.SCHEDULED}
            icon={<CalendarClock size={22} />}
            emptyMessage="No scheduled posts yet. Create one to start building your publishing calendar."
        />
    );
}

export default UpcomingPosts;
