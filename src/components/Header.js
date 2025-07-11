import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="text-blue-100">Organize your tasks efficiently</p>
      </div>
    </header>
  );
}

export default Header;