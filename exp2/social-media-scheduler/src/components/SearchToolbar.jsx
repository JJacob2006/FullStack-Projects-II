import { useDispatch, useSelector } from "react-redux";
import { Search, Filter, RotateCcw, ChevronDown } from "lucide-react";

import {
    setSearch,
    setPlatform,
    setStatus,
    clearFilters,
} from "../features/ui/uiSlice";

import { STATUS } from "../constants/status";

function SearchToolbar() {
    const dispatch = useDispatch();

    const { search, platform, status } = useSelector((state) => state.ui);

    const platforms = useSelector((state) => state.platforms.platforms);

    const activeFilters =
        (search.trim() !== "" ? 1 : 0) +
        (platform !== "All Platforms" ? 1 : 0) +
        (status !== "All Status" ? 1 : 0);

    return (
        <section className="toolbar-card">
            <div className="toolbar-header">
                <div className="toolbar-title">
                    <div className="toolbar-icon">
                        <Filter size={20} />
                    </div>

                    <div>
                        <h2>Search & Filters</h2>
                        <p>Quickly find posts across all platforms.</p>
                    </div>
                </div>

                <div className="toolbar-status">
                    <span>
                        {activeFilters} Active
                        {activeFilters === 1 ? " Filter" : " Filters"}
                    </span>
                </div>
            </div>

            <div className="toolbar-grid">
                <div className="toolbar-search">
                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search posts, captions or keywords..."
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </div>

                <div className="toolbar-select">
                    <select
                        value={platform}
                        onChange={(e) => dispatch(setPlatform(e.target.value))}
                    >
                        <option>All Platforms</option>

                        {platforms.map((platform) => (
                            <option key={platform.id} value={platform.name}>
                                {platform.name}
                            </option>
                        ))}
                    </select>

                    <ChevronDown size={16} />
                </div>

                <div className="toolbar-select">
                    <select
                        value={status}
                        onChange={(e) => dispatch(setStatus(e.target.value))}
                    >
                        <option>All Status</option>
                        <option>{STATUS.DRAFT}</option>
                        <option>{STATUS.SCHEDULED}</option>
                        <option>{STATUS.PUBLISHED}</option>
                    </select>

                    <ChevronDown size={16} />
                </div>

                <button
                    className="toolbar-reset-btn"
                    onClick={() => dispatch(clearFilters())}
                >
                    <RotateCcw size={18} />
                    <span>Reset</span>
                </button>
            </div>
        </section>
    );
}

export default SearchToolbar;
