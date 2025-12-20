var Storage = {
    // Save data to localStorage
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    // Get data from localStorage
    get: function(key) {
        var data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // Remove data from localStorage
    remove: function(key) {
        localStorage.removeItem(key);
    },

    // Clear all localStorage
    clear: function() {
        localStorage.clear();
    },

    // Check if key exists
    exists: function(key) {
        return localStorage.getItem(key) !== null;
    },

    // User specific methods
    saveUser: function(userData) {
        this.set('userData', userData);
    },

    getUser: function() {
        return this.get('userData');
    },

    removeUser: function() {
        this.remove('userData');
    },

    isLoggedIn: function() {
        return this.exists('userData');
    }
};
