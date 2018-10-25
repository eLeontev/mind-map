module.exports = () => ({
    users: {},
    getUser(id) {
        return this.users[id] || {};
    },
    setUser(id, userData) {
        this.users[id] = userData;
    }
});
