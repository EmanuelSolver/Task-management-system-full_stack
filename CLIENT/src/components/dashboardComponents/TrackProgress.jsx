import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import '../../stylingFiles/EditTask.css';
import { apiDomain } from '../../utils/utils';

const ProgressTracker = ({ setOpen2, item }) => {
  let [progress, setProgress] = useState(item.Progress);
  const [isChecked, setIsChecked] = useState(false)


  const handleCheckboxChange = async (e) => {
    //update progress coming from the database 
    progress += 5;

    setIsChecked(e.target.checked);
    setProgress(progress)

    try {
        console.log('progress =' + progress)
      // update Progress
      await axios.put(`${apiDomain}/tasks/${item.Id}`, { progress: progress })
      console.log('Progress stored successfully!');
    } catch (error) {
      console.error('Failed to store progress:', error);
    }
  };

  useEffect(() => {

    handleCheckboxChange();
  }, [isChecked]);

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
