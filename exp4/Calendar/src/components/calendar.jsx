import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { selectPost } from "../features/posts/postSlice";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const events = posts.map((post) => {
    const start = new Date(`${post.date}T${post.time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    return {
      id: post.id,
      title: `${post.platform} • ${post.title}`,
      start,
      end,
      resource: post,
    };
  });

  const eventStyleGetter = (event) => {
    let backgroundColor = "#2563eb";

    switch (event.resource.platform) {
      case "Instagram":
        backgroundColor = "#E1306C";
        break;

      case "Facebook":
        backgroundColor = "#1877F2";
        break;

      case "Twitter":
        backgroundColor = "#1DA1F2";
        break;

      case "LinkedIn":
        backgroundColor = "#0077B5";
        break;

      case "YouTube":
        backgroundColor = "#FF0000";
        break;

      default:
        backgroundColor = "#2563eb";
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        border: "none",
        color: "#fff",
      },
    };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        selectable
        popup
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) =>
          dispatch(selectPost(event.resource))
        }
      />
    </div>
  );
}

export default MyCalendar;