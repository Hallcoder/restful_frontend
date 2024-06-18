// src/components/Profile.js
import axios from 'axios';
import React,{useState,useEffect} from 'react';

const Profile = () => {
  const [user,setUser] = useState({
    firstName: 'loading...',
    lastName: 'loading...',
    email: 'loading...',
  });
  useEffect(()=>{
axios.get("http://localhost:3001/auth/currentUser",{
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
}).then(d =>{
    setUser(d.data.data);
})
  },[])
  return (
    <div className="w-98 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md min-h[40vh]">
        <h1 className="text-2xl font-semibold text-center mb-6">User Profile</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="font-semibold">First Name:</label>
            <span className="text-gray-700">{user.firstName}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">Last Name:</label>
            <span className="text-gray-700">{user.lastName}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">Email:</label>
            <span className="text-gray-700">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
