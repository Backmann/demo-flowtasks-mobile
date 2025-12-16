export const tags = ['Work', 'Personal', 'Health', 'Finance', 'Learning'];

export const tasks = [
  {
    id: 't1',
    title: 'Prepare proposal for ClientDesk',
    tag: 'Work',
    due: offset(0),
    priority: 'High',
    done: false,
  },
  {
    id: 't2',
    title: 'Review SmartHome landing copy',
    tag: 'Work',
    due: offset(1),
    priority: 'Medium',
    done: false,
  },
  {
    id: 't3',
    title: 'Gym session (legs)',
    tag: 'Health',
    due: offset(0),
    priority: 'Low',
    done: false,
  },
  {
    id: 't4',
    title: 'Pay invoice #204',
    tag: 'Finance',
    due: offset(2),
    priority: 'High',
    done: false,
  },
  {
    id: 't5',
    title: 'Study React Native navigation patterns',
    tag: 'Learning',
    due: offset(3),
    priority: 'Medium',
    done: false,
  },
  {
    id: 't6',
    title: 'Buy coffee beans',
    tag: 'Personal',
    due: offset(1),
    priority: 'Low',
    done: true,
  },
];

function offset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
}
