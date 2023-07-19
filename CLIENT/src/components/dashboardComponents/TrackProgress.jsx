import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '../../stylingFiles/EditTask.css';
import { apiDomain } from '../../utils/utils';
import moment from 'moment';

const ProgressTracker = ({ setOpen2, item }) => {
  let [progress, setProgress] = useState(item.Progress);
  const [isChecked, setIsChecked] = useState(false)


  const handleCheckboxChange = async (e) => {
    //update progress coming from the database 
    let taskDuration = moment(item.CloseDate).diff(item.StartDate, 'days')
    //increment progress in regard to task duration
    let increment = (Math.round(100 / taskDuration)) / 2;
    progress += increment;

    setIsChecked(e.target.checked);
    setProgress(progress)

    try {
        console.log('progress =' + progress)
      // update Progress
      await axios.put(`${apiDomain}/progress/${item.Id}`, { progress: progress })
      console.log('Progress stored successfully!');
    } catch (error) {
      console.error('Failed to store progress:', error);
    }
  };

  useEffect(() => {

    handleCheckboxChange();
  }, []);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen2(false)}>
          <FaTimes />
        </span>
        <h2>Todays Activity</h2>
        {!isChecked && (
          <div className="done">
            <p>Mark as Done</p>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          </div>
        )}
      </div>
    </div>
  );
};

ProgressTracker.propTypes = {
  setOpen2: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default ProgressTracker;
