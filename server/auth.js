const axios = require('axios');

const tokenUrl = 'https://11616ed2trial.authentication.us10.hana.ondemand.com/oauth/token';
const clientId = 'sb-11e195a0-8fe9-42db-af56-c9564b1652e8!b316610|dox-xsuaa-std-trial!b10844';
const clientSecret = '84f4f1ce-146c-427e-90bb-623d37ff5741$c8oxpWssX5OqjQLKsrjD6yuVQu9io9gz-hY8y6y6-h0=';

const getAuthToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
};
module.exports = { getAuthToken };