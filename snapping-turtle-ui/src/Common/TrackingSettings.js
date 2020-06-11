const { getUserId, getToken } = require('./AuthenticationUtils');
const trackingAPI = require('../apis/tracking-api');

const getGeneralSettings = async () => {
    console.log(getUserId());
    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.find({
        userId: getUserId()
    });
    console.log(response);
    return response;
}

const getProjectSettings = async () => {
    const projects = trackingAPI(getToken()).service('projects');
    const response = await projects.find({
        userId: getUserId()
    });
    return response;
}

module.exports = {
    getGeneralSettings,
    getProjectSettings
}