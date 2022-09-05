import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import axios from "axios";
import { API_URL, API_View } from '../../commen/utils';
import { CustomDataTable } from '../../commen/customDataTable';
import { cities } from '../../commen/cities';

const API_Sub = `${API_URL}/subModule`
const API_Key = `${API_URL}/resource`

function ResourceLander() {

  const [show, setShow] = useState(false)
  const [showFile, setShowFile] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [fileName, setFileName] = useState('')

  const [inputs, setInputs] = useState({
    _id: '',
    Sector: "",
    HR_ID: "",
    HRName: "",
    Name: "",
    Email: "",
    Phone: "",
    Gender: "",
    MaritalStatus: "",
    Age: "",
    State: "",
    City: "",
    Qualifications: [],
    Skills: [],
    TotalExp: "",
    RelaventExp: "",
    NoticePeriod: "",
    CurrentCTC: "",
    ExpectCTC: "",
    SalaryMode: "",
    Department: "",
    Designation: "",
    Resume: "",
    ContactedDate: "",
    InterviewDate: "",
    ClientName: "",
    ClientLocation: "",
    InterviewStatus: "",
    Comments: []
  })

  const [comment, setComment] = useState({
    _id: '',
    CommentsArr: [],
    Comment: ''
  })

  const [departValue, setDepartValue] = useState([])
  const [departData, setDepartData] = useState([])
  const [designValue, setDesignValue] = useState([])
  const [designData, setDesignData] = useState([])
  const [skillValue, setSkillValue] = useState([])
  const [skillData, setSkillData] = useState([])
  const [eduValue, setEduValue] = useState([])
  const [eduData, setEduData] = useState([])
  const [cityData, setCityData] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(() => {
    getDatas()
    getResource()
  }, [])

  const getResource = async () => {
    const { data } = await axios.get(`${API_Key}/list-all`)
    if (data) {
      setUserData(data)
    }
  }

  const getDatas = async () => {
    const getdata = JSON.parse(localStorage.getItem('HR_Token'))
    if (getdata) {
      if (getdata.User === 'Employee') {
        const tokenVal = JSON.parse(atob(getdata.Tokens.split('.')[1]));
        setInputs({ ...inputs, HRName: tokenVal.Name,HR_ID:tokenVal.UserID })
      } else if (getdata.User === 'Admin') {
        setInputs({ ...inputs, HRName: 'Admin' })
      }
    }
    const { data } = await axios.get(`${API_Sub}/list-all`)
    if (data) {
      setDepartData(data.Depart)
      setDesignData(data.Design)
      setSkillData(data.Skill)
      setEduData(data.Education)
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

  const skillCreate = async (event) => {
    const { data } = await axios.post(`${API_Sub}/create`, {
      Skill: event
    })
    if (data) {
      const newValue = { value: data._id, label: data.Skill };
      setSkillValue(newValue);
      setSkillData([...skillData, newValue]);
    }
  }

  const eduCreate = async (event) => {
    const { data } = await axios.post(`${API_Sub}/create`, {
      Qualification: event
    })
    if (data) {
      const newValue = { value: data._id, label: data.Qualification };
      setEduValue(newValue);
      setEduData([...eduData, newValue]);
    }
  }

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    if (e.target.name === 'State') {
      const city = cities.find(item => item.State === e.target.value)
      if (city) {
        setCityData(city.City)
      }
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

  const skillChange = (event) => {
    setSkillValue(event)
  }

  const eduChange = (event) => {
    setEduValue(event)
  }

  const resumeFile = (e) => {
    if (e.target.files[0]) {
      setInputs({
        ...inputs,
        Resume: e.target.files[0],
      });
    }
  }

  const handleEdit = (id) => {
    const data = userData.find(ss => ss._id === id)
    if (data) {
      setInputs({
        ...inputs,
        _id: data._id,
        Sector: data.Sector,
        HRName: data.HRName,
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
        Gender: data.Gender,
        MaritalStatus: data.MaritalStatus,
        Age: data.Age,
        State: data.State,
        City: data.City,
        TotalExp: data.TotalExp,
        RelaventExp: data.RelaventExp,
        NoticePeriod: data.NoticePeriod,
        CurrentCTC: data.CurrentCTC,
        ExpectCTC: data.ExpectCTC,
        SalaryMode: data.SalaryMode,
        Department: data.Department,
        Designation: data.Designation,
        Resume: data.Resume,
        ContactedDate: data.ContactedDate,
        InterviewDate: data.InterviewDate,
        ClientName: data.ClientName,
        ClientLocation: data.ClientLocation,
        InterviewStatus: data.InterviewStatus,
      })
      setDepartValue({ value: data.Department, label: data.DepartmentName });
      setDesignValue({ value: data.Designation, label: data.DesignationName });
      setSkillValue(data.Skills);
      setEduValue(data.Qualifications);
      setShow(true)
    }
  }

  const handleDelete = async (id) => {
    const data = await axios.put(`${API_Key}/delete/${id}`)
    if (data) {
      setFileName('')
      setShowDelete(false)
      getResource()
    }
  }

  const handleSubmit = () => {
    if (inputs._id) {
      handleUpdate(inputs._id)
    } else {
      handleSave()
    }
  }

  const handleSave = async () => {
    let formData = new FormData()
    formData.append('Sector', inputs.Sector)
    formData.append('HRName', inputs.HRName)
    formData.append('HR_ID', inputs.HR_ID)
    formData.append('Name', inputs.Name)
    formData.append('Email', inputs.Email)
    formData.append('Phone', inputs.Phone)
    formData.append('Gender', inputs.Gender)
    formData.append('MaritalStatus', inputs.MaritalStatus)
    formData.append('Age', inputs.Age)
    formData.append('State', inputs.State)
    formData.append('City', inputs.City)
    formData.append('TotalExp', inputs.TotalExp)
    formData.append('RelaventExp', inputs.RelaventExp)
    formData.append('NoticePeriod', inputs.NoticePeriod)
    formData.append('Qualifications', JSON.stringify(eduValue))
    formData.append('Skills', JSON.stringify(skillValue))
    formData.append('CurrentCTC', inputs.CurrentCTC)
    formData.append('ExpectCTC', inputs.ExpectCTC)
    formData.append('SalaryMode', inputs.SalaryMode)
    formData.append('Department', inputs.Department)
    formData.append('Designation', inputs.Designation)
    formData.append('ContactedDate', inputs.ContactedDate)
    formData.append('InterviewDate', inputs.InterviewDate)
    formData.append('InterviewStatus', inputs.InterviewStatus)
    formData.append('ClientName', inputs.ClientName)
    formData.append('ClientLocation', inputs.ClientLocation)
    formData.append('Resume', inputs.Resume)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const data = await axios.post(`${API_Key}/create`, formData, config)
    if (data) {
      getResource()
      clearState()
      setShow(false)
    }
  }

  const handleUpdate = async (id) => {
    let formData = new FormData()
    formData.append('Sector', inputs.Sector)
    formData.append('HRName', inputs.HRName)
    formData.append('Name', inputs.Name)
    formData.append('Email', inputs.Email)
    formData.append('Phone', inputs.Phone)
    formData.append('Gender', inputs.Gender)
    formData.append('MaritalStatus', inputs.MaritalStatus)
    formData.append('Age', inputs.Age)
    formData.append('State', inputs.State)
    formData.append('City', inputs.City)
    formData.append('TotalExp', inputs.TotalExp)
    formData.append('RelaventExp', inputs.RelaventExp)
    formData.append('NoticePeriod', inputs.NoticePeriod)
    formData.append('Qualifications', JSON.stringify(eduValue))
    formData.append('Skills', JSON.stringify(skillValue))
    formData.append('CurrentCTC', inputs.CurrentCTC)
    formData.append('ExpectCTC', inputs.ExpectCTC)
    formData.append('SalaryMode', inputs.SalaryMode)
    formData.append('Department', inputs.Department)
    formData.append('Designation', inputs.Designation)
    formData.append('ContactedDate', inputs.ContactedDate)
    formData.append('InterviewDate', inputs.InterviewDate)
    formData.append('InterviewStatus', inputs.InterviewStatus)
    formData.append('ClientName', inputs.ClientName)
    formData.append('ClientLocation', inputs.ClientLocation)
    formData.append('Resume', inputs.Resume)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const { data } = await axios.put(`${API_Key}/update/${id}`, formData, config)
    if (data) {
      getResource()
      clearState()
      setShow(false)
    }
  }

  const updateStatus = async (tableData, stat) => {
    const id = tableData.rowData.pop()
    const { data } = await axios.put(`${API_Key}/update/${id}`, { InterviewStatus: stat })
    if (data) {
      getResource()
    }
  }

  const handleComment = (id) => {
    const data = userData.find(ss => ss._id === id)
    setComment({
      ...comment,
      _id: id,
      CommentsArr: data.Comments,
      Comment: ''
    })
    setShowComment(true)
  }

  const submitComment = async () => {
    const { data } = await axios.put(`${API_Key}/comment/${comment._id}`, { Remark: comment.Comment })
    if (data) {
      setComment({
        ...comment,
        CommentsArr: data.Comments,
        Comment: ''
      })
    }
  }

  const closeComment = () => {
    setComment({
      ...comment,
      _id: '',
      CommentsArr: [],
      Comment: ''
    })
    setShowComment(false)
    getResource()
  }

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => setShow(true);

  const clearState = () => {
    setInputs({
      _id: '',
      Sector: "",
      HRName: "",
      Name: "",
      Email: "",
      Phone: "",
      Gender: "",
      MaritalStatus: "",
      Age: "",
      State: "",
      City: "",
      Qualifications: [],
      Skills: [],
      TotalExp: "",
      RelaventExp: "",
      NoticePeriod: "",
      CurrentCTC: "",
      ExpectCTC: "",
      SalaryMode: "",
      Department: "",
      Designation: "",
      Resume: "",
      ContactedDate: "",
      InterviewDate: "",
      ClientName: "",
      ClientLocation: "",
      InterviewStatus: "",
      Comments: []
    })
    setDepartValue([])
    setDesignValue([])
    setSkillValue([])
    setEduValue([])
  }

  const openFile = (val) => {
    setFileName(val)
    setShowFile(true)
  }

  const openDelete = (val) => {
    setFileName(val)
    setShowDelete(true)
  }

  const closeDelete = () => {
    setFileName('')
    setShowDelete(false)
  }

  const columns = [
    {
      name: "Sector",
    },
    {
      name: "HRName",
      label: "HR Name",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            left: 0,
            minWidth: 120,
            background: "white",
            zIndex: 101,
            outline: "2px solid rgba(224,224,224,1)",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            left: 0,
            minWidth: 120,
            zIndex: 1001
          },
        }),
      }
    },
    {
      name: "Name",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            left: 120,
            background: "white",
            zIndex: 101,
            outline: "2px solid rgba(224,224,224,1)",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            left: 120,
            zIndex: 1001
          },
        }),
      }
    },
    {
      name: "Email",
    },
    {
      name: "Phone",
    },
    {
      name: "Gender",
    },
    {
      name: "MaritalStatus",
      label: "Marital Status",
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
      name: "Age",
    },
    {
      name: "State",
    },
    {
      name: "City",
    },
    {
      name: "TotalExp",
      label: "Total Exp.",
    },
    {
      name: "RelaventExp",
      label: "Relavent Exp.",
    },
    {
      name: "NoticePeriod",
      label: "Notice Period",
    },
    {
      name: "CurrentCTC",
      label: "Current CTC",
    },
    {
      name: "ExpectCTC",
      label: "Expect CTC",
    },
    {
      name: "SalaryMode",
      label: "Salary Mode",
    },
    {
      name: "Resume",
      options: {
        customBodyRender: (val) => {
          if (val !== "") {
            return <button className='btn btn-outline-primary' onClick={() => openFile(val)} style={{ padding: '1px' }}>
              <i className='text-primary fa fa-view fa-lg' />View</button>
          } else {
            return <label>No File</label>
          }
        }
      }
    },
    {
      name: "ContactedDate",
      label: "Contacted",
    },
    {
      name: "InterviewDate",
      label: "Interview On",
    },
    {
      name: "ClientName",
      label: "Client Name",
    },
    {
      name: "ClientLocation",
      label: "Client Location",
    },
    {
      name: "InterviewStatus",
      label: "Status",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 130,
            background: "white",
            zIndex: 101,
            outline: "2px solid rgba(224,224,224,1)",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 130,
            zIndex: 1001
          },
        }),
        customBodyRender: (value, tableMeta) => (
          <select value={value} onChange={(e) => updateStatus(tableMeta, e.target.value)}
            className="form-control-sm">
            <option value='Selected'>Selected</option>
            <option value='Not Selected'>Not Selected</option>
            <option value='Rejected'>Rejected</option>
            <option value='Not Shown'>Not Shown</option>
            <option value='Int. Scheduled'>Int. Scheduled</option>
            <option value='Int. Attended'>Int. Attended</option>
            <option value='Cancelled'>Cancelled</option>
            <option value='Hold'>Hold</option>
          </select>
        ),
      }
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
            right: 0,
            background: "white",
            zIndex: 101,
            minWidth: '130px',
            outline: "2px solid rgba(224,224,224,1)",
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 0,
            minWidth: '130px',
            zIndex: 1001
          },
        }),
        customBodyRender: (value) => (
          <div className='text-center'>
            <button className='btn' style={{ padding: '1px' }}><i onClick={() => handleEdit(value)}
              className='text-primary fa fa-pencil fa-lg' /></button>
            <button className='btn ml-2' style={{ padding: '1px' }}><i onClick={() => handleComment(value)}
              className='text-info fa fa-commenting fa-lg' /></button>
            <button className='btn ml-2' style={{ padding: '1px' }}><i onClick={() => openDelete(value)}
              className='text-danger fa fa-trash fa-lg' /></button>
          </div>
        ),
      }
    }
  ];

  const options = {
    filter: true,
    filterType: 'multiselect',
    responsive: 'vertical',
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
            title={"Resource List"}
            data={userData}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      {/* Add and Edit Modal */}
      <Modal show={show} size="xl">
        <Modal.Header>
          <Modal.Title>{inputs._id ? 'Edit ' : 'Create New '} Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Sector</label>
                <select name='Sector' onChange={handleChange} value={inputs.Sector} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  <option value='IT'>IT</option>
                  <option value='Non-IT'>Non-IT</option>
                  {/* <option value='Others'>Others</option> */}
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">HR Name</label>
                <input name='HRName' onChange={handleChange} value={inputs.HRName} readOnly type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Name</label>
                <input name='Name' onChange={handleChange} value={inputs.Name} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">E-mail</label>
                <input name='Email' onChange={handleChange} value={inputs.Email} type="email" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Phone</label>
                <input name='Phone' onChange={handleChange} value={inputs.Phone} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Gender</label>
                <select name='Gender' onChange={handleChange} value={inputs.Gender} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Marital status</label>
                <select name='MaritalStatus' onChange={handleChange} value={inputs.MaritalStatus} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  <option value='Single'>Single</option>
                  <option value='Married'>Married</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Age</label>
                <input name='Age' onChange={handleChange} value={inputs.Age} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">State</label>
                <select name='State' onChange={handleChange} value={inputs.State} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  {cities.map((item, i) => (
                    <option key={i} value={item.State}>{item.State}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">City</label>
                <select name='City' onChange={handleChange} value={inputs.City} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  {cityData.map((item, i) => (
                    <option key={i} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Qualification</label>
                <CreatableSelect
                  value={eduValue}
                  options={eduData}
                  onChange={eduChange}
                  onCreateOption={eduCreate}
                  isMulti={true}
                />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Skills</label>
                <CreatableSelect
                  value={skillValue}
                  options={skillData}
                  onChange={skillChange}
                  onCreateOption={skillCreate}
                  isMulti={true}
                />
              </div>
            </div>
            <div className='col-sm-4'>
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
            <div className='col-sm-4'>
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
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Total Experience</label>
                <input name='TotalExp' onChange={handleChange} value={inputs.TotalExp} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Relavant Experience</label>
                <input name='RelaventExp' onChange={handleChange} value={inputs.RelaventExp} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Notice Period</label>
                <select name='NoticePeriod' onChange={handleChange} value={inputs.NoticePeriod} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  <option value='Immediate'>Immediate</option>
                  <option value='3-Days'>3-Days</option>
                  <option value='7-Days'>7-Days</option>
                  <option value='14-Days'>14-Days</option>
                  <option value='1-Month'>1-Month</option>
                  <option value='2-Months'>2-Months</option>
                  <option value='3-Months'>3-Months</option>
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Current CTC</label>
                <input name='CurrentCTC' onChange={handleChange} value={inputs.CurrentCTC} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Expected CTC</label>
                <input name='ExpectCTC' onChange={handleChange} value={inputs.ExpectCTC} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Mode of Salary</label>
                <select name='SalaryMode' onChange={handleChange} value={inputs.SalaryMode} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  <option value='Monthly'>Monthly</option>
                  <option value='Year'>Year</option>
                </select>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Resume</label>
                <input type="file" className="form-control textInput" onChange={resumeFile} />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Contacted Date</label>
                <input name='ContactedDate' onChange={handleChange} value={inputs.ContactedDate} type="date" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Interview Date</label>
                <input name='InterviewDate' onChange={handleChange} value={inputs.InterviewDate} type="date" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Client Name</label>
                <input name='ClientName' onChange={handleChange} value={inputs.ClientName} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Client Location</label>
                <input name='ClientLocation' onChange={handleChange} value={inputs.ClientLocation} type="text" className="form-control textInput" />
              </div>
            </div>
            <div className='col-sm-4'>
              <div className="form-group">
                <label className="inputLabel">Status</label>
                <select name='InterviewStatus' onChange={handleChange} value={inputs.InterviewStatus} className="form-control textInput">
                  <option defaultValue=''>Choose</option>
                  <option value='Selected'>Selected</option>
                  <option value='Not Selected'>Not Selected</option>
                  <option value='Rejected'>Rejected</option>
                  <option value='Not Shown'>Not Shown</option>
                  <option value='Int. Scheduled'>Int. Scheduled</option>
                  <option value='Int. Attended'>Int. Attended</option>
                  <option value='Cancelled'>Cancelled</option>
                  <option value='Hold'>Hold</option>
                </select>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>{inputs._id ? 'Update' : 'Save'}</Button>
          <Button variant="danger" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* File view Modal */}
      <Modal show={showFile} size="lg">
        <Modal.Header>
          <Modal.Title>Resume View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <object height='400px' width='100%' data={`${API_View}/${fileName}`} aria-label={fileName} type="application/pdf" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            setFileName('')
            setShowFile(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete popup Modal */}
      <Modal show={showDelete} >
        <Modal.Header>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div><h6>Delete the selected candidate !! </h6></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(fileName)}>Delete</Button>
          <Button variant="secondary" onClick={() => closeDelete()}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Comments popup Modal */}
      <Modal show={showComment} >
        <Modal.Header>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row'>
              {comment.CommentsArr.length > 0 ?
                <div className='col-sm-12'>{comment.CommentsArr.map((item, i) => {
                  const date = new Date(item.Created)
                  return (<>
                    <label>{date.toLocaleString()}</label>
                    <h6>{item.Remark}</h6>
                    <hr style={{ border: 'gray dashed 1px' }} />
                  </>)
                })}
                </div> : null}
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <div className="form-group">
                  <textarea onChange={(e) => { setComment({ ...comment, Comment: e.target.value }) }} rows={2}
                    value={comment.Comment} placeholder='Enter Your Comments' type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => submitComment()}>Submit</Button>
          <Button variant="secondary" onClick={() => closeComment()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ResourceLander;