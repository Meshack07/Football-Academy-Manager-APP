import { useState } from "react";
import {
  MoreVertical,
  Plus,
  Search,
  X,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { players as initialPlayers } from "../data/academyData";

function Players() {
  // =========================
  // PLAYERS DATA
  // =========================

  const [players, setPlayers] = useState(initialPlayers);

  // =========================
  // UI STATE
  // =========================

  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");

  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [editingPlayer, setEditingPlayer] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    position: "Forward",
    team: "Senior",
    age: "",
    status: "Active",
    jerseyNumber: "",
    phone: "",
  });

  // =========================
  // FILTER PLAYERS
  // =========================

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTeam =
      teamFilter === "All Teams" || player.team === teamFilter;

    return matchesSearch && matchesTeam;
  });

  // =========================
  // HANDLE FORM INPUT
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // CALCULATE AGE
  // =========================

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // =========================
  // OPEN ADD PLAYER MODAL
  // =========================

  const handleAddPlayer = () => {
    setEditingPlayer(null);

    setFormData({
      name: "",
      position: "Forward",
      team: "Senior",
      age: "",
      status: "Active",
      jerseyNumber: "",
      phone: "",
    });

    setShowModal(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (player) => {
    setEditingPlayer(player);

    setFormData({
      name: player.name,
      position: player.position,
      team: player.team,
      age: player.age,
      status: player.status,
      jerseyNumber: player.jerseyNumber,
      phone: player.phone,
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter the player's name.");
      return;
    }

    if (!formData.age) {
      alert("Please enter the player's age.");
      return;
    }

    if (editingPlayer) {
      // =========================
      // UPDATE PLAYER
      // =========================

      setPlayers((previousPlayers) =>
        previousPlayers.map((player) =>
          player.id === editingPlayer.id
            ? {
                ...player,
                ...formData,
                age: Number(formData.age),
                jerseyNumber: Number(formData.jerseyNumber),
              }
            : player
        )
      );
    } else {
      // =========================
      // ADD NEW PLAYER
      // =========================

      const newPlayer = {
        id: Date.now(),
        name: formData.name,
        position: formData.position,
        team: formData.team,
        age: Number(formData.age),
        status: formData.status,
        jerseyNumber: Number(formData.jerseyNumber),
        phone: formData.phone,
      };

      setPlayers((previousPlayers) => [
        ...previousPlayers,
        newPlayer,
      ]);
    }

    setShowModal(false);
    setEditingPlayer(null);

    setFormData({
      name: "",
      position: "Forward",
      team: "Senior",
      age: "",
      status: "Active",
      jerseyNumber: "",
      phone: "",
    });
  };

  // =========================
  // VIEW PLAYER PROFILE
  // =========================

  const handleViewProfile = (player) => {
    setSelectedPlayer(player);
    setOpenMenu(null);
    setShowProfile(true);
  };

  // =========================
  // DELETE PLAYER
  // =========================

  const handleDelete = (playerId) => {
    const player = players.find(
      (item) => item.id === playerId
    );

    if (!player) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${player.name}?`
    );

    if (!confirmed) return;

    setPlayers((previousPlayers) =>
      previousPlayers.filter(
        (player) => player.id !== playerId
      )
    );

    setOpenMenu(null);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = () => {
    setShowModal(false);
    setEditingPlayer(null);
  };

  const closeProfile = () => {
    setShowProfile(false);
    setSelectedPlayer(null);
  };

  // =========================
  // UI
  // =========================

  return (
    <main className="players-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="page-heading">
        <div>
          <h1>Players</h1>
          <p>
            Manage academy players and their information.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddPlayer}
        >
          <Plus size={18} />
          Add Player
        </button>
      </section>

      {/* =========================
          FILTERS
      ========================= */}

      <section className="players-toolbar">

        <div className="search-input">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search players..."
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

      </section>

      {/* =========================
          PLAYERS TABLE
      ========================= */}

      <section className="players-table-card">

        <div className="table-header">
          <div>
            <h2>Academy Players</h2>
            <p>
              {filteredPlayers.length} player
              {filteredPlayers.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table className="players-table">

            <thead>
              <tr>
                <th>Player</th>
                <th>Position</th>
                <th>Team</th>
                <th>Age</th>
                <th>Jersey</th>
                <th>Status</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (

                  <tr key={player.id}>

                    {/* PLAYER */}

                    <td>
                      <div className="player-name-cell">

                        <div className="player-avatar">
                          {player.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{player.name}</strong>
                        </div>

                      </div>
                    </td>

                    {/* POSITION */}

                    <td>{player.position}</td>

                    {/* TEAM */}

                    <td>
                      <span className="team-badge">
                        {player.team}
                      </span>
                    </td>

                    {/* AGE */}

                    <td>{player.age}</td>

                    {/* JERSEY */}

                    <td>
                      <span className="jersey-number">
                        #{player.jerseyNumber}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`status-badge ${
                          player.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {player.status}
                      </span>
                    </td>

                    {/* PHONE */}

                    <td>{player.phone}</td>

                    {/* ACTIONS */}

                    <td className="actions-cell">

                      <button
                        className="menu-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === player.id
                              ? null
                              : player.id
                          )
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenu === player.id && (
                        <div className="action-menu">

                          <button
                            onClick={() =>
                              handleViewProfile(player)
                            }
                          >
                            <Eye size={16} />
                            View Profile
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(player)
                            }
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            className="delete-action"
                            onClick={() =>
                              handleDelete(player.id)
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
                    <UsersEmptyState />
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* =========================
          ADD / EDIT PLAYER MODAL
      ========================= */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={closeModal}
        >

          <div
            className="player-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>
                  {editingPlayer
                    ? "Edit Player"
                    : "Add New Player"}
                </h2>

                <p>
                  {editingPlayer
                    ? "Update player information."
                    : "Enter the player's information below."}
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

              {/* NAME */}

              <div className="form-group">

                <label>Player Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter player name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* POSITION + TEAM */}

              <div className="form-row">

                <div className="form-group">

                  <label>Position</label>

                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  >
                    <option>Goalkeeper</option>
                    <option>Defender</option>
                    <option>Midfielder</option>
                    <option>Forward</option>
                  </select>

                </div>

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

              </div>

              {/* AGE + JERSEY */}

              <div className="form-row">

                <div className="form-group">

                  <label>Age</label>

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    min="5"
                    max="40"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Jersey Number</label>

                  <input
                    type="number"
                    name="jerseyNumber"
                    placeholder="e.g. 10"
                    min="1"
                    max="99"
                    value={formData.jerseyNumber}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* STATUS */}

              <div className="form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

              {/* PHONE */}

              <div className="form-group">

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              {/* FORM ACTIONS */}

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
                  {editingPlayer
                    ? "Update Player"
                    : "Add Player"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =========================
          PLAYER PROFILE MODAL
      ========================= */}

      {showProfile && selectedPlayer && (

        <div
          className="modal-overlay"
          onClick={closeProfile}
        >

          <div
            className="player-modal profile-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>Player Profile</h2>
                <p>
                  Detailed player information.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeProfile}
              >
                <X size={20} />
              </button>

            </div>

            {/* PROFILE HEADER */}

            <div className="profile-header">

              <div className="large-player-avatar">
                {selectedPlayer.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h2>{selectedPlayer.name}</h2>

                <p>
                  {selectedPlayer.position} •{" "}
                  {selectedPlayer.team}
                </p>

                <span
                  className={`status-badge ${
                    selectedPlayer.status === "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {selectedPlayer.status}
                </span>

              </div>

            </div>

            {/* PROFILE DETAILS */}

            <div className="profile-details">

              <div className="profile-detail">
                <span>Position</span>
                <strong>
                  {selectedPlayer.position}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Team</span>
                <strong>
                  {selectedPlayer.team}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Age</span>
                <strong>
                  {selectedPlayer.age} years
                </strong>
              </div>

              <div className="profile-detail">
                <span>Jersey Number</span>
                <strong>
                  #{selectedPlayer.jerseyNumber}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Status</span>
                <strong>
                  {selectedPlayer.status}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Phone</span>
                <strong>
                  {selectedPlayer.phone || "Not provided"}
                </strong>
              </div>

            </div>

            {/* PROFILE ACTIONS */}

            <div className="modal-actions">

              <button
                className="secondary-button"
                onClick={closeProfile}
              >
                Close
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  closeProfile();
                  handleEdit(selectedPlayer);
                }}
              >
                <Pencil size={17} />
                Edit Player
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

// =========================
// EMPTY STATE COMPONENT
// =========================

function UsersEmptyState() {
  return (
    <div className="empty-players">

      <div className="empty-icon">
        <Search size={24} />
      </div>

      <h3>No players found</h3>

      <p>
        Try changing your search or team filter.
      </p>

    </div>
  );
}

export default Players;