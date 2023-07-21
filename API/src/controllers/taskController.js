import sql from 'mssql';
import config from '../db/config.js'


export const createTask = async (req, res) => {
  const { project, taskName, priority, start, end, member } = req.body;
  const pool = await sql.connect(config.sql);

  try {
      await pool.request()
      .input('taskName', sql.VarChar, taskName)
      .input('priority', sql.VarChar, priority)
      .input('project', sql.Int, project)
      .input('start', sql.VarChar, start)
      .input('end', sql.VarChar, end)
      .input('member', sql.Int, member)
      .query('INSERT INTO Tasks(TaskName, Priority, StartDate, CloseDate, ProjectId, UserId, Progress) VALUES (@taskName, @priority, @start, @end,  @project, @member, 0)');

    res.status(200).send({ message: 'Task added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  finally{
    sql.close();
  }
};


export const getTasks = async (req, res) => {
  const { user } = req.params
  const pool = await sql.connect(config.sql); // Establish a connection to the database

    try {

      const result = await pool.request()
      .input('user', sql.VarChar, user)
      .query(
      `SELECT t.Id, t.TaskName, t.StartDate, t.CloseDate, t.Progress, t.Priority, u.UserName, p.ProjectName, pm.UserName AS ProjectManager
      FROM Tasks t
      JOIN Projects p ON t.ProjectId = p.Id
      JOIN users u ON t.UserId = u.Id
      JOIN users pm ON p.ManagerId = pm.Id
      WHERE u.UserName = @user OR pm.UserName = @user`
        ); // Query the tasks and projects tables
  
      if (result.recordset.length === 0) {
        // Check if the result set is empty
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.status(200).json(result.recordset); // Return the result
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
    // finally {
    //   sql.close(); // Close the SQL connection
    // }
  };
  

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const pool = await sql.connect(config.sql); // Establish a connection to the database
  try {
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Tasks WHERE Id = @id');

    const task = result.recordset[0];
    if (task) {
      await pool
        .request()
        .input('id', sql.VarChar, id)
        .query('DELETE FROM tasks WHERE Id = @id');

      res.status(200).json({ message: 'Task discarded successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await sql.close(); // Close the SQL connection
  }
};


export const getProjects = async (req, res) => {
    const pool = await sql.connect(config.sql);  //establish a connection to the database

    try {
        const result = await pool.request()        // make a request to the database
            .query("SELECT p.ProjectName, u.UserName FROM Projects p JOIN users u ON p.ManagerId = u.Id");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    }
    // finally {

    //     sql.close(); // Close the SQL connection
    // }
};


export const taskByPriority = async(req, res) =>{
  const { priority } = req.params

  const pool = await sql.connect(config.sql); // Establish a connection to the database
  
    try {
      const result = await pool.request()
      .input('value', sql.VarChar, priority)
      .query(
        "SELECT t.Id, t.TaskName, t.StartDate, t.CloseDate, p.ProjectName FROM Tasks t JOIN Projects p ON t.ProjectId = p.Id WHERE Priority = @value"
      ); // Query the tasks and projects tables
  
      if (result.recordset.length === 0) {
        // Check if the result set is empty
        res.status(404).json({ message: 'Project not found' });
      } else {
        res.status(200).json(result.recordset); // Return the result
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
    // finally {
    //   sql.close(); // Close the SQL connection
    // }
}


export const taskByProject = async(req, res) =>{
  const { proj } = req.params

  const pool = await sql.connect(config.sql); // Establish a connection to the database
  
    try {
      const result = await pool.request()
      .input('value', sql.Int, proj)
      .query(
        "SELECT t.Id, t.TaskName, t.StartDate, t.CloseDate, p.ProjectName FROM Tasks t JOIN Projects p ON t.ProjectId = p.Id WHERE ProjectId = @value"
      ); // Query the tasks and projects tables
  
      if (result.recordset.length === 0) {
        // Check if the result set is empty
        res.status(404).json({ message: 'Tasks Not found' });
      } else {
        res.status(200).json(result.recordset); // Return the result
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
    // finally {
    //   sql.close(); // Close the SQL connection
    // }
}


export const updateTask = async(req, res) =>{
  const { project, taskName, priority, start, end, member} = req.body;
  const { id } = req.params;

  const pool = await sql.connect(config.sql);
  try {
        await pool.request()
        .input('taskName', sql.VarChar, taskName)
        .input('priority', sql.VarChar, priority)
        .input('project', sql.Int, project)
        .input('start', sql.VarChar, start)
        .input('end', sql.VarChar, end)
        .input('member', sql.Int, member)
        .input('id', sql.Int, id)
        .query('UPDATE Tasks SET TaskName = @taskName, Priority = @priority, StartDate = @start, CloseDate = @end, ProjectId = @project, UserId = @member WHERE Id = @id');
        res.status(200).send({ message: 'Task updated successfully' });   

  } catch (error) {

      res.status(500).json({ error: error.message });
  } 
  // finally {

  //     sql.close();
  // }

}

export const taskProgress = async(req, res) =>{
  const { id} = req.params;
  const { progress } = req.body;
  
  const pool = await sql.connect(config.sql);
  try {
        await pool.request()
        .input('progress', sql.Int, progress)
        .input('id', sql.Int, id)
        .query('UPDATE Tasks SET Progress = @progress WHERE Id = @id');
        res.status(200).send({ message: 'Progress Updated successfully' });   

  } catch (error) {

      res.status(500).json({ error: error.message });
  } 
  // finally {

  //     sql.close();
  // }
}

export const createProject = async(req, res) =>{
  const { project } = req.body;
  const { id } = req.params;
  const createdOn = new Date().toLocaleDateString()

  const pool = await sql.connect(config.sql);

  try {
      await pool.request()
      .input('managerId', sql.Int, id)
      .input('date', sql.VarChar, createdOn)
      .input('project', sql.VarChar, project)
      .query('INSERT INTO Projects(ProjectName, ManagerId, CreatedDate) VALUES (@project, @managerId, @date)');

    res.status(200).send({ message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  finally{
    sql.close();
  }
}