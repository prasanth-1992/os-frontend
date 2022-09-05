import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_URL } from '../../commen/utils';

function UserProfile() {

  const [userData, setUserData] = useState({
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    Department: '',
    Designation: '',
    OldPassword: '',
    NewPassword: '',
    error: ''
  })

  useEffect(() => {
    const getdata = JSON.parse(localStorage.getItem('HR_Token'))
    if (getdata) {
      const tokenVal = JSON.parse(atob(getdata.Tokens.split('.')[1]));
      getUser(tokenVal.UserID)
    }

  }, [])

  const getUser = async (id) => {
    const { data } = await axios.get(`${API_URL}/user/get-one/${id}`)
    if (data) {
      setUserData({
        ...userData,
        _id: data._id,
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
        Department: data.DepartmentName,
        Designation: data.DesignationName
      })
    }
  }

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const changePassword = async () => {
    if (userData.OldPassword === '' || userData.NewPassword === '') {
      setUserData({ ...userData, error: 'Fields Required !!' })
    } else {
      setUserData({ ...userData, error: '' })
      const { data } = await axios.put(`${API_URL}/user/change-password/${userData._id}`, {
        OldPassword: userData.OldPassword,
        NewPassword: userData.NewPassword
      })
      if(data){
        setUserData({ ...userData, error: data.message })
      }
    }
  }

  return (
    <div className="container m-2 shadow rounded-lg">
      <div className='m-auto'>
        <h4 className='p-3 text-info text-center'>User Profile</h4>
        <div className='row m-3'>
          <div className='col-sm-6'>
            <div className="form-group">
              <label className="inputLabel">Name</label>
              <p>{userData.Name}</p>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className="form-group">
              <label className="inputLabel">E-mail</label>
              <p>{userData.Email}</p>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className="form-group">
              <label className="inputLabel">Phone</label>
              <p>{userData.Phone}</p>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className="form-group">
              <label className="inputLabel">Department</label>
              <p>{userData.Department}</p>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className="form-group">
              <label className="inputLabel">Designation</label>
              <p>{userData.Designation}</p>
            </div>
          </div>
        </div>

        <h5><small className='ml-2 text-secondary'>Manage Password</small></h5>
        <div className='row m-3'>
          <div className='col-sm-5'>
            <div className="form-group">
              <input name='OldPassword' onChange={handleChange} value={userData.OldPassword} placeholder='Enter Old Password' type="password" className="form-control textInput" />
            </div>
            <p className='text-danger'>{userData.error}</p>
          </div>
          <div className='col-sm-5'>
            <div className="form-group">
              <input name='NewPassword' onChange={handleChange} value={userData.NewPassword} placeholder='Enter New Password' type="password" className="form-control textInput" />
            </div>
          </div>
          <div className='col-sm-2'>
            <button onClick={changePassword} className='btn btn-outline-info'>Change</button>
          </div>
        </div>
        <div className='mt-4 p-3'></div>
      </div>
    </div>
  );
}

export default UserProfile;