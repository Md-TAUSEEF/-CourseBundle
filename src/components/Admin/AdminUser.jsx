import React from 'react';
import Sidebar from "./Sidebar";
import { RiDeleteBin7Fill } from 'react-icons/ri';

export default function AdminUser() {
  const users = [{
    id: "klduernidyershgoerttnboeut",
    name: "Tauseef",
    email: "mdaffan@gmail.com",
    role: "admin",
    subscription: {
      status: "active"
    }
  }];

  const updateHandler = (userId) => {
    console.log("userId", userId);
  };

  const deleteHandler = (userId) => {
    console.log("delete user", userId);
  };

  return (
    <div className='AdminCourse_cnt'>
      <h1>All Course Here</h1>
      <div className='AdminCourse_mid'>
        <table className='AdminCourse_table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Subscription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(item => (
              <Row key={item.id} item={item} updateHandler={updateHandler} deleteHandler={deleteHandler} />
            ))}
          </tbody>
        </table>
      </div>
      <Sidebar />
      <div className='course_lastline'>
        <p>All Available user in the database</p>
      </div>
    </div>
  );
}

function Row({ item, updateHandler, deleteHandler }) {
  return (
    <tr className='rowbody'>
      <td data-label="ID">#{item.id}</td>
      <td data-label="Name">{item.name}</td>
      <td data-label="Email">{item.email}</td>
      <td data-label="Role">{item.role}</td>
      <td data-label="Subscription">{item.subscription.status === 'active' ? 'Active' : 'Not Active'}</td>
      <td data-label="Action">
        <button onClick={() => updateHandler(item.id)}>Change Role</button>
        <button onClick={() => deleteHandler(item.id)}><RiDeleteBin7Fill /></button>
      </td>
    </tr>
  );
}
