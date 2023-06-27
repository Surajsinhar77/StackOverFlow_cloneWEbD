const user = require('../controller/controller.user');

module.exports = (app) => {
    app.post('/auth/register', user.register);
    app.post('/auth/login',user.login);
}
