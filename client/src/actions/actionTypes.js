const actions = [
// connection
"CONNECT",
"DISCONNECT",

  // Usuarios
  "UPDATE_NAME"
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
