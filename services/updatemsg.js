import executor from '../config/db.js';

export default function Updatemsg(message,sender, chatid,date) {
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    const query = `UPDATE chatlist set lastmessage = ?, sender = ? , date = STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ') where chatid = ?`;
    executor(query, [message,sender,date,chatid])
        .then(results => {
           return true
        })
        .catch((error) => {
            console.error('Cant update:', error);
        });
} 