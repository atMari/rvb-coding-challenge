import { handleAction } from '../../../utils/actionUtils';

const initialState = {
  loginAttempts: 0
};

const actionMappings = {/* TODO */};

const reducer = {/* TODO */};

const registrationReducer = (state = initialState, action) => (
  handleAction({ state, action, reducer, actionMappings })
);

export default registrationReducer;
