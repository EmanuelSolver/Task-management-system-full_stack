import {getTasks, getProjects, createTask} from '../controllers/taskController.js';
import { login, register, loginRequired } from '../controllers/authControllers.js';
import { getUsers } from '../controllers/userController.js';

const routes = (app) => {
    //todo routes
    app.route('/tasks')
        .get(loginRequired, getTasks)
        .post(loginRequired, createTask)
        //.delete(loginRequired, deleteTask)

    app.route('/users')
    //     .put(updatePassword);
        .get(loginRequired, getUsers)

    app.route('/projects')
        .get(loginRequired, getProjects)

    //auth routes
    app.route('/signUp')
        .post(register);

    app.route('/login')
        .post(login);
}


export default routes;