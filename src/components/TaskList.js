import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdateTask, onToggleCompletion, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdateTask={onUpdateTask}
            onToggleCompletion={onToggleCompletion}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;