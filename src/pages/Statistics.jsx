import {
  Trophy,
  Target,
  Shield,
  TrendingUp,
  Users,
  Medal,
  Activity,
} from "lucide-react";

import {
  matches,
  playerStats,
} from "../data/academyData";

function Statistics() {

  // ---------------------------------------
  // MATCH CALCULATIONS
  // ---------------------------------------

  const completedMatches = matches.filter(
    (match) =>
      match.scoreFor !== "" &&
      match.scoreFor !== null &&
      match.scoreAgainst !== "" &&
      match.scoreAgainst !== null
  );

  const played = completedMatches.length;

  const wins = completedMatches.filter(
    (match) =>
      Number(match.scoreFor) >
      Number(match.scoreAgainst)
  ).length;

  const draws = completedMatches.filter(
    (match) =>
      Number(match.scoreFor) ===
      Number(match.scoreAgainst)
  ).length;

  const losses = completedMatches.filter(
    (match) =>
      Number(match.scoreFor) <
      Number(match.scoreAgainst)
  ).length;

  const goalsFor = completedMatches.reduce(
    (total, match) =>
      total + Number(match.scoreFor || 0),
    0
  );

  const goalsAgainst = completedMatches.reduce(
    (total, match) =>
      total + Number(match.scoreAgainst || 0),
    0
  );

  const points = wins * 3 + draws;

  const winRate =
    played > 0
      ? Math.round((wins / played) * 100)
      : 0;

  const averageGoals =
    played > 0
      ? (goalsFor / played).toFixed(2)
      : "0.00";

  const averageGoalsAgainst =
    played > 0
      ? (goalsAgainst / played).toFixed(2)
      : "0.00";

  const goalDifference =
    goalsFor - goalsAgainst;

  // ---------------------------------------
  // PLAYER STATISTICS
  // ---------------------------------------

  const totalPlayerGoals = playerStats.reduce(
    (total, player) =>
      total + Number(player.goals || 0),
    0
  );

  const totalAssists = playerStats.reduce(
    (total, player) =>
      total + Number(player.assists || 0),
    0
  );

  const topScorer =
    playerStats.length > 0
      ? [...playerStats].sort(
          (a, b) => b.goals - a.goals
        )[0]
      : null;

  // ---------------------------------------
  // RECENT FORM
  // ---------------------------------------

  const recentForm = completedMatches
    .slice(-5)
    .reverse()
    .map((match) => {
      if (match.scoreFor > match.scoreAgainst) {
        return "W";
      }

      if (match.scoreFor < match.scoreAgainst) {
        return "L";
      }

      return "D";
    });

  return (
    <main className="statistics-page">

      {/* HEADER */}
      <div className="statistics-page-header">

        <div>
          <h1>Statistics</h1>

          <p>
            Track academy performance and player statistics.
          </p>
        </div>

        <select className="statistics-season-select">
          <option>2026 Season</option>
          <option>2025 Season</option>
          <option>2024 Season</option>
        </select>

      </div>

      {/* OVERVIEW CARDS */}
      <section className="statistics-grid">

        <div className="statistics-card">

          <div className="statistics-icon">
            <Trophy size={21} />
          </div>

          <div>
            <span>Matches Played</span>
            <strong>{played}</strong>
          </div>

        </div>

        <div className="statistics-card">

          <div className="statistics-icon">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>Wins</span>
            <strong>{wins}</strong>
          </div>

        </div>

        <div className="statistics-card">

          <div className="statistics-icon">
            <Target size={21} />
          </div>

          <div>
            <span>Goals Scored</span>
            <strong>{goalsFor}</strong>
          </div>

        </div>

        <div className="statistics-card">

          <div className="statistics-icon">
            <Activity size={21} />
          </div>

          <div>
            <span>Win Rate</span>
            <strong>{winRate}%</strong>
          </div>

        </div>

      </section>

      {/* MAIN STATISTICS */}
      <section className="statistics-content-grid">

        {/* SEASON PERFORMANCE */}
        <div className="statistics-panel">

          <div className="statistics-panel-header">

            <div>
              <h2>Season Performance</h2>

              <p>
                Academy results this season
              </p>
            </div>

          </div>

          <div className="performance-content">

            <div className="performance-circle-wrapper">

              <div
                className="performance-circle"
                style={{
                  background: `conic-gradient(
                    #4f46e5 0% ${winRate}%,
                    #eef2ff ${winRate}% 100%
                  )`,
                }}
              >
                <div className="performance-circle-inner">
                  <strong>{winRate}%</strong>
                  <span>Win Rate</span>
                </div>
              </div>

            </div>

            <div className="record-grid">

              <div className="record-item">
                <span>Played</span>
                <strong>{played}</strong>
              </div>

              <div className="record-item">
                <span>Wins</span>
                <strong>{wins}</strong>
              </div>

              <div className="record-item">
                <span>Draws</span>
                <strong>{draws}</strong>
              </div>

              <div className="record-item">
                <span>Losses</span>
                <strong>{losses}</strong>
              </div>

            </div>

          </div>

        </div>

        {/* GOAL STATISTICS */}
        <div className="statistics-panel">

          <div className="statistics-panel-header">

            <div>
              <h2>Goal Statistics</h2>

              <p>
                Scoring and defensive record
              </p>
            </div>

          </div>

          <div className="goal-stat">

            <div className="goal-stat-header">
              <span>Goals Scored</span>
              <strong>{goalsFor}</strong>
            </div>

            <div className="stat-progress">
              <div
                className="stat-progress-fill"
                style={{
                  width: `${
                    Math.max(
                      goalsFor,
                      goalsAgainst,
                      1
                    ) === 0
                      ? 0
                      : (goalsFor /
                          Math.max(
                            goalsFor,
                            goalsAgainst,
                            1
                          )) *
                        100
                  }%`,
                }}
              ></div>
            </div>

          </div>

          <div className="goal-stat">

            <div className="goal-stat-header">
              <span>Goals Conceded</span>
              <strong>{goalsAgainst}</strong>
            </div>

            <div className="stat-progress">
              <div
                className="stat-progress-fill conceded"
                style={{
                  width: `${
                    Math.max(
                      goalsFor,
                      goalsAgainst,
                      1
                    ) === 0
                      ? 0
                      : (goalsAgainst /
                          Math.max(
                            goalsFor,
                            goalsAgainst,
                            1
                          )) *
                        100
                  }%`,
                }}
              ></div>
            </div>

          </div>

          <div className="goal-stat">

            <div className="goal-stat-header">
              <span>Average Goals</span>
              <strong>{averageGoals}</strong>
            </div>

          </div>

          <div className="goal-stat">

            <div className="goal-stat-header">
              <span>Average Conceded</span>
              <strong>
                {averageGoalsAgainst}
              </strong>
            </div>

          </div>

          <div className="goal-difference">

            <span>Goal Difference</span>

            <strong>
              {goalDifference > 0 ? "+" : ""}
              {goalDifference}
            </strong>

          </div>

        </div>

      </section>

      {/* RECENT FORM */}
      <section className="statistics-panel recent-form-panel">

        <div className="statistics-panel-header">

          <div>
            <h2>Recent Form</h2>

            <p>
              Results from the latest completed matches
            </p>
          </div>

        </div>

        <div className="recent-form">

          {recentForm.length === 0 ? (
            <p className="no-form">
              No completed matches yet.
            </p>
          ) : (
            recentForm.map((result, index) => (
              <div
                key={index}
                className={`form-result ${result.toLowerCase()}`}
              >
                {result}
              </div>
            ))
          )}

        </div>

      </section>

      {/* PLAYER STATISTICS */}
      <section className="statistics-panel player-statistics-panel">

        <div className="statistics-panel-header">

          <div>
            <h2>Player Statistics</h2>

            <p>
              Individual player performance
            </p>
          </div>

          <span className="player-count">
            <Users size={15} />
            {playerStats.length} players
          </span>

        </div>

        <div className="statistics-table-wrapper">

          <table className="statistics-table">

            <thead>
              <tr>
                <th>PLAYER</th>
                <th>APPEARANCES</th>
                <th>GOALS</th>
                <th>ASSISTS</th>
                <th>GOAL CONTRIBUTIONS</th>
              </tr>
            </thead>

            <tbody>

              {playerStats.map((player) => (

                <tr key={player.id}>

                  <td>
                    <div className="statistics-player">

                      <div className="player-stat-avatar">
                        {player.player.charAt(0)}
                      </div>

                      <strong>
                        {player.player}
                      </strong>

                    </div>
                  </td>

                  <td>
                    <span className="stat-number">
                      {player.appearances}
                    </span>
                  </td>

                  <td>
                    <span className="goal-number">
                      {player.goals}
                    </span>
                  </td>

                  <td>
                    <span className="stat-number">
                      {player.assists}
                    </span>
                  </td>

                  <td>
                    <span className="contribution-number">
                      {Number(player.goals) +
                        Number(player.assists)}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* TOP PERFORMERS */}
      <section className="top-performers">

        <div className="top-performers-header">

          <h2>Top Performers</h2>

          <p>
            Leading players based on current statistics
          </p>

        </div>

        <div className="performers-grid">

          {topScorer && (
            <div className="performer-card">

              <div className="performer-icon">
                <Medal size={21} />
              </div>

              <div>
                <span>TOP SCORER</span>

                <strong>
                  {topScorer.player}
                </strong>

                <small>
                  {topScorer.goals} goals
                </small>
              </div>

            </div>
          )}

          <div className="performer-card">

            <div className="performer-icon">
              <Target size={21} />
            </div>

            <div>
              <span>TOTAL GOALS</span>

              <strong>
                {totalPlayerGoals}
              </strong>

              <small>
                Across player statistics
              </small>
            </div>

          </div>

          <div className="performer-card">

            <div className="performer-icon">
              <TrendingUp size={21} />
            </div>

            <div>
              <span>TOTAL ASSISTS</span>

              <strong>
                {totalAssists}
              </strong>

              <small>
                Across player statistics
              </small>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Statistics;