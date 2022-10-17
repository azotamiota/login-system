const initState = {
      didJustRegister: false,
      isLoggedIn: false
    };

const Reducer = (state=initState, action) => {
    switch(action.type){
        case 'JUST_REGISTERED': 'LOGGED_IN'
            return { ...state, didJustRegister: true};
        case 'LOGGED_IN':
            return { ...state, isLoggedIn: !state.isLoggedIn};
        default:
            return state
    };
};

export default Reducer;
