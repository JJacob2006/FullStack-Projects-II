import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";

import { STATUS } from "../constants/status";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function safeDate(value) {
    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
}

function MonthlyCalendar() {
    const posts = useSelector((state) => state.posts.posts);

    const scheduledPosts = useMemo(() => {
        return posts
            .filter((post) => post.status === STATUS.SCHEDULED)
            .map((post) => ({
                ...post,
                scheduleDateObject: safeDate(post.scheduleDate),
            }))
            .filter((post) => post.scheduleDateObject);
    }, [posts]);

    const [monthCursor, setMonthCursor] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const [selectedDate, setSelectedDate] = useState(null);

    const postsByDay = useMemo(() => {
        return scheduledPosts.reduce((accumulator, post) => {
            const key = toDateKey(post.scheduleDateObject);

            accumulator[key] ||= [];
            accumulator[key].push(post);

            return accumulator;
        }, {});
    }, [scheduledPosts]);

    const highlightedDates = useMemo(
        () => Object.keys(postsByDay),
        [postsByDay],
    );

    const todayKey = toDateKey(new Date());

    useEffect(() => {
        if (scheduledPosts.length === 0) {
            setSelectedDate(null);
            return;
        }

        if (!selectedDate || !postsByDay[selectedDate]?.length) {
            const preferredDate = highlightedDates.includes(todayKey)
                ? todayKey
                : highlightedDates[0];

            setSelectedDate(preferredDate);
        }
    }, [
        highlightedDates,
        postsByDay,
        scheduledPosts.length,
        selectedDate,
        todayKey,
    ]);

    const monthLabel = monthCursor.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
    });

    const monthDays = useMemo(() => {
        const firstDay = new Date(
            monthCursor.getFullYear(),
            monthCursor.getMonth(),
            1,
        ).getDay();

        const daysInMonth = new Date(
            monthCursor.getFullYear(),
            monthCursor.getMonth() + 1,
            0,
        ).getDate();

        const calendarDays = [];

        for (let index = 0; index < firstDay; index += 1) {
            calendarDays.push(null);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            calendarDays.push(
                new Date(
                    monthCursor.getFullYear(),
                    monthCursor.getMonth(),
                    day,
                ),
            );
        }

        while (calendarDays.length % 7 !== 0) {
            calendarDays.push(null);
        }

        return calendarDays;
    }, [monthCursor]);

    const selectedPosts = useMemo(() => {
        if (!selectedDate) return [];

        return [...(postsByDay[selectedDate] || [])].sort((postA, postB) => {
            return (
                postA.scheduleDateObject.getTime() -
                postB.scheduleDateObject.getTime()
            );
        });
    }, [postsByDay, selectedDate]);

    return (
        <div className="calendar-panel">
            <div className="calendar-header">
                <div className="calendar-title-wrap">
                    <div className="calendar-title-icon">
                        <CalendarDays size={18} />
                    </div>

                    <div>
                        <p className="eyebrow">Calendar</p>
                        <h3>{monthLabel}</h3>
                    </div>
                </div>

                <div className="calendar-nav">
                    <button
                        className="icon-btn"
                        onClick={() =>
                            setMonthCursor(
                                new Date(
                                    monthCursor.getFullYear(),
                                    monthCursor.getMonth() - 1,
                                    1,
                                ),
                            )
                        }
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        className="icon-btn"
                        onClick={() =>
                            setMonthCursor(
                                new Date(
                                    monthCursor.getFullYear(),
                                    monthCursor.getMonth() + 1,
                                    1,
                                ),
                            )
                        }
                        aria-label="Next month"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="calendar-grid">
                {weekdayLabels.map((label) => (
                    <div key={label} className="calendar-day-label">
                        {label}
                    </div>
                ))}

                {monthDays.map((date, index) => {
                    if (!date) {
                        return (
                            <div
                                key={`empty-${index}`}
                                className="calendar-day empty-day"
                            />
                        );
                    }

                    const dateKeyValue = toDateKey(date);
                    const isHighlighted =
                        highlightedDates.includes(dateKeyValue);
                    const isSelected = selectedDate === dateKeyValue;
                    const isToday = dateKeyValue === todayKey;
                    const postCount = postsByDay[dateKeyValue]?.length || 0;

                    return (
                        <button
                            key={dateKeyValue}
                            className={`calendar-day ${isHighlighted ? "has-posts" : ""} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                            onClick={() => setSelectedDate(dateKeyValue)}
                            type="button"
                            aria-pressed={isSelected}
                        >
                            <span className="calendar-day-number">
                                {date.getDate()}
                            </span>

                            {isHighlighted ? (
                                <span className="calendar-day-indicator">
                                    {postCount}
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <div className="calendar-details">
                <div className="calendar-details-header">
                    <span>
                        {selectedDate
                            ? new Date(
                                  `${selectedDate}T00:00:00`,
                              ).toLocaleDateString("en-IN", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                              })
                            : "No date selected"}
                    </span>

                    <strong>
                        {selectedPosts.length > 0
                            ? `${selectedPosts.length} scheduled`
                            : "No posts"}
                    </strong>
                </div>

                {selectedPosts.length > 0 ? (
                    <div className="calendar-post-list">
                        {selectedPosts.map((post) => (
                            <div key={post.id} className="calendar-post-item">
                                <div className="calendar-post-item-top">
                                    <div>
                                        <strong>{post.title}</strong>
                                        <span>{post.platform}</span>
                                    </div>

                                    <span className="status-pill">
                                        {post.status}
                                    </span>
                                </div>

                                <div className="calendar-post-meta">
                                    <span>
                                        <Clock3 size={14} />
                                        {post.scheduleDateObject.toLocaleTimeString(
                                            "en-IN",
                                            {
                                                hour: "numeric",
                                                minute: "2-digit",
                                            },
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="calendar-empty-card">
                        <CalendarDays size={20} />
                        <strong>No scheduled posts for this date</strong>
                        <span>
                            Choose another day to review your publishing queue.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MonthlyCalendar;
