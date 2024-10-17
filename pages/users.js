import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import UserForm from '../components/UserForm';
import { fetchUsers, createUser, deleteUser } from '../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  const handleUserSubmit = async (user) => {
    await createUser(user);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl p-4">Users</h1>
      <UserForm user={editingUser} onSubmit={handleUserSubmit} />
      <div className="flex flex-wrap">
        {users.map((user) => (
          <div key={user._id} className="card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
