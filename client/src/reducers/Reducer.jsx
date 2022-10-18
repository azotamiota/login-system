const initState = {
      isValidEmail: null,
      isValidPassword: null,
      email: '',
      password: '',
      regSubmitted: false,
      alertMessage: {},
      isLoggedIn: false
    };

const Reducer = (state=initState, action) => {
    switch(action.type){
        case 'EMAIL_VALID':
            return { ...state, isValidEmail: action.payload};
        case 'PASSWORD_VALID':
            return { ...state, isValidPassword: action.payload};
        case 'SET_EMAIL':
            return { ...state, email: action.payload};
        case 'SET_PASSWORD':
            return { ...state, password: action.payload};
        case 'SUBMIT_REG':
            return { ...state, regSubmitted: action.payload};
        case 'ALERT_MSG':
            return { ...state, alertMessage: action.payload};        
        case 'SET_ISLOGGEDIN':
            return { ...state, isLoggedin: true};
        default:
            return state
    };
};

export default Reducer;
