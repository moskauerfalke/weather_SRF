import axios from 'axios';

export const getToken = async () => {
    console.log('process.env.REACT_APP_API_USERNAME ', process.env.REACT_APP_API_USERNAME);
    const response = await axios.post('https://api.srgssr.ch/oauth/v1/accesstoken?grant_type=client_credentials', {}, {
        auth: {
            username: process.env.REACT_APP_API_USERNAME || '',
            password: process.env.REACT_APP_API_PASSWORD || '',
        },
    });
    return response.data.access_token;
};

export const getWeatherData = async (accessToken: string) => {
    const response = await axios.get('https://api.srgssr.ch/srf-meteo/v2/forecastpoint/46.9471,7.4441', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
