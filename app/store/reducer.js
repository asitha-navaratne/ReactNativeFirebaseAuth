export const intialState = {
  isSignedIn: false,
  isLoading: true,
  authToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING_DATA":
      return { ...state, isLoading: true };
    case "LOADING_COMPLETE":
      return { ...state, isLoading: false };
    case "SIGN_IN":
      return { ...state, isSignedIn: true, authToken: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, authToken: null };
    default:
      throw new Error(`No case for type "${action.type}" found in reducer`);
  }
};

export default reducer;
