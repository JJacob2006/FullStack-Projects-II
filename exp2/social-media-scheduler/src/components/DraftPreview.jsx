import { FilePenLine } from "lucide-react";

import PostSection from "./PostSection";
import { STATUS } from "../constants/status";

function DraftPreview() {
    return (
        <PostSection
            title="Draft Posts"
            status={STATUS.DRAFT}
            icon={<FilePenLine size={22} />}
            emptyMessage="You don't have any draft posts yet. Start writing to save your first draft."
        />
    );
}

export default DraftPreview;
