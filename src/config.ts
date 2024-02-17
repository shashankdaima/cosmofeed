import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 5000,
  twilio_auth_token:process.env.TWILIO_AUTH_TOKEN, 
  twilio_sid_number:process.env.TWILIO_SID_NUMBER,
  twilio_phone_number:'+12137726943'
};