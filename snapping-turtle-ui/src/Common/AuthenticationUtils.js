const userProfileAPI = require('../apis/user-profile-api');

const authenticateUser = async (username, password,setErrorData) => {
    
    try {
        const authService = userProfileAPI(null).service('authentication');
        const response = await authService.create({
            strategy: 'local',
            email: username,
            password
        });
        
        window.localStorage.setItem('accessToken', response.accessToken);
        window.localStorage.setItem('userInfo', JSON.stringify(response.user));
        return 'success';
    } catch { 
        console.log('error caught')       ;
        setErrorData({
            errorMessage: 'Could not log user in',
            loginError: true,
            registerError: false
        });
    };
};

const getToken = () => {
    return window.localStorage.getItem('accessToken');
};

const getUserId = () => { 
    return (JSON.parse(window.localStorage.getItem('userInfo')))._id;
}

module.exports = {
    authenticateUser,
    getToken,
    getUserId
};