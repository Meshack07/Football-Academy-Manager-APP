import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  X,
  CalendarDays,
  Clock,
  MapPin,
  Dumbbell,
} from "lucide-react";

import { trainingSessions } from "../data/academyData";

const initialSessions = [
  {
    id: 1,
    title: "Senior Team Training",
    team: "Senior",
    type: "Technical",
    date: "2026-09-10",
    time: "7:00 AM",
    location: "UNN Franco Pitch",
    coach: "Head Coach",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Junior Team Training",
    team: "U15",
    type: "Tactical",
    date: "2026-09-11",
    time: "10:00 AM",
    location: "Nsukka Township Stadium",
    coach: "Assistant Coach",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Senior Team Training",
    team: "Senior",
    type: "Fitness",
    date: "2026-09-12",
    time: "7:00 AM",
    location: "UNN Franco Pitch",
    coach: "Head Coach",
    status: "Completed",
  },
  {
    id: 4,
    title: "U15 Development Session",
    team: "U15",
    type: "Technical",
    date: "2026-09-15",
    time: "9:00 AM",
    location: "Nsukka Township Stadium",
    coach: "Assistant Coach",
    status: "Scheduled",
  },
];

function Training() {
  const [sessions, setSessions] = useState(trainingSessions);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    team: "Senior",
    type: "Technical",
    date: "",
    time: "",
    location: "",
    coach: "",
    status: "Scheduled",
  });

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      session.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      session.coach
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesTeam =
      teamFilter === "All Teams" ||
      session.team === teamFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      session.status === statusFilter;

    return matchesSearch && matchesTeam && matchesStatus;
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      team: "Senior",
      type: "Technical",
      date: "",
      time: "",
      location: "",
      coach: "",
      status: "Scheduled",
    });
  };

  const handleAddSession = () => {
    setEditingSession(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (session) => {
    setEditingSession(session);

    setFormData({
      title: session.title,
      team: session.team,
      type: session.type,
      date: session.date,
      time: session.time,
      location: session.location,
      coach: session.coach,
      status: session.status,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.date ||
      !formData.time ||
      !formData.location.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (editingSession) {
      setSessions((previousSessions) =>
        previousSessions.map((session) =>
          session.id === editingSession.id
            ? {
                ...session,
                ...formData,
              }
            : session
        )
      );
    } else {
      const newSession = {
        id: Date.now(),
        ...formData,
      };

      setSessions((previousSessions) => [
        ...previousSessions,
        newSession,
      ]);
    }

    setShowModal(false);
    setEditingSession(null);
    resetForm();
  };

  const handleDelete = (sessionId) => {
    const session = sessions.find(
      (item) => item.id === sessionId
    );

    if (!session) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${session.title}"?`
    );

    if (!confirmed) return;

    setSessions((previousSessions) =>
      previousSessions.filter(
        (item) => item.id !== sessionId
      )
    );

    setOpenMenu(null);
  };

  const handleView = (session) => {
    setSelectedSession(session);
    setOpenMenu(null);
    setShowDetails(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSession(null);
    resetForm();
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedSession(null);
  };

  const scheduledCount = sessions.filter(
    (session) => session.status === "Scheduled"
  ).length;

  const completedCount = sessions.filter(
    (session) => session.status === "Completed"
  ).length;

  return (
    <main className="training-page">
      {/* PAGE HEADING */}
      <section className="page-heading">
        <div>
          <h1>Training</h1>
          <p>
            Plan and manage academy training sessions.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddSession}
        >
          <Plus size={18} />
          Add Training
        </button>
      </section>

      {/* TRAINING SUMMARY */}
      <section className="training-summary">
        <div className="training-summary-card">
          <div className="training-summary-icon">
            <Dumbbell size={22} />
          </div>

          <div>
            <span>Total Sessions</span>
            <strong>{sessions.length}</strong>
          </div>
        </div>

        <div className="training-summary-card">
          <div className="training-summary-icon scheduled">
            <CalendarDays size={22} />
          </div>

          <div>
            <span>Scheduled</span>
            <strong>{scheduledCount}</strong>
          </div>
        </div>

        <div className="training-summary-card">
          <div className="training-summary-icon completed">
            <Clock size={22} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="training-toolbar">
        <div className="training-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search training sessions..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <select
          value={teamFilter}
          onChange={(event) =>
            setTeamFilter(event.target.value)
          }
        >
          <option>All Teams</option>
          <option>Senior</option>
          <option>U15</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option>All Status</option>
          <option>Scheduled</option>
          <option>Completed</option>
        </select>
      </section>

      {/* TRAINING TABLE */}
      <section className="training-table-card">
        <div className="table-header">
          <div>
            <h2>Training Sessions</h2>
            <p>
              {filteredSessions.length} session
              {filteredSessions.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="training-table">
            <thead>
              <tr>
                <th>Session</th>
                <th>Team</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <tr key={session.id}>
                    <td>
                      <div className="training-name-cell">
                        <div className="training-session-icon">
                          <Dumbbell size={18} />
                        </div>

                        <div>
                          <strong>{session.title}</strong>
                          <span>{session.coach}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="team-badge">
                        {session.team}
                      </span>
                    </td>

                    <td>{session.type}</td>

                    <td>{formatDate(session.date)}</td>

                    <td>{session.time}</td>

                    <td>
                      <div className="training-location">
                        <MapPin size={15} />
                        {session.location}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`training-status ${
                          session.status === "Completed"
                            ? "completed"
                            : "scheduled"
                        }`}
                      >
                        {session.status}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <button
                        className="menu-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === session.id
                              ? null
                              : session.id
                          )
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenu === session.id && (
                        <div className="action-menu">
                          <button
                            onClick={() =>
                              handleView(session)
                            }
                          >
                            <Eye size={16} />
                            View Details
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(session)
                            }
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            className="delete-action"
                            onClick={() =>
                              handleDelete(session.id)
                            }
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="empty-state"
                  >
                    <div className="empty-players">
                      <div className="empty-icon">
                        <Search size={24} />
                      </div>

                      <h3>No training sessions found</h3>

                      <p>
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="training-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>
                  {editingSession
                    ? "Edit Training Session"
                    : "Add Training Session"}
                </h2>

                <p>
                  {editingSession
                    ? "Update training session information."
                    : "Enter the training session details below."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Session Title</label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Senior Team Training"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Team</label>

                  <select
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                  >
                    <option>Senior</option>
                    <option>U15</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Training Type</label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option>Technical</option>
                    <option>Tactical</option>
                    <option>Fitness</option>
                    <option>Recovery</option>
                    <option>Match Preparation</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>

                  <input
                    type="text"
                    name="time"
                    placeholder="e.g. 7:00 AM"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. UNN Franco Pitch"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Coach</label>

                  <input
                    type="text"
                    name="coach"
                    placeholder="Coach name"
                    value={formData.coach}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Scheduled</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingSession
                    ? "Update Session"
                    : "Add Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetails && selectedSession && (
        <div
          className="modal-overlay"
          onClick={closeDetails}
        >
          <div
            className="training-modal training-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>Training Details</h2>
                <p>Session information.</p>
              </div>

              <button
                className="modal-close"
                onClick={closeDetails}
              >
                <X size={20} />
              </button>
            </div>

            <div className="training-detail-header">
              <div className="training-detail-icon">
                <Dumbbell size={28} />
              </div>

              <div>
                <h2>{selectedSession.title}</h2>

                <span
                  className={`training-status ${
                    selectedSession.status ===
                    "Completed"
                      ? "completed"
                      : "scheduled"
                  }`}
                >
                  {selectedSession.status}
                </span>
              </div>
            </div>

            <div className="training-details-grid">
              <div>
                <span>Team</span>
                <strong>{selectedSession.team}</strong>
              </div>

              <div>
                <span>Training Type</span>
                <strong>{selectedSession.type}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {formatDate(selectedSession.date)}
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{selectedSession.time}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{selectedSession.location}</strong>
              </div>

              <div>
                <span>Coach</span>
                <strong>
                  {selectedSession.coach || "Not assigned"}
                </strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={closeDetails}
              >
                Close
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  closeDetails();
                  handleEdit(selectedSession);
                }}
              >
                <Pencil size={17} />
                Edit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function formatDate(date) {
  if (!date) return "";

  return new Date(
    `${date}T00:00:00`
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default Training;