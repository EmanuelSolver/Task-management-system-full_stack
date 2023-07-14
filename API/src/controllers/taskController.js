import sql from 'mssql';
import config from '../db/config.js'


export const createTask = async (req, res) => {
    const { project, taskName, priority, start, end, member} = req.body;

    try {
        let pool = await sql.connect(config.sql);
            await pool.request()
                .input('taskName', sql.VarChar, taskName)
                .input('priority', sql.VarChar, priority)
                .input('project', sql.Int, project)
                .input('start', sql.VarChar, start)
                .input('end', sql.VarChar, end)
                .input('member', sql.Int, member)

                .query('INSERT INTO Tasks(TaskName, Priority, StartDate, CloseDate, ProjectId, UserId) VALUES (@taskName, @priority, @start, @end,  @project, @member)');
            res.status(200).send({ message: 'Task added successfully' });   

    } catch (error) {

        res.status(500).json({ error: error.message });
    } finally {

        sql.close();
    }

};

export const getTasks = async (req, res) => {
    let pool = await sql.connect(config.sql); // Establish a connection to the database
  
    try {
      const result = await pool.request().query(
        "SELECT t.Id, t.TaskName, t.StartDate, t.CloseDate, p.ProjectName, p.ProjectManager FROM Tasks t JOIN Projects p ON t.ProjectId = p.Id"
      ); // Query the tasks and projects tables
  
      if (result.recordset.length === 0) {
        // Check if the result set is empty
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.status(200).json(result.recordset); // Return the result
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      sql.close(); // Close the SQL connection
    }
  };
  



export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect(config.sql); // Establish a connection to the database
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Tasks WHERE Id = @id');

    const user = result.recordset[0];
    if (user) {
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
    let pool = await sql.connect(config.sql);  //establish a connection to the database

    try {
        const result = await pool.request()        // make a request to the database
            .query("SELECT * FROM Projects");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

        sql.close(); // Close the SQL connection
    }
};





