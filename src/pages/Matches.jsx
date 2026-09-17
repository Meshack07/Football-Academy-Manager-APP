import { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Trophy,
  Pencil,
  Trash2,
  Eye,
  X,
  Target,
  Shield,
} from "lucide-react";

import { matches as initialMatches } from "../data/academyData";

function Matches() {
  const [matches, setMatches] = useState(initialMatches);

  const [searchTerm, setSearchTerm] = useState("");
  const [resultFilter, setResultFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingMatch, setEditingMatch] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [formData, setFormData] = useState({
    opponent: "",
    competition: "Friendly Match",
    date: "",
    time: "",
    venue: "",
    scoreFor: "",
    scoreAgainst: "",
  });

  // ---------------------------------------
  // RESULT CALCULATION
  // ---------------------------------------

  const getMatchResult = (match) => {
    const hasScore =
      match.scoreFor !== "" &&
      match.scoreFor !== null &&
      match.scoreFor !== undefined &&
      match.scoreAgainst !== "" &&
      match.scoreAgainst !== null &&
      match.scoreAgainst !== undefined;

    if (!hasScore) {
      return "Upcoming";
    }

    const scoreFor = Number(match.scoreFor);
    const scoreAgainst = Number(match.scoreAgainst);

    if (scoreFor > scoreAgainst) return "Win";
    if (scoreFor < scoreAgainst) return "Loss";

    return "Draw";
  };

  // ---------------------------------------
  // FILTER MATCHES
  // ---------------------------------------

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const result = getMatchResult(match);

      const matchesSearch =
        match.opponent
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        match.competition
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        match.venue
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesResult =
        resultFilter === "All" || result === resultFilter;

      return matchesSearch && matchesResult;
    });
  }, [matches, searchTerm, resultFilter]);

  // ---------------------------------------
  // SUMMARY
  // ---------------------------------------

  const completedMatches = matches.filter(
    (match) => getMatchResult(match) !== "Upcoming"
  );

  const wins = completedMatches.filter(
    (match) => getMatchResult(match) === "Win"
  ).length;

  const draws = completedMatches.filter(
    (match) => getMatchResult(match) === "Draw"
  ).length;

  const losses = completedMatches.filter(
    (match) => getMatchResult(match) === "Loss"
  ).length;

  const goalsFor = completedMatches.reduce(
    (total, match) => total + Number(match.scoreFor || 0),
    0
  );

  const goalsAgainst = completedMatches.reduce(
    (total, match) => total + Number(match.scoreAgainst || 0),
    0
  );

  // ---------------------------------------
  // FORM HANDLING
  // ---------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      opponent: "",
      competition: "Friendly Match",
      date: "",
      time: "",
      venue: "",
      scoreFor: "",
      scoreAgainst: "",
    });

    setEditingMatch(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (match) => {
    setEditingMatch(match);

    setFormData({
      opponent: match.opponent,
      competition: match.competition,
      date: match.date,
      time: match.time,
      venue: match.venue,
      scoreFor:
        match.scoreFor === "" || match.scoreFor === null
          ? ""
          : match.scoreFor,
      scoreAgainst:
        match.scoreAgainst === "" || match.scoreAgainst === null
          ? ""
          : match.scoreAgainst,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // ---------------------------------------
  // ADD / EDIT MATCH
  // ---------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.opponent ||
      !formData.date ||
      !formData.time ||
      !formData.venue
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newMatch = {
      id: editingMatch ? editingMatch.id : Date.now(),
      opponent: formData.opponent,
      competition: formData.competition,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      scoreFor:
        formData.scoreFor === "" ? "" : Number(formData.scoreFor),
      scoreAgainst:
        formData.scoreAgainst === ""
          ? ""
          : Number(formData.scoreAgainst),
    };

    if (editingMatch) {
      setMatches((prev) =>
        prev.map((match) =>
          match.id === editingMatch.id ? newMatch : match
        )
      );
    } else {
      setMatches((prev) => [...prev, newMatch]);
    }

    closeModal();
  };

  // ---------------------------------------
  // DELETE
  // ---------------------------------------

  const handleDelete = (id) => {
    const match = matches.find((item) => item.id === id);

    if (!match) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the match against ${match.opponent}?`
    );

    if (!confirmed) return;

    setMatches((prev) =>
      prev.filter((match) => match.id !== id)
    );
  };

  // ---------------------------------------
  // DETAILS
  // ---------------------------------------

  const openDetails = (match) => {
    setSelectedMatch(match);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedMatch(null);
    setShowDetails(false);
  };

  // ---------------------------------------
  // DATE FORMATTING
  // ---------------------------------------

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDay = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.getDate();
  };

  const getMonth = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "short",
    });
  };

  return (
    <main className="matches-page">

      {/* PAGE HEADER */}
      <div className="page-heading">
        <div>
          <h1>Matches</h1>
          <p>
            Manage academy fixtures, results and match records.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Match
        </button>
      </div>

      {/* SUMMARY */}
      <section className="matches-summary">

        <div className="matches-summary-card">
          <div className="matches-summary-icon">
            <Trophy size={20} />
          </div>

          <div>
            <span>Total Matches</span>
            <strong>{matches.length}</strong>
          </div>
        </div>

        <div className="matches-summary-card">
          <div className="matches-summary-icon">
            <Trophy size={20} />
          </div>

          <div>
            <span>Wins</span>
            <strong>{wins}</strong>
          </div>
        </div>

        <div className="matches-summary-card">
          <div className="matches-summary-icon">
            <span className="draw-symbol">D</span>
          </div>

          <div>
            <span>Draws</span>
            <strong>{draws}</strong>
          </div>
        </div>

        <div className="matches-summary-card">
          <div className="matches-summary-icon">
            <span className="loss-symbol">L</span>
          </div>

          <div>
            <span>Losses</span>
            <strong>{losses}</strong>
          </div>
        </div>

        <div className="matches-summary-card">
          <div className="matches-summary-icon">
            <Target size={20} />
          </div>

          <div>
            <span>Goals For</span>
            <strong>{goalsFor}</strong>
          </div>
        </div>

        <div className="matches-summary-card">
          <div className="matches-summary-icon">
            <Shield size={20} />
          </div>

          <div>
            <span>Goals Against</span>
            <strong>{goalsAgainst}</strong>
          </div>
        </div>

      </section>

      {/* MATCH SECTION */}
      <section className="matches-section">

        <div className="matches-section-header">

          <div>
            <h2>Match Records</h2>
            <p>
              View and manage all academy matches.
            </p>
          </div>

          <span>
            {filteredMatches.length} match
            {filteredMatches.length !== 1 ? "es" : ""}
          </span>

        </div>

        {/* TOOLBAR */}
        <div className="matches-toolbar">

          <div className="matches-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search opponent, competition or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
          >
            <option value="All">All Results</option>
            <option value="Win">Wins</option>
            <option value="Draw">Draws</option>
            <option value="Loss">Losses</option>
            <option value="Upcoming">Upcoming</option>
          </select>

        </div>

        {/* MATCH LIST */}
        <div className="matches-list">

          {filteredMatches.length === 0 ? (
            <div className="no-matches">
              <Trophy size={35} />

              <h3>No matches found</h3>

              <p>
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredMatches.map((match) => {
              const result = getMatchResult(match);

              const isUpcoming = result === "Upcoming";

              return (
                <div
                  className="match-card"
                  key={match.id}
                >

                  {/* DATE */}
                  <div className="match-card-date">
                    <strong>{getDay(match.date)}</strong>
                    <span>{getMonth(match.date)}</span>
                  </div>

                  {/* INFORMATION */}
                  <div className="match-card-info">

                    <div className="match-card-title">

                      <div>
                        <span className="match-competition">
                          {match.competition}
                        </span>

                        <h3>
                          Nsukka Legends FA vs{" "}
                          {match.opponent}
                        </h3>
                      </div>

                      <span
                        className={`match-status ${
                          isUpcoming
                            ? "upcoming"
                            : "completed"
                        }`}
                      >
                        {isUpcoming
                          ? "Upcoming"
                          : "Completed"}
                      </span>

                    </div>

                    <div className="match-meta">

                      <span>
                        <Calendar size={15} />
                        {formatDate(match.date)}
                      </span>

                      <span>
                        <Clock size={15} />
                        {match.time}
                      </span>

                      <span className="match-location">
                        <MapPin size={14} />
                        {match.venue}
                      </span>

                    </div>

                  </div>

                  {/* RESULT */}
                  <div className="match-result-container">

                    {isUpcoming ? (
                      <span className="upcoming-label">
                        Upcoming
                      </span>
                    ) : (
                      <>
                        <strong className="match-score">
                          {match.scoreFor} -{" "}
                          {match.scoreAgainst}
                        </strong>

                        <span
                          className={`result-badge ${result.toLowerCase()}`}
                        >
                          {result}
                        </span>
                      </>
                    )}

                  </div>

                  {/* ACTIONS */}
                  <button
                    className="match-action-button"
                    title="View details"
                    onClick={() => openDetails(match)}
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    className="match-action-button"
                    title="Edit match"
                    onClick={() => openEditModal(match)}
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="delete-match-button"
                    title="Delete match"
                    onClick={() => handleDelete(match.id)}
                  >
                    <Trash2 size={17} />
                  </button>

                </div>
              );
            })
          )}

        </div>

      </section>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="player-modal match-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>
                  {editingMatch
                    ? "Edit Match"
                    : "Add Match"}
                </h2>

                <p>
                  {editingMatch
                    ? "Update match information."
                    : "Add a new academy fixture."}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                <X size={19} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">
                  <label>Opponent *</label>

                  <input
                    type="text"
                    name="opponent"
                    value={formData.opponent}
                    onChange={handleChange}
                    placeholder="e.g. Rangers FC"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Competition *</label>

                  <select
                    name="competition"
                    value={formData.competition}
                    onChange={handleChange}
                  >
                    <option>Friendly Match</option>
                    <option>Nsukka League</option>
                    <option>Tournament</option>
                    <option>Academy League</option>
                    <option>Other</option>
                  </select>
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Date *</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time *</label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Venue *</label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. UNN Stadium"
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Goals For</label>

                  <input
                    type="number"
                    name="scoreFor"
                    value={formData.scoreFor}
                    onChange={handleChange}
                    min="0"
                    placeholder="Leave blank if upcoming"
                  />
                </div>

                <div className="form-group">
                  <label>Goals Against</label>

                  <input
                    type="number"
                    name="scoreAgainst"
                    value={formData.scoreAgainst}
                    onChange={handleChange}
                    min="0"
                    placeholder="Leave blank if upcoming"
                  />
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
                  {editingMatch
                    ? "Save Changes"
                    : "Add Match"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetails && selectedMatch && (
        <div
          className="modal-overlay"
          onClick={closeDetails}
        >
          <div
            className="player-modal match-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>Match Details</h2>

                <p>
                  Complete information about this fixture.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeDetails}
              >
                <X size={19} />
              </button>

            </div>

            <div className="match-details-content">

              <div className="match-details-score">

                <span>Nsukka Legends FA</span>

                <strong>
                  {getMatchResult(selectedMatch) ===
                  "Upcoming"
                    ? "VS"
                    : `${selectedMatch.scoreFor} - ${selectedMatch.scoreAgainst}`}
                </strong>

                <span>
                  {selectedMatch.opponent}
                </span>

              </div>

              <div className="match-details-result">

                <span
                  className={`result-badge ${
                    getMatchResult(selectedMatch) ===
                    "Upcoming"
                      ? ""
                      : getMatchResult(
                          selectedMatch
                        ).toLowerCase()
                  }`}
                >
                  {getMatchResult(selectedMatch)}
                </span>

              </div>

              <div className="match-details-grid">

                <div>
                  <span>Competition</span>
                  <strong>
                    {selectedMatch.competition}
                  </strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>
                    {formatDate(selectedMatch.date)}
                  </strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>
                    {selectedMatch.time}
                  </strong>
                </div>

                <div>
                  <span>Venue</span>
                  <strong>
                    {selectedMatch.venue}
                  </strong>
                </div>

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
                  openEditModal(selectedMatch);
                }}
              >
                <Pencil size={16} />
                Edit Match
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}

export default Matches;