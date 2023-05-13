import { sidAccount, authToken } from '../environments/environment.js';
import logger from '../logger/logger.js';
import twilio from 'twilio';

const client = twilio(sidAccount, authToken);



const sendWhatsapp = async ( whatsappMsg ) => {
  await client.messages.create({
        body: whatsappMsg.body,
        from: process.env.WPP_NUMBER,
        to: `whatsapp:${whatsappMsg.to}`
    })
    .then(message => logger.info(message.sid))
};

    
export default sendWhatsapp;