import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_URL, } from '../../commen/utils';
import { CustomDataTable } from '../../commen/customDataTable';

const API_User = `${API_URL}/user`

function UserHome() {

  const [userData, setUserData] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data } = await axios.get(`${API_User}/list-all`)
    if (data) {
      setUserData(data)
    }
  }

  const columns = [
    {
      name: "Name",
    },
    {
      name: "Email",
    },
    {
      name: "Phone",
    },
    {
      name: "DepartmentName",
      label: "Department"
    },
    {
      name: "DesignationName",
      label: "Designation"
    }
  ];

  return (
    <div className="container">
      <div className="row">
        <CustomDataTable
          data={userData}
          columns={columns}
        />

      </div>
    </div>
  );
}

export default UserHome;
