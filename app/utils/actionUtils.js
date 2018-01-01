export function handleAction({ actionMappings, action, reducer, state }) {
  const method = actionMappings[action.type];
  return method ? reducer[method].call(null, state, action) : state;
}

export default {
  handleAction
};
