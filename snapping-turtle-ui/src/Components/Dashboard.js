import React from 'react';
const { getToken } = require('../Common/AuthenticationUtils');

export default () => {
    console.log(getToken());
    return <label>Dashboard</label>
};