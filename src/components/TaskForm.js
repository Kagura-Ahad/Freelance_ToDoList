import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate task name
    if (taskName.trim() === '') {
      setError('Task name cannot be empty');
      return;
    }
    
    // Create new task object
    const newTask = {
      name: taskName.trim(),
      isCompleted: 0
    };
    
    // Add the task
    onAddTask(newTask);
    
    // Reset form
    setTaskName('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-gray-700 font-medium mb-2">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task name"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;