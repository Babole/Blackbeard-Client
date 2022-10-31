const initState = {
    gameState: {},
    socket: {},
}

const gameReducer = (state = initState, action) => {
    switch (action.type) {
        case 'STORE_SOCKET':
            return { ...state, socket: action.payload };
        default:
            return state;
    }
}

export default gameReducer;
