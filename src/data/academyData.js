// =========================
// PLAYERS
// =========================

export const players = [
  {
    id: 1,
    name: "Kosi Ugwuoke",
    position: "Midfielder",
    team: "Senior",
    age: 18,
    status: "Active",
    jerseyNumber: 8,
    phone: "+234 801 234 5678",
  },
  {
    id: 2,
    name: "Kenneth John",
    position: "Defender",
    team: "Senior",
    age: 19,
    status: "Active",
    jerseyNumber: 4,
    phone: "+234 802 345 6789",
  },
  {
    id: 3,
    name: "Iheaka Kingsley",
    position: "Midfielder",
    team: "Senior",
    age: 18,
    status: "Active",
    jerseyNumber: 6,
    phone: "+234 803 456 7890",
  },
  {
    id: 4,
    name: "Amoke Johnharmson",
    position: "Forward",
    team: "U15",
    age: 15,
    status: "Active",
    jerseyNumber: 10,
    phone: "+234 804 567 8901",
  },
  {
    id: 5,
    name: "Edu Mbaeze",
    position: "Forward",
    team: "Senior",
    age: 19,
    status: "Active",
    jerseyNumber: 9,
    phone: "+234 805 678 9012",
  },
  {
    id: 6,
    name: "Ali Chinedu",
    position: "Forward",
    team: "Senior",
    age: 20,
    status: "Active",
    jerseyNumber: 7,
    phone: "+234 806 789 0123",
  },
  {
    id: 7,
    name: "Obetta Collins",
    position: "Goalkeeper",
    team: "Senior",
    age: 21,
    status: "Active",
    jerseyNumber: 1,
    phone: "+234 807 890 1234",
  },
  {
    id: 8,
    name: "Wilson Ejimchi",
    position: "Defender",
    team: "U15",
    age: 15,
    status: "Active",
    jerseyNumber: 5,
    phone: "+234 808 901 2345",
  },
  {
    id: 9,
    name: "Wisdom Kingsley",
    position: "Midfielder",
    team: "U15",
    age: 14,
    status: "Active",
    jerseyNumber: 8,
    phone: "+234 809 012 3456",
  },
  {
    id: 10,
    name: "Chinedu Okafor",
    position: "Defender",
    team: "U15",
    age: 15,
    status: "Inactive",
    jerseyNumber: 3,
    phone: "+234 810 123 4567",
  },
];


// =========================
// TRAINING SESSIONS
// =========================

export const trainingSessions = [
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


// =========================
// MATCHES
// =========================

export const matches = [
  {
    id: 1,
    opponent: "MATO FC",
    competition: "Friendly Match",
    date: "2026-09-05",
    time: "4:00 PM",
    venue: "UNN Stadium",
    scoreFor: 4,
    scoreAgainst: 2,
  },
  {
    id: 2,
    opponent: "Okpuje United FC",
    competition: "Nsukka League",
    date: "2026-08-28",
    time: "3:00 PM",
    venue: "Okpuje Stadium",
    scoreFor: 2,
    scoreAgainst: 1,
  },
  {
    id: 3,
    opponent: "Standard FC",
    competition: "Friendly Match",
    date: "2026-08-20",
    time: "4:00 PM",
    venue: "UNN Franco Pitch",
    scoreFor: 1,
    scoreAgainst: 3,
  },
  {
    id: 4,
    opponent: "Opi United",
    competition: "Nsukka League",
    date: "2026-08-15",
    time: "3:00 PM",
    venue: "Nsukka Township Stadium",
    scoreFor: 2,
    scoreAgainst: 2,
  },
];


// =========================
// PLAYER STATISTICS
// =========================

export const playerStats = [
  {
    id: 1,
    player: "Edu Mbaeze",
    appearances: 8,
    goals: 7,
    assists: 3,
  },
  {
    id: 2,
    player: "Ali Chinedu",
    appearances: 9,
    goals: 6,
    assists: 4,
  },
  {
    id: 3,
    player: "Kosi Ugwuoke",
    appearances: 10,
    goals: 3,
    assists: 6,
  },
  {
    id: 4,
    player: "Iheaka Kingsley",
    appearances: 9,
    goals: 2,
    assists: 5,
  },
  {
    id: 5,
    player: "Kenneth John",
    appearances: 10,
    goals: 1,
    assists: 1,
  },
];


// =========================
// ACADEMY SETTINGS
// =========================

export const academySettings = {
  academyName: "Football Academy Manager",
  location: "Nsukka, Enugu State",
  phone: "+234 800 000 0000",
  email: "admin@academy.com",
  website: "www.academy.com",

  adminName: "Admin",
  adminEmail: "admin@academy.com",
  role: "Administrator",

  defaultTeam: "Senior",
  trainingLocation: "UNN Franco Pitch",

  trainingReminders: true,
  matchReminders: true,
  attendanceAlerts: true,
};