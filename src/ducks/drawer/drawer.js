// Actions
const OPEN_DRAWER = 'drawer/OPEN_DRAWER';
const CLOSE_DRAWER = 'drawer/CLOSE_DRAWER';

// Reducer
const reducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, open: true };
    case CLOSE_DRAWER:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const openDrawer = () => ({
  type: OPEN_DRAWER,
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});

// Sagas
// No Sagas. No async function here
