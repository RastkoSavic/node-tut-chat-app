// Users class
class Users {
    constructor() {
        this.users = [];
    }

    /**
     * 
     * @param {string} id - Represents user id
     * @param {string} name - Represents username
     * @param {string} room - Represents chat room
     * @description Adds new user to users array, returns user object
     */
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    /**
     * 
     * @param {string} id - Represents user id
     * @description Removes user from users array, returns user object
     */
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    /**
     * 
     * @param {string} id - Represents user id
     * @description Returns user object by id
     */
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    /**
     * 
     * @param {string} room - Represents chat room
     * @description Returns an array of usernames by chat room
     */
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users };
