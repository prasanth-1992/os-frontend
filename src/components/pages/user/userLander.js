import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import axios from "axios";
import { API_URL } from '../../commen/utils';
import { CustomDataTable } from '../../commen/customDataTable';

const API_Sub = `${API_URL}/subModule`
const API_User = `${API_URL}/user`

function UserLander() {

  const [show, setShow] = useState(false)
  const [inputs, setInputs] = useState({
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    Department: '',
    Designation: ''
  })
  const [departValue, setDepartValue] = useState([])
  const [departData, setDepartData] = useState([])
  const [designValue, setDesignValue] = useState([])
  const [designData, setDesignData] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(() => {
    getDatas()
    getUser()
  }, [])

  const getDatas = async () => {
    const {data} = await axios.get(`${API_Sub}/list-all`)
    if (data) {
      setDepartData(data.Depart)
      setDesignData(data.Design)
    }
  }

  const getUser = async () => {
    const { data } = await axios.get(`${API_User}/list-all`)
    if (data) {
      setUserData(data)
    }
  }

  const departCreate = async (event) => {
    const { data } = await axios.post(`${API_Sub}/create`, {
      Department: event
    })

    if (data) {
      setInputs({
        ...inputs,
        Department: data._id
      })
      const newValue = { value: data._id, label: data.Department };
      setDepartValue(newValue);
      setDepartData([...departData, newValue]);
    }
  }

  const designCreate = async (event) => {
    const { data } = await axios.post(`${API_Sub}/create`, {
      Designation: event
    })
    if (data) {
      setInputs({
        ...inputs,
        Designation: data._id
      })
      const newValue = { value: data._id, label: data.Designation };
      setDesignValue(newValue);
      setDesignData([...departData, newValue]);
    }
  }

  const departChange = (event) => {
    setDepartValue(event)
    setInputs({ ...inputs, Department: event.value })
  }

  const designChange = (event) => {
    setDesignValue(event)
    setInputs({ ...inputs, Designation: event.value })
  }

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleEdit = (id) => {
    const data = userData.find(ss => ss._id === id)
    if (data) {
      setInputs({
        ...inputs,
        _id: data._id,
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
        Department: data.Department,
        Designation: data.Designation
      })
      setDepartValue({ value: data.Department, label: data.DepartmentName });
      setDesignValue({ value: data.Designation, label: data.DesignationName });
      setShow(true)
    }
  }

  const handleSave = async () => {
    if (inputs._id) {
      const { data } = await axios.put(`${API_User}/update/${inputs._id}`, {
        Name: inputs.Name,
        Email: inputs.Email,
        Phone: inputs.Phone,
        Department: inputs.Department,
        Designation: inputs.Designation,
      })
      if (data) {
        getUser()
        clearState()
        setShow(false)
      }
    } else {
      const { data } = await axios.post(`${API_User}/register`, {
        Name: inputs.Name,
        Email: inputs.Email,
        Phone: inputs.Phone,
        Department: inputs.Department,
        Designation: inputs.Designation,
      })
      if (data) {
        getUser()
        clearState()
        setShow(false)
      }
    }
  }

  const handleClose = () => {
    clearState()
    setShow(false)
  };

  const handleShow = () => setShow(true);

  const clearState = () => {
    setInputs({
      ...inputs,
      _id: '',
      Name: '',
      Email: '',
      Phone: '',
      Department: '',
      Designation: ''
    })
    setDepartValue([])
    setDesignValue([])
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
    },
    {
      name: "_id",
      label: "Action",
      options: {
        filter: false,
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: "0",
            background: "white",
            zIndex: 101,
            outline: "2px solid rgba(224,224,224,1)",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 0,
            zIndex: 1001
          },
        }),
        customBodyRender: (value) => (
          <div className='text-center'>
            <button className='btn' style={{padding:'1px'}}><i onClick={() => handleEdit(value)} 
              className='text-primary fa fa-pencil fa-lg'/></button>
          </div>
        ),
      }
    }
  ];

  const options = {
    filter: true,
    filterType: 'multiselect',
    responsive: 'stacked',
    print: false,
    fixedHeader: true,
    fixedSelectColumn: true,
    tableBodyMaxHeight: '400px',
    selectableRows: 'none',
    customToolbar: () => (
      <Tooltip arrow title='Add User'>
        <button onClick={handleShow} className='btn btn-outline-secondary ml-2'><i className='fa fa-plus'> Add</i></button>
      </Tooltip>
    ),
  };

  return (
    <div className="container">
      <div className='m-auto'>
        <div className='row m-2'>
          <CustomDataTable
            title={"Users List"}
            data={userData}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      <Modal show={show} size="lg">
        <Modal.Header>
          <Modal.Title>{inputs._id ? 'Edit ' : 'Create New '} HR User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-sm-6'>
              <div className="form-group">
                <label className="inputLabel">Name</label>
                <input name='Name' onChange={handleChange} value={inputs.Name} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-6'></div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label className="inputLabel">E-mail</label>
                <input name='Email' onChange={handleChange} value={inputs.Email} type="email" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label className="inputLabel">Phone</label>
                <input name='Phone' onChange={handleChange} value={inputs.Phone} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label className="inputLabel">Department</label>
                <CreatableSelect
                  value={departValue}
                  options={departData}
                  onChange={departChange}
                  onCreateOption={departCreate}
                />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label className="inputLabel">Designation</label>
                <CreatableSelect
                  value={designValue}
                  options={designData}
                  onChange={designChange}
                  onCreateOption={designCreate}
                />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>{inputs._id ? 'Update' : 'Save'}</Button>
          <Button variant="danger" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserLander;