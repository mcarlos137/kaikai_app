const initialState = {
    assets: {}
};

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_ASSET') {
        const assets = { ...state.assets }
        if (assets[action.payload.id] === undefined) {
            assets[action.payload.id] = {}
        }
        if (action.payload.imageAsset !== undefined) {
            assets[action.payload.id] = { ...assets[action.payload.id], imageAsset: action.payload.imageAsset }
        }
        if (action.payload.videoAsset !== undefined) {
            assets[action.payload.id] = { ...assets[action.payload.id], videoAsset: action.payload.videoAsset }
        }
        return Object.assign({}, state, {
            token: state.assets = assets,
        });
    }
    return state;
}

export default reducer;