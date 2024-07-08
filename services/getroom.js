 async function getRoom (id,sender) {
        return id < sender ? `${id}-${sender}` : `${sender}-${id}`;
};
module.exports = getRoom;