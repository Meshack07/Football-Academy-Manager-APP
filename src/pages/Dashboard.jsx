import {
  Users,
  Dumbbell,
  Trophy,
  UserCheck,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

import StatCard from "../components/StatCard";

import {
  players,
  trainingSessions,
  matches,
} from "../data/academyData";

function Dashboard() {
  // ---------------------------------------
  // DASHBOARD STATISTICS
  // ---------------------------------------

  const totalPlayers = players.length;

  const totalTrainingSessions = trainingSessions.length;

  const completedMatches = matches.filter(
    (match) =>
      match.scoreFor !== "" &&
      match.scoreFor !== null &&
      match.scoreAgainst !== "" &&
      match.scoreAgainst !== null
  );

  const matchesPlayed = completedMatches.length;

  /*
    Attendance will eventually come from the
    Attendance module/database.

    For now, we keep the existing 87% value
    until attendance data is centralized.
  */
  const attendanceRate = 87;

  // ---------------------------------------
  // MATCH RESULT
  // ---------------------------------------

  const getMatchResult = (match) => {
    if (
      match.scoreFor === "" ||
      match.scoreFor === null ||
      match.scoreAgainst === "" ||
      match.scoreAgainst === null
    ) {
      return "Upcoming";
    }

    if (Number(match.scoreFor) > Number(match.scoreAgainst)) {
      return "Win";
    }

    if (Number(match.scoreFor) < Number(match.scoreAgainst)) {
      return "Loss";
    }

    return "Draw";
  };

  // ---------------------------------------
  // SORT RECENT MATCHES
  // ---------------------------------------

  const recentMatches = [...matches]
    .sort(
      (a, b) =>
        new Date(`${b.date}T00:00:00`) -
        new Date(`${a.date}T00:00:00`)
    )
    .slice(0, 4);

  // ---------------------------------------
  // UPCOMING TRAINING
  // ---------------------------------------

  const upcomingTraining = [...trainingSessions]
    .filter((session) => session.status === "Scheduled")
    .sort(
      (a, b) =>
        new Date(`${a.date}T00:00:00`) -
        new Date(`${b.date}T00:00:00`)
    )
    .slice(0, 3);

  // ---------------------------------------
  // DATE FORMATTERS
  // ---------------------------------------

  const getDay = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);
    return date.getDate();
  };

  const getMonth = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "short",
    });
  };

  return (
    <main className="dashboard">

      {/* =====================================
          STATISTICS
      ====================================== */}

      <section className="stats-grid">

        <StatCard
          title="Total Players"
          value={totalPlayers}
          icon={<Users size={24} />}
          description="Registered"
        />

        <StatCard
          title="Training Sessions"
          value={totalTrainingSessions}
          icon={<Dumbbell size={24} />}
          description="This season"
        />

        <StatCard
          title="Matches Played"
          value={matchesPlayed}
          icon={<Trophy size={24} />}
          description="This season"
        />

        <StatCard
          title="Attendance"
          value={`${attendanceRate}%`}
          icon={<UserCheck size={24} />}
          description="This month"
        />

      </section>


      {/* =====================================
          DASHBOARD CONTENT
      ====================================== */}

      <section className="dashboard-grid">

        {/* ===================================
            RECENT MATCHES
        ==================================== */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>Recent Matches</h2>

              <p>
                Latest academy results
              </p>
            </div>

            <a
              href="/matches"
              className="dashboard-view-link"
            >
              View all
              <ArrowRight size={15} />
            </a>

          </div>


          <div className="dashboard-matches">

            {recentMatches.length === 0 ? (
              <div className="dashboard-empty">
                <Trophy size={28} />

                <p>
                  No matches recorded yet.
                </p>
              </div>
            ) : (
              recentMatches.map((match) => {
                const result = getMatchResult(match);

                return (
                  <div
                    className="match-item"
                    key={match.id}
                  >

                    <div className="dashboard-match-date">
                      <strong>
                        {getDay(match.date)}
                      </strong>

                      <span>
                        {getMonth(match.date)}
                      </span>
                    </div>


                    <div className="dashboard-match-info">

                      <strong>
                        Nsukka Legends FA
                      </strong>

                      <span>
                        vs {match.opponent}
                      </span>

                      <small>
                        {match.competition}
                      </small>

                    </div>


                    <div className="dashboard-match-result">

                      {result === "Upcoming" ? (
                        <span className="dashboard-upcoming">
                          Upcoming
                        </span>
                      ) : (
                        <>
                          <strong>
                            {match.scoreFor} -{" "}
                            {match.scoreAgainst}
                          </strong>

                          <span
                            className={`dashboard-result ${result.toLowerCase()}`}
                          >
                            {result}
                          </span>
                        </>
                      )}

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>


        {/* ===================================
            UPCOMING TRAINING
        ==================================== */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>Upcoming Training</h2>

              <p>
                Next academy sessions
              </p>
            </div>

            <a
              href="/training"
              className="dashboard-view-link"
            >
              View all
              <ArrowRight size={15} />
            </a>

          </div>


          <div className="dashboard-training-list">

            {upcomingTraining.length === 0 ? (
              <div className="dashboard-empty">
                <Dumbbell size={28} />

                <p>
                  No upcoming training sessions.
                </p>
              </div>
            ) : (
              upcomingTraining.map((session) => (

                <div
                  className="training-item"
                  key={session.id}
                >

                  <div className="training-date">

                    <strong>
                      {getDay(session.date)}
                    </strong>

                    <span>
                      {getMonth(session.date)}
                    </span>

                  </div>


                  <div className="training-info">

                    <strong>
                      {session.title}
                    </strong>

                    <span>
                      <Calendar size={14} />
                      {session.type}
                    </span>

                    <span>
                      <Clock size={14} />
                      {session.time}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {session.location}
                    </span>

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;