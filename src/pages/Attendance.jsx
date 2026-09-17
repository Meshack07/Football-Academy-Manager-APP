import { useState } from "react";
import {
  Check,
  X,
  Search,
  CalendarDays,
  Users,
} from "lucide-react";

import { players } from "../data/academyData";

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");

  const [attendance, setAttendance] = useState(() => {
    const initialAttendance = {};

    players.forEach((player) => {
      initialAttendance[player.id] = "Present";
    });

    return initialAttendance;
  });

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTeam =
      teamFilter === "All Teams" ||
      player.team === teamFilter;

    return matchesSearch && matchesTeam;
  });

  const handleAttendanceChange = (playerId, status) => {
    setAttendance((previous) => ({
      ...previous,
      [playerId]: status,
    }));
  };

  const presentCount = filteredPlayers.filter(
    (player) => attendance[player.id] === "Present"
  ).length;

  const absentCount = filteredPlayers.filter(
    (player) => attendance[player.id] === "Absent"
  ).length;

  const attendancePercentage =
    filteredPlayers.length > 0
      ? Math.round(
          (presentCount / filteredPlayers.length) * 100
        )
      : 0;

  return (
    <main className="attendance-page">
      {/* PAGE HEADING */}
      <section className="page-heading">
        <div>
          <h1>Attendance</h1>
          <p>
            Track player attendance for training sessions.
          </p>
        </div>
      </section>

      {/* ATTENDANCE SUMMARY */}
      <section className="attendance-stats">
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Total Players</span>
            <strong>{filteredPlayers.length}</strong>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon present-icon">
            <Check size={22} />
          </div>

          <div>
            <span>Present</span>
            <strong>{presentCount}</strong>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon absent-icon">
            <X size={22} />
          </div>

          <div>
            <span>Absent</span>
            <strong>{absentCount}</strong>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon percentage-icon">
            <CalendarDays size={22} />
          </div>

          <div>
            <span>Attendance Rate</span>
            <strong>{attendancePercentage}%</strong>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="attendance-toolbar">
        <div className="attendance-date">
          <CalendarDays size={18} />

          <input
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
          />
        </div>

        <div className="attendance-search">
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

      {/* ATTENDANCE TABLE */}
      <section className="attendance-table-card">
        <div className="table-header">
          <div>
            <h2>Training Attendance</h2>

            <p>
              Attendance for{" "}
              {new Date(selectedDate).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Position</th>
                <th>Team</th>
                <th>Attendance Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id}>
                    <td>
                      <div className="player-name-cell">
                        <div className="player-avatar">
                          {player.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>{player.name}</strong>
                      </div>
                    </td>

                    <td>{player.position}</td>

                    <td>
                      <span className="team-badge">
                        {player.team}
                      </span>
                    </td>

                    <td>
                      <div className="attendance-actions">
                        <button
                          className={
                            attendance[player.id] ===
                            "Present"
                              ? "attendance-button present active"
                              : "attendance-button present"
                          }
                          onClick={() =>
                            handleAttendanceChange(
                              player.id,
                              "Present"
                            )
                          }
                        >
                          <Check size={16} />
                          Present
                        </button>

                        <button
                          className={
                            attendance[player.id] ===
                            "Absent"
                              ? "attendance-button absent active"
                              : "attendance-button absent"
                          }
                          onClick={() =>
                            handleAttendanceChange(
                              player.id,
                              "Absent"
                            )
                          }
                        >
                          <X size={16} />
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="empty-state"
                  >
                    <div className="empty-players">
                      <div className="empty-icon">
                        <Search size={24} />
                      </div>

                      <h3>No players found</h3>

                      <p>
                        Try changing your search or team
                        filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Attendance;