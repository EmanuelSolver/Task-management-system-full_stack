import { apiDomain } from '../../utils/utils'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { ContextUser } from '../../context/userContext/userContext';
import Home1 from './Home1';

function GetData() {
      
  const { user } = useContext(ContextUser);

  const [task, setTask] = useState([])

  const getData = async () => {
      const res = await axios.get(`${apiDomain}/tasks`,{
        headers: { Authorization: `${user.token}` }, 
      })
      setTask(res.data)
  }

    useEffect(() =>{

    getData()
}, [])

    console.log(task)

  return (
    <div>
        {
            task.map((item) => (
                <Home1 key={item.Id} item ={{item}}/>
            )
            )
        }
    
    </div>
  )
}

export default GetData


