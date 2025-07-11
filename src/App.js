import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Header from './components/Header';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost/task-api/api/tasks.php');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost/task-api/api/tasks.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Update a task
  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch('http://localhost/task-api/api/tasks.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();
      
      // Update the tasks list
      setTasks(tasks.map(task => 
        task.id === result.id ? result : task
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId, currentStatus) => {
    const newStatus = currentStatus === "1" || currentStatus === 1 ? 0 : 1;
    updateTask({ id: taskId, isCompleted: newStatus });
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost/task-api/api/tasks.php?id=${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Remove the task from the state
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <TaskForm onAddTask={addTask} />
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {error}
            </div>
          ) : (
            <TaskList 
              tasks={tasks} 
              onUpdateTask={updateTask}
              onToggleCompletion={toggleTaskCompletion}
              onDeleteTask={deleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;