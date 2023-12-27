const EventEmitter = require('events');

let db = [];

const eventEmitter = new EventEmitter();

let methods = {
    select: async () => {
        return JSON.stringify(db, null, 4);
    },
    insert: async (string) => {
        let input = JSON.parse(string);
        const timestamp = Date.now().toString(36);
        let newId = `ID_${timestamp}`;

        let newItem = {
            id: newId,
            name: input.name.toString(),
            birthdate: input.birthdate.toString()
        }
        db.push(newItem);

        return new Promise((resolve, _) => {
            resolve(JSON.stringify(newItem, null, 4));
        });
    },
    update: async (string) => {
        let input = JSON.parse(string);
        let itemIndex = db.findIndex((item) => item.id === input.id);

        if (itemIndex !== -1) {
            db[itemIndex] = input;
            return new Promise((resolve, _) => {
                resolve(JSON.stringify(db[itemIndex], null, 4));
            });
        }
        
        return new Promise((_, reject) => {
            reject(JSON.stringify([], null, 4));
        });
    },
    delete: async (id) => {
        let itemIndex = db.findIndex((item) => item.id === id);
        if (itemIndex !== -1)
        {
            let itemForDelete = { ... db[itemIndex] };
            db.splice(itemIndex, 1);
            return new Promise((resolve, _) => {
                resolve(JSON.stringify(itemForDelete, null, 4));
            });
        }
        return new Promise((_, reject) => {
            reject(JSON.stringify([], null, 4));
        });
    }
};

eventEmitter.on("GET", methods.select);
eventEmitter.on("POST", methods.insert);
eventEmitter.on("PUT", methods.update);
eventEmitter.on("DELETE", methods.delete);

module.exports.eventEmitter = eventEmitter;
module.exports.methods = methods;