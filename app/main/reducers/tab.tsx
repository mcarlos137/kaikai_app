const initialState = {
    selectedTabScreen: 'SocialStackScreen', 
};

function rootReducer(state = initialState, action) {
    if (action.type === 'SET_SELECTED_TAB_SCREEN') {
        return Object.assign({}, state, {
            token: state.selectedTabScreen = action.payload,
        });
    }
    return state;
}

export default rootReducer;