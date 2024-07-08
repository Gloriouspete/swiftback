/**
import executor from '../config/db.js';

export default function Updateread(chatid,sender) {
    const query = `UPDATE messages set status = ? where chatid = ? and (sender = ? OR receiver = ?)`;
    executor(query, ["seen",chatid,sender,sender])
        .then(results => {
           return true
        })
        .catch((error) => {
            console.error('Cant update:', error);
        });
} 

*/