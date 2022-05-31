export const initialState = {
  jobs: [],
  tags: [],
  search: "",
  sort: "",
  location: "",
  remote: "",
  empType: "",
  currentPage: 1,
}
// ##################################################
// ##################################################
// SET INIT replaces entire state with value stored from LS, only JOBS should be stored for now in LS

export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_INIT":
      return action.value
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload
      };
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload
      };
    case 'SET_REMOTE':
      return {
        ...state,
        remote: action.payload
      }
    case 'SET_EMP_TYPE':
      return {
        ...state,
        empType: action.payload
      }
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'SET_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload]
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tags: state.tags.filter((tag, index) => index !== action.payload)

      };
    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload
      };
    case 'CLEAR_JOBS':
      return {
        ...state,
        jobs: []
      };
    default:
      return state;
  }
};