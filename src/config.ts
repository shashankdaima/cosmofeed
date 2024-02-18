import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 5000,
  twilio_auth_token:process.env.TWILIO_AUTH_TOKEN, 
  twilio_sid_number:process.env.TWILIO_SID_NUMBER,
  twilio_phone_number:'+12137726943',
  slack_auth_token:process.env.SLACK_AUTH_TOKEN,
  google_client_id:process.env.GOOGLE_CLIENT_ID,
  google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_uri:process.env.GOOGLE_REDIRECT_URL,
  google_refresh_token:process.env.GOOGLE_REFRESH_TOKEN,
  mqtt_uri:"mqtt://localhost:1883",
  google_credentials_path:process.env.GOOGLE_SERVICE_PATH, 
  firebase_project_id:'cosmofeed-86cf0',
};