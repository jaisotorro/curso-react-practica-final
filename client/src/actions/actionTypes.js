const actions = [
// connection
"CONNECT",
"DISCONNECT"
];


const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
