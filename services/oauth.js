import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import Googlesign from './gsignup.js';
import {OAuth2Client} from 'google-auth-library';

async function getUserData(access_token) {
 try{
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    const load = await Googlesign(data)
    if(load.success){
        return load
    }
 }
 catch(error){
    console.log(error)
 }
}

/* GET home page. */
export default async function Oauth(req, res) {
    const code = req.query.code;
    console.log(code);
    try {
        const redirectURL = "https://api.korakota.com/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        const load = await getUserData(oAuth2Client.credentials.access_token);
        const query = new URLSearchParams(load).toString()
        res.redirect(303, `https://korakota.com/auth?${query}`);

      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }




};