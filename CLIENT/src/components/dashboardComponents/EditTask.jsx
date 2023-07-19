import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiDomain } from '../../utils/utils';
import moment from 'moment';
import { ContextUser } from '../../context/userContext/userContext';

const EditTask = ({ setOpen, item }) => {
  const [members, setMembers] = useState([]);
  const [project, setProject] = useState([]);
  const [priority, setPriority] = useState(item.Priority);
  const [start, setStart] = useState(moment(item.StartDate ).format("YYYY-MM-DD"));
  const [end, setEnd] = useState(moment(item.CloseDate ).format("YYYY-MM-DD"));
  const [memb, setMemb] = useState(item.UserName);
  const [projName, setProjName] = useState(item.ProjectName);
  const [task, setTask] = useState(item.TaskName);
  const { user } = useContext(ContextUser);

  useEffect(() => {
    getMembers();
    getProjects();
  }, []);

  const getMembers = async () => {
    const response = await axios.get(`${apiDomain}/users`, {
      headers: { Authorization: `${user.token}` },
    });
    setMembers(response.data);
  };

  const getProjects = async () => {
    const res = await axios.get(`${apiDomain}/projects`, {
      headers: { Authorization: `${user.token}` },
    });
    setProject(res.data);
  };

  const schema = yup.object().shape({
    project: yup.string().required('Select a project'),
    taskName: yup.string().required('Type task Name'),
    end: yup.string().required(),
    start: yup.string().required(),
    member: yup.string().required('Select a member'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      project: projName,
      taskName: task,
      start: start,
    },
  });

  const dataToServer = (data) => {
   
    axios.put(`${apiDomain}/tasks/${item.Id}`, data, {
        headers: { Authorization: `${user.token}` },
      })
      .then((response) => {
        response.data.message &&
          toast.success(response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      })
      .catch(({ response }) => {
        toast.error(response.data.error, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  const checkDate = (e) => {
    let end1 = e.target.value;
    let result = moment(end1).diff(start, 'days');

    result < 0 &&
      toast.error('Closing Date must be ahead of Start Date', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

    setEnd(end)
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          <FaTimes />
        </span>

        <form onSubmit={handleSubmit(dataToServer)}>
          <h2>Edit Task</h2>

          <div>
            <label htmlFor="name">Project</label> <br />
            <select name="" id="" {...register('project')} value={projName} onChange={(e) => setProjName(e.target.value)}>
              <option value="">- select -</option>
              {project &&
                project.map((proj, index) => (
                  <option key={index} value={index + 1}>
                    {proj.ProjectName}
                  </option>
                ))}
            </select>

            <span>{errors.project?.message}</span>
          </div>

          <div>
            <label htmlFor="task">Task Name</label>
            <input type="text" {...register('taskName')} onChange={(e) => setTask(e.target.value)} />
            <span>{errors.taskName?.message}</span>
          </div>

          <div>
            <label htmlFor="task">Priority</label>
            <select name="" id="" {...register('priority')} value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">- select -</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <span>{errors.priority?.message}</span>
          </div>

          <div>
            <label htmlFor="start">Start Date</label>
            <input id="start" type="date" {...register('start')}  onChange={(e) => setStart(e.target.value)} />
            <span>{errors.start?.message}</span>
          </div>

          <div>
            <label htmlFor="">Close Date</label>
            <br />
            <input type="date" {...register('end')}  onChange={checkDate} />
            <span>{errors.end?.message}</span>
          </div>

          <div>
            <label htmlFor="">Assign Member</label>
            <select name="" id="" {...register('member')} value={memb} onChange={(e) =>setMemb(e.target.value)}>
              <option value="">- select -</option>
              {members &&
                members.map((mem, index) => (
                  <option key={index} value={index + 1}>
                    {mem.UserName}
                  </option>
                ))}
            </select>
            <span>{errors.member?.message}</span>
          </div>

          <button type="submit">Save</button>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </form>
      </div>
    </div>
  );
};

EditTask.propTypes = {
  setOpen: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default EditTask;
