const { getUserId, getToken } = require('./AuthenticationUtils');
const userProfileAPI = require('../apis/user-profile-api');

const registerUser = async (firstname, surname, email, password, setErrorData) => {
    const users = userProfileAPI(null).service('users');
    await users.create({
        strategy: 'local',
        firstname,
        surname,
        email,
        password
    })
    .catch(error => {
        console.log(error);
        if (error.message === 'email: value already exists.') {
            setErrorData({
                errorMessage: 'Email already registered',
                loginError: false,
                registerError: true
            });
        } else {
            setErrorData({
                errorMessage: 'Could not register user',
                loginError: false,
                registerError: true
            });
        }
    });

    return 'success';
}

const getUser = async () => {
    const users = userProfileAPI(getToken()).service('users');
    const response = await users.get(getUserId());
    return response;
}

const patchUser = (patchedField) => {
    const users = userProfileAPI(getToken()).service('users');
    users.patch(getUserId(), 
            patchedField
        );
}

module.exports = {
    patchUser,
    registerUser,
    getUser
}