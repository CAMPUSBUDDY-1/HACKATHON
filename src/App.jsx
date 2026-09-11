import { useState } from "react";
import "./App.css";

const spaces = [
  {
    id: 1,
    name: "Central Library",
    type: "Library",
    location: "2nd Floor",
    capacity: 50,
    available: 18,
    status: "Available",
    environment: "Quiet",
  },
  {
    id: 2,
    name: "Block 34 - Room 204",
    type: "Classroom",
    location: "2nd Floor",
    capacity: 40,
    available: 8,
    status: "Moderate",
    environment: "Quiet",
  },
  {
    id: 3,
    name: "Student Activity Center",
    type: "Common Area",
    location: "Ground Floor",
    capacity: 60,
    available: 32,
    status: "Available",
    environment: "Social",
  },
  {
    id: 4,
    name: "Block 32 - Study Hall",
    type: "Study Hall",
    location: "1st Floor",
    capacity: 35,
    available: 5,
    status: "Busy",
    environment: "Quiet",
  },
];

const events = [
  {
    id: 1,
    title: "AI & Innovation Workshop",
    category: "TECHNOLOGY",
    date: "12",
    month: "SEP",
    time: "5:00 PM",
    location: "Block 34",
  },
  {
    id: 2,
    title: "Campus Coding Challenge",
    category: "COMPETITION",
    date: "13",
    month: "SEP",
    time: "6:30 PM",
    location: "University Auditorium",
  },
  {
    id: 3,
    title: "Inter-University Football",
    category: "SPORTS",
    date: "14",
    month: "SEP",
    time: "4:00 PM",
    location: "Sports Complex",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [filter, setFilter] = useState("All");
  const [aiQuery, setAiQuery] = useState("");

  const filteredSpaces =
    filter === "All"
      ? spaces
      : spaces.filter((space) => space.status === filter);

  function handleAI() {
    if (!aiQuery.trim()) return;
    setPage("ai");
  }

  function getDirections() {
    if (!selectedSpace) return;

    const location =
      selectedSpace.name + ", LPU, Punjab";

    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(location);

    window.open(url, "_blank");
  }

  if (page === "spaces") {
    return (
      <div className="app">
        <Navbar setPage={setPage} />

        <main className="space-finder">
          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back to dashboard
          </button>

          <div className="finder-header">
            <div>
              <span className="eyebrow">
                CAMPUS SPACE FINDER
              </span>

              <h1>Find your perfect space.</h1>

              <p>
                Discover available places to study, work,
                collaborate or relax.
              </p>
            </div>

            <div className="space-count">
              <strong>{filteredSpaces.length}</strong>
              <span>spaces found</span>
            </div>
          </div>

          <div className="filter-bar">
            <span>Availability:</span>

            {["All", "Available", "Moderate", "Busy"].map(
              (option) => (
                <button
                  key={option}
                  className={
                    filter === option
                      ? "filter active"
                      : "filter"
                  }
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              )
            )}
          </div>

          <div className="space-finder-layout">
            <div className="finder-list">
              {filteredSpaces.map((space) => (
                <div
                  className={
                    selectedSpace &&
                    selectedSpace.id === space.id
                      ? "finder-card selected"
                      : "finder-card"
                  }
                  key={space.id}
                  onClick={() => setSelectedSpace(space)}
                >
                  <div className="finder-card-icon">
                    {space.type === "Library"
                      ? "📚"
                      : space.type === "Classroom"
                      ? "🏫"
                      : space.type === "Study Hall"
                      ? "📖"
                      : "🪑"}
                  </div>

                  <div className="finder-card-info">
                    <div className="finder-card-top">
                      <h3>{space.name}</h3>

                      <span
                        className={
                          "status " +
                          space.status.toLowerCase()
                        }
                      >
                        ● {space.status}
                      </span>
                    </div>

                    <p>
                      {space.type} • {space.location}
                    </p>

                    <div className="space-meta">
                      <span>
                        👥 {space.available} seats
                      </span>

                      <span>•</span>

                      <span>
                        🔇 {space.environment}
                      </span>
                    </div>
                  </div>

                  <span className="arrow">→</span>
                </div>
              ))}
            </div>

            <div className="space-details">
              {selectedSpace ? (
                <>
                  <div className="details-icon">
                    📍
                  </div>

                  <span className="eyebrow">
                    SPACE DETAILS
                  </span>

                  <h2>{selectedSpace.name}</h2>

                  <p className="details-location">
                    {selectedSpace.location}
                  </p>

                  <div className="availability-box">
                    <div>
                      <span>Available seats</span>
                      <strong>
                        {selectedSpace.available}
                      </strong>
                    </div>

                    <div>
                      <span>Capacity</span>
                      <strong>
                        {selectedSpace.capacity}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span>Type</span>
                    <strong>
                      {selectedSpace.type}
                    </strong>
                  </div>

                  <div className="detail-row">
                    <span>Environment</span>
                    <strong>
                      {selectedSpace.environment}
                    </strong>
                  </div>

                  <button
                    className="primary-button full-button"
                    onClick={getDirections}
                  >
                    🧭 Get Directions
                  </button>
                </>
              ) : (
                <div className="empty-details">
                  <div>👆</div>

                  <h3>Select a space</h3>

                  <p>
                    Click a space to see its details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (page === "ai") {
    return (
      <div className="app">
        <Navbar setPage={setPage} />

        <main className="ai-page">
          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back to dashboard
          </button>

          <div className="ai-header">
            <div className="ai-orb">✨</div>

            <span className="eyebrow">
              CAMPUS AI
            </span>

            <h1>
              Your intelligent campus companion.
            </h1>

            <p>
              Ask CampusFix about spaces, events, food,
              navigation and everyday campus life.
            </p>
          </div>

          <div className="ai-chat">
            <div className="ai-message user-message">
              {aiQuery}
            </div>

            <div className="ai-message assistant-message">
              <div className="assistant-label">
                ✨ CampusFix AI
              </div>

              <h3>
                Here’s what I recommend:
              </h3>

              <div className="recommendation">
                <div className="recommendation-icon">
                  📚
                </div>

                <div>
                  <strong>
                    Central Library
                  </strong>

                  <p>
                    Quiet Zone • 18 seats available •
                    5 min from Block 34
                  </p>
                </div>

                <span className="status available">
                  ● Available
                </span>
              </div>

              <div className="recommendation">
                <div className="recommendation-icon">
                  🎯
                </div>

                <div>
                  <strong>
                    AI & Innovation Workshop
                  </strong>

                  <p>
                    Today • 5:00 PM • Block 34
                  </p>
                </div>

                <span className="event-tag">
                  RELEVANT
                </span>
              </div>
            </div>
          </div>

          <div className="ai-input-box">
            <input
              value={aiQuery}
              onChange={(e) =>
                setAiQuery(e.target.value)
              }
              placeholder="Ask CampusFix anything..."
            />

            <button onClick={handleAI}>
              Ask AI →
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar setPage={setPage} />

      <main>
        <section className="dashboard-hero">
          <div>
            <span className="welcome">
              YOUR CAMPUS, SIMPLIFIED
            </span>

            <h1>
              Good evening,
              <br />
              <span>Student 👋</span>
            </h1>

            <p>
              Everything you need for a better campus
              day, in one place.
            </p>
          </div>

          <div className="campus-status">
            <span className="live-dot">
              ● CAMPUS LIVE
            </span>

            <strong>28°C</strong>

            <span>
              Phagwara, Punjab
            </span>
          </div>
        </section>

        <section className="ai-search-section">
          <div className="ai-search-title">
            <div className="ai-mini-icon">
              ✨
            </div>

            <div>
              <strong>
                Ask CampusFix AI
              </strong>

              <span>
                Your campus assistant
              </span>
            </div>
          </div>

          <div className="ai-search">
            <input
              value={aiQuery}
              onChange={(e) =>
                setAiQuery(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAI();
                }
              }}
              placeholder="e.g. Find a quiet place near Block 34..."
            />

            <button onClick={handleAI}>
              Ask AI
            </button>
          </div>

          <div className="suggestion-row">
            <button
              onClick={() =>
                setAiQuery(
                  "Find me a quiet place to study"
                )
              }
            >
              📚 Find a study space
            </button>

            <button
              onClick={() =>
                setAiQuery(
                  "What coding events are happening?"
                )
              }
            >
              💻 Find coding events
            </button>

            <button
              onClick={() =>
                setAiQuery(
                  "Where can I eat nearby?"
                )
              }
            >
              🍔 Find food
            </button>
          </div>
        </section>

        <section className="section dashboard-section">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">
                CAMPUS SERVICES
              </span>

              <h2>
                Everything you need
              </h2>
            </div>
          </div>

          <div className="module-grid">
            <DashboardModule
              icon="🗺️"
              title="Campus Map"
              text="Find classrooms, labs, hostels, parking and more."
              onClick={() => setPage("spaces")}
              featured
            />

            <DashboardModule
              icon="📅"
              title="Campus Events"
              text="Discover workshops, hackathons, sports and clubs."
              onClick={() =>
                document
                  .getElementById("events")
                  ?.scrollIntoView()
              }
            />

            <DashboardModule
              icon="🍔"
              title="Food & Canteens"
              text="Menus, prices, ratings and crowd levels."
            />

            <DashboardModule
              icon="🎓"
              title="Academic Hub"
              text="Timetable, exams, assignments and attendance."
            />

            <DashboardModule
              icon="📢"
              title="Campus Notices"
              text="Stay updated with important university announcements."
            />

            <DashboardModule
              icon="🆘"
              title="Campus Help"
              text="Report maintenance issues and find emergency help."
            />

            <DashboardModule
              icon="🤝"
              title="Student Community"
              text="Find study partners and project teammates."
            />

            <DashboardModule
              icon="🚌"
              title="Campus Transport"
              text="Bus routes, timings and estimated arrivals."
            />
          </div>
        </section>

        <section className="section dashboard-section">
          <div className="dashboard-two-column">
            <div>
              <div className="section-heading-row">
                <div>
                  <span className="eyebrow">
                    RIGHT NOW
                  </span>

                  <h2>
                    Available spaces
                  </h2>
                </div>

                <button
                  className="view-all"
                  onClick={() =>
                    setPage("spaces")
                  }
                >
                  View all →
                </button>
              </div>

              <div className="mini-space-list">
                {spaces
                  .slice(0, 3)
                  .map((space) => (
                    <div
                      className="mini-space"
                      key={space.id}
                    >
                      <div className="mini-space-icon">
                        📚
                      </div>

                      <div>
                        <strong>
                          {space.name}
                        </strong>

                        <p>
                          {space.location} •{" "}
                          {space.available} seats
                        </p>
                      </div>

                      <span
                        className={
                          "status " +
                          space.status.toLowerCase()
                        }
                      >
                        ● {space.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div id="events">
              <div className="section-heading-row">
                <div>
                  <span className="eyebrow">
                    DON'T MISS OUT
                  </span>

                  <h2>
                    Upcoming events
                  </h2>
                </div>

                <button className="view-all">
                  All events →
                </button>
              </div>

              <div className="mini-event-list">
                {events
                  .slice(0, 2)
                  .map((event) => (
                    <div
                      className="mini-event"
                      key={event.id}
                    >
                      <div className="event-date">
                        <strong>
                          {event.date}
                        </strong>

                        <span>
                          {event.month}
                        </span>
                      </div>

                      <div>
                        <span className="event-tag">
                          {event.category}
                        </span>

                        <h3>
                          {event.title}
                        </h3>

                        <p>
                          📍 {event.location} •{" "}
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="notice-banner">
            <div className="notice-icon">
              📢
            </div>

            <div>
              <span className="eyebrow">
                CAMPUS NOTICE
              </span>

              <h3>
                Important academic updates
              </h3>

              <p>
                Check the latest examination schedule
                and academic announcements.
              </p>
            </div>

            <button>
              View notices →
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div className="logo">
          <span className="logo-icon">
            C
          </span>

          <span>
            CampusFix
          </span>
        </div>

        <p>
          Making campus life easier, one fix at a time.
        </p>
      </footer>
    </div>
  );
}

function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => setPage("home")}
      >
        <span className="logo-icon">
          C
        </span>

        <span>
          CampusFix
        </span>
      </div>

      <div className="nav-links">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setPage("home");
          }}
        >
          Home
        </a>

        <a
          href="#spaces"
          onClick={(e) => {
            e.preventDefault();
            setPage("spaces");
          }}
        >
          Spaces
        </a>

        <a
          href="#events"
          onClick={(e) => {
            e.preventDefault();
            setPage("home");

            setTimeout(() => {
              document
                .getElementById("events")
                ?.scrollIntoView();
            }, 100);
          }}
        >
          Events
        </a>
      </div>

      <button className="profile-button">
        Student
      </button>
    </nav>
  );
}

function DashboardModule({
  icon,
  title,
  text,
  onClick,
  featured = false,
}) {
  return (
    <button
      className={
        featured
          ? "dashboard-module featured"
          : "dashboard-module"
      }
      onClick={onClick}
    >
      <div className="module-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>

        <p>{text}</p>
      </div>

      <span className="module-arrow">
        →
      </span>
    </button>
  );
}

export default App;