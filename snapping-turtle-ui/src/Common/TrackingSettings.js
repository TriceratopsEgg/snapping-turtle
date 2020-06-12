const { getUserId, getToken } = require('./AuthenticationUtils');
const trackingAPI = require('../apis/tracking-api');
const { daysOfWeek } = require('./GeneralUtils');

const getGeneralSettings = async () => {
    console.log(getUserId());
    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.find({
        userId: getUserId()
    });
    if (response.total === 0) {
        const addedSettings = await settings.create({
            userId: getUserId(),
            breakIntervals: {
                duringWorkHours: 60
            }
        });
        return addedSettings;
    } else if (response.total > 1) {
        // if there are more than one settings set (should never happen),  delete others and return the first only
        const settingsToReturn = response.data[0];
        response.data.slice(1).map(s => {
            settings.delete(s._id);
            return true;
        });
        return settingsToReturn;
    } else { 
        return response.data[0];
    }
};

const addTime = async (generalSettings, type, days, time) => {
    const mappedDays = daysOfWeek.map(dow => {
        if (days[dow.value]) {
            return { day: dow.value, startTime: time.start, endTime: time.end }
        } else {
            return null;
        }
    }).filter(d => d != null);
    if (mappedDays.length === 0) {
        return generalSettings;
    }

    const finalDays = type === 'work'
        ? { workHours: [...generalSettings.workHours, ...mappedDays] }
        : { sleepHours: [...generalSettings.sleepHours, ...mappedDays] }; 
    
    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.patch(generalSettings._id,
        finalDays);
    return response;
};

const getTimeDisplay = (daysAndTime) => {
    if (daysAndTime && daysAndTime.length === 0) {
        return null;
    }
    const groupedTime = daysOfWeek.map(dow => {
        const allTimes = daysAndTime.filter(d => d.day === dow.value);
        const mappedTime = allTimes.map(at => `${at.startTime} - ${at.endTime}`).join(', ');;
        return {
            day: dow.value,
            dayDescription: dow.day,
            time: mappedTime
        }
    }).filter(t => t.time && t.time.length > 0);
    return groupedTime;
};

const deleteTime = async (generalSettings, type, day) => {
    const applicableDays = type === 'work'
        ? generalSettings.workHours 
        : generalSettings.sleepHours;
    const adjustedDays = applicableDays.filter(d => d.day !== day);

    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.patch(generalSettings._id,
        type === 'work'
        ? { workHours : adjustedDays }
        : { sleepHours : adjustedDays });
    return response;
};

const updateBreaks = async(generalSettings) => {
    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.patch(generalSettings._id,
        {breakIntervals: {
            duringWorkHours: generalSettings.breakIntervals.duringWorkHours,
            afterWorkHours: generalSettings.breakIntervals.afterWorkHours
        }});
    return response;
}

const createNewProjectCategory = async (generalSettings, category) => {
    const currentCategories = generalSettings.projectCategories;
    if (currentCategories.filter(pc => pc.categoryDescription === category.description && pc.workRelated === category.workRelated).length > 0) {
        return generalSettings;
    }
    currentCategories.push({ categoryDescription: category.description, workRelated: category.workRelated });

    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.patch(generalSettings._id,
        {projectCategories: currentCategories});
    return response;
}

const deleteProjectCategory = async(generalSettings, categoryDescription, workRelated) => {
    const newProjectCategories = generalSettings.projectCategories
        .filter(pc => pc.categoryDescription !== categoryDescription || pc.workRelated !== workRelated);

    const settings = trackingAPI(getToken()).service('settings');
    const response = await settings.patch(generalSettings._id,
        {projectCategories: newProjectCategories});
    return response;
}

const getProjectSettings = async () => {
    const projects = trackingAPI(getToken()).service('projects');
    const response = await projects.find({
        userId: getUserId()
    });
    return response;
};

module.exports = {
    getGeneralSettings,
    addTime,
    getTimeDisplay,
    deleteTime,
    updateBreaks,
    createNewProjectCategory,
    deleteProjectCategory,
    getProjectSettings
};