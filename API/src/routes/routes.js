import {getTasks, getProjects, createTask, updateTask, taskProgress, deleteTask, taskByProject, taskByPriority} from '../controllers/taskController.js';
import { login, register, loginRequired, updatePassword } from '../controllers/authControllers.js';
import { getUsers } from '../controllers/userController.js';

const routes = (app) => {
    //todo routes
    app.route('/tasks')
        .get(loginRequired, getTasks)
        .post(loginRequired, createTask)

    app.route('/tasks/:id')
        .delete(loginRequired, deleteTask)
        .put(loginRequired, updateTask)

    app.route('/progress/:id')
        .put(taskProgress)

    app.route('/taskPriority/:priority')
        .post(taskByPriority)

    app.route('/taskProject/:proj')
        .post(taskByProject)

    app.route('/users')
        .put(updatePassword)
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