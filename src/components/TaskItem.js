import React, { useState } from 'react';

function TaskItem({ task, onUpdateTask, onToggleCompletion, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [error, setError] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  
  const formattedDate = new Date(task.createdAt).toLocaleString();
  
  // Convert the string value to a boolean by comparing with "1"
  const isCompleted = task.isCompleted === "1" || task.isCompleted === 1;

  const handleToggleCompletion = () => {
    onToggleCompletion(task.id, task.isCompleted);
  };

  const handleEditClick = () => {
    setEditedName(task.name);
    setIsEditing(true);
    setError('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
  };

  const handleSaveEdit = () => {
    // Validate task name
    if (editedName.trim() === '') {
      setError('Task name cannot be empty');
      return;
    }

    // Update the task
    onUpdateTask({
      id: task.id,
      name: editedName.trim()
    });

    setIsEditing(false);
    setError('');
  };

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(task.id);
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  if (isConfirmingDelete) {
    return (
      <li className="py-4 animate-fadeIn">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600 font-medium mb-3">Are you sure you want to delete this task?</p>
          <div className="flex space-x-2">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-md transition duration-300"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-3 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="py-4 animate-fadeIn">
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-md transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-3 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div 
              className={`flex-shrink-0 h-5 w-5 rounded-full border-2 cursor-pointer ${
                isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
              onClick={handleToggleCompletion}
              title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            ></div>
            
            <div className="ml-4">
              <p className={`text-lg font-medium ${
                isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}>
                {task.name}
              </p>
              <p className="text-sm text-gray-500">Created: {formattedDate}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="text-blue-600 hover:text-blue-800"
              title="Edit task"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button 
              className="text-red-600 hover:text-red-800"
              title="Delete task"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;