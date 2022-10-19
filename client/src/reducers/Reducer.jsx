const initState = {
      isValidEmail: null,
      isValidPassword: null,
      email: '',
      password: '',
      formSubmitted: false,
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
        case 'SUBMIT_FORM':
            return { ...state, formSubmitted: action.payload};
        case 'ALERT_MSG':
            return { ...state, alertMessage: action.payload};        
        case 'LOG_IN':
            return { ...state, isLoggedIn: true};
        default:
            return state
    };
};

export default Reducer;
