export const setIsValidEmail = (isValid) => {

    return {
        type: "EMAIL_VALID",
        payload: isValid
    }

}

export const setIsValidPassword = (isValid) => {

    return {
        type: "PASSWORD_VALID",
        payload: isValid
    }

}

export const setEmail = (emailInput) => {

    return {
        type: "SET_EMAIL",
        payload: emailInput
    }

}

export const setPassword = (passwordInput) => {

    return {
        type: "SET_PASSWORD",
        payload: passwordInput
    }

}

export const submitForm = (beenSubmitted) => {

    return {
        type: "SUBMIT_FORM",
        payload: beenSubmitted
    }

}

export const setAlertMessage = (json) => {

    return {
        type: "ALERT_MSG",
        payload: json
    }

}

export const setIsLoggedIn = (isLoggedIn) => {

    return {
        type: "LOG_IN",
        payload: isLoggedIn
    }

}
