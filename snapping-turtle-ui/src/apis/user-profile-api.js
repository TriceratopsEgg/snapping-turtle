const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const axios = require('axios');

const baseURL = 'http://localhost:7030'; // process.env.USER_PROFILE_API_BASE_URL;
const restClient = rest(baseURL);

module.exports = (token) => {
    const client = feathers();
    const instance = axios.create({
        baseURL,
        timeout: 30000,
        headers: { Authorization: token }
    });

    client.configure(restClient.axios(instance));
    return client;
};