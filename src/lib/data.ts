export const teamStats = {
  wins: 12,
  losses: 4,
  draws: 2,
  pointsScored: 412,
  pointsConceded: 256,
};

export const players = [
  { id: 1, name: 'Leo "The Lion" Martinez', position: 'Quarterback', stats: { 'Passing Yards': 3250, 'Touchdowns': 35, 'Interceptions': 8 }, avatar: 'https://placehold.co/40x40.png' },
  { id: 2, name: 'Jax "The Jet" Harrison', position: 'Wide Receiver', stats: { 'Receptions': 85, 'Receiving Yards': 1230, 'Touchdowns': 14 }, avatar: 'https://placehold.co/40x40.png' },
  { id: 3, name: 'Mason "The Wall" Brooks', position: 'Center', stats: { 'Sacks Allowed': 2, 'Penalties': 3 }, avatar: 'https://placehold.co/40x40.png' },
  { id: 4, name: 'Ethan "The Rocket" Cole', position: 'Running Back', stats: { 'Rushing Yards': 980, 'Touchdowns': 11, 'Fumbles': 1 }, avatar: 'https://placehold.co/40x40.png' },
  { id: 5, name: 'Owen "The Shadow" Hayes', position: 'Cornerback', stats: { 'Tackles': 55, 'Interceptions': 5, 'Pass Deflections': 12 }, avatar: 'https://placehold.co/40x40.png' },
  { id: 6, name: 'Caleb "The Hammer" Reed', position: 'Linebacker', stats: { 'Tackles': 95, 'Sacks': 7, 'Forced Fumbles': 3 }, avatar: 'https://placehold.co/40x40.png' },
];

export const performanceData = [
  { game: 'Week 1', pointsFor: 28, pointsAgainst: 14 },
  { game: 'Week 2', pointsFor: 35, pointsAgainst: 21 },
  { game: 'Week 3', pointsFor: 21, pointsAgainst: 20 },
  { game: 'Week 4', pointsFor: 42, pointsAgainst: 10 },
  { game: 'Week 5', pointsFor: 17, pointsAgainst: 24 },
  { game: 'Week 6', pointsFor: 31, pointsAgainst: 28 },
  { game: 'Week 7', pointsFor: 24, pointsAgainst: 17 },
];

export const polls = [
  {
    id: 1,
    question: "What should be our primary offensive focus for the next game?",
    options: [
      { id: 'opt1', text: 'Aggressive passing plays' },
      { id: 'opt2', text: 'Dominant running game' },
      { id: 'opt3', text: 'Balanced attack' },
    ],
    votes: { 'opt1': 15, 'opt2': 8, 'opt3': 22 },
    isActive: true,
  },
  {
    id: 2,
    question: "New jersey design for next season?",
    options: [
      { id: 'optA', text: 'Classic Stripes' },
      { id: 'optB', text: 'Modern Geometric' },
      { id: 'optC', text: 'Minimalist Solid' },
    ],
    votes: { 'optA': 30, 'optB': 12, 'optC': 5 },
    isActive: false,
  },
];
