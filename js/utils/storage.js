var Storage = (function() {

    // ============== USER STORAGE ==============

    function saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    function getUser() {
        var user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    function setLoggedIn(value) {
        localStorage.setItem('isLoggedIn', JSON.stringify(value));
    }

    function isLoggedIn() {
        var status = localStorage.getItem('isLoggedIn');
        return status ? JSON.parse(status) : false;
    }

    function clearSession() {
        localStorage.removeItem('isLoggedIn');
    }

    function removeUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
    }

    // ============== GENERIC METHODS ==============

    function set(key, value, useSession) {
        var storage = useSession ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(value));
    }

    function get(key, useSession) {
        var storage = useSession ? sessionStorage : localStorage;
        var value = storage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    function remove(key, useSession) {
        var storage = useSession ? sessionStorage : localStorage;
        storage.removeItem(key);
    }

    function clearAll(useSession) {
        var storage = useSession ? sessionStorage : localStorage;
        storage.clear();
    }

    return {
        // User methods
        saveUser: saveUser,
        getUser: getUser,
        setLoggedIn: setLoggedIn,
        isLoggedIn: isLoggedIn,
        clearSession: clearSession,
        removeUser: removeUser,


        // Generic methods
        set: set,
        get: get,
        remove: remove,
        clearAll: clearAll
    };
})();
