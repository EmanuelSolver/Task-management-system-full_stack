// import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/taskController.js';
import { login, register, loginRequired } from '../controllers/authControllers.js';


const routes = (app) => {
    //todo routes
    // app.route('/todos')
    //     .get(loginRequired, getTodos)
    //     .post(loginRequired, createTodo);

    // app.route('/todo/:id')
    //     .put(updateTodo)
    //     .get(getTodo)
    //     .delete(deleteTodo);

    //auth routes
    app.route('/register')
        .post(register);

    app.route('/login')
        .post(login);
}


export default routes;