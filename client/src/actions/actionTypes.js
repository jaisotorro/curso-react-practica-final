const actions = [
"UPDATE_DATA",
  "UPDATE_NAME" // provis
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
