import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";
import { API_URL, API_View } from '../../commen/utils';
import { CustomDataTable } from '../../commen/customDataTable';

const API_Key = `${API_URL}/resource`

export function ItLander() {

  const [userData, setUserData] = useState([])
  const [showFile, setShowFile] = useState(false)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    getResource()
  }, [])

  const getResource = async () => {
    const { data } = await axios.get(`${API_Key}/list-all`)
    if (data) {
      setUserData(data)
    }
  }

  const openFile = (val) => {
    setFileName(val)
    setShowFile(true)
  }

  const columns = [
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
      name: "Resume",
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
      name: "InterviewStatus",
      label: "Status",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 0,
            minWidth: 130,
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
            minWidth: 130,
            zIndex: 1001
          },
        }),
      }
    }
  ];

  return (
    <div className="container">
      <div className="row">
        <CustomDataTable
          data={userData.filter(ss => ss.Sector === 'IT')}
          columns={columns}
        />

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
      </div>
    </div>
  );
}

export function NonItLander() {

  const [userData, setUserData] = useState([])
  const [showFile, setShowFile] = useState(false)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    getResource()
  }, [])

  const getResource = async () => {
    const { data } = await axios.get(`${API_Key}/list-all`)
    if (data) {
      setUserData(data)
    }
  }

  const openFile = (val) => {
    setFileName(val)
    setShowFile(true)
  }

  const columns = [
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
      name: "Resume",
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
      name: "InterviewStatus",
      label: "Status",
      options: {
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            right: 0,
            minWidth: 130,
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
            minWidth: 130,
            zIndex: 1001
          },
        }),
      }
    }
  ];

  return (
    <div className="container">
      <div className="row">
        <CustomDataTable
          data={userData.filter(ss => ss.Sector === 'Non-IT')}
          columns={columns}
        />

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
      </div>
    </div>
  );
}

{/* <div className="col">
      <div className="card card-rounded">
        <div className="card-body">
          <div className="d-sm-flex justify-content-between align-items-start">
            <div>
              <h4 className="card-title card-title-dash">New Requests</h4>
            </div>
          </div>
          <div className="table-responsive  mt-1">
            <table className="table select-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Company</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="form-check form-check-flat mt-0">
                      <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" aria-checked="false"/><i className="input-helper"></i></label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex ">
                      <img src="images/faces/face1.jpg" alt=""/>
                      <div>
                        <h6>Brandon Washington</h6>
                        <p>Head admin</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6>Company name 1</h6>
                    <p>company type</p>
                  </td>
                  <td>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                        <p className="text-success">79%</p>
                        <p>85/162</p>
                      </div>
                      <div className="progress progress-md">
                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                  <td><div className="badge badge-opacity-warning">In progress</div></td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check form-check-flat mt-0">
                      <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" aria-checked="false"/><i className="input-helper"></i></label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <img src="images/faces/face2.jpg" alt=""/>
                      <div>
                        <h6>Laura Brooks</h6>
                        <p>Head admin</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6>Company name 1</h6>
                    <p>company type</p>
                  </td>
                  <td>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                        <p className="text-success">65%</p>
                        <p>85/162</p>
                      </div>
                      <div className="progress progress-md">
                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                  <td><div className="badge badge-opacity-warning">In progress</div></td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check form-check-flat mt-0">
                      <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" aria-checked="false"/><i className="input-helper"></i></label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <img src="images/faces/face3.jpg" alt=""/>
                      <div>
                        <h6>Wayne Murphy</h6>
                        <p>Head admin</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6>Company name 1</h6>
                    <p>company type</p>
                  </td>
                  <td>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                        <p className="text-success">65%</p>
                        <p>85/162</p>
                      </div>
                      <div className="progress progress-md">
                        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                  <td><div className="badge badge-opacity-warning">In progress</div></td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check form-check-flat mt-0">
                      <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" aria-checked="false"/><i className="input-helper"></i></label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <img src="images/faces/face4.jpg" alt=""/>
                      <div>
                        <h6>Matthew Bailey</h6>
                        <p>Head admin</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6>Company name 1</h6>
                    <p>company type</p>
                  </td>
                  <td>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                        <p className="text-success">65%</p>
                        <p>85/162</p>
                      </div>
                      <div className="progress progress-md">
                        <div className="progress-bar bg-danger" role="progressbar"  aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                  <td><div className="badge badge-opacity-danger">Pending</div></td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check form-check-flat mt-0">
                      <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" aria-checked="false"/><i className="input-helper"></i></label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex">
                      <img src="images/faces/face5.jpg" alt=""/>
                      <div>
                        <h6>Katherine Butler</h6>
                        <p>Head admin</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6>Company name 1</h6>
                    <p>company type</p>
                  </td>
                  <td>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                        <p className="text-success">65%</p>
                        <p>85/162</p>
                      </div>
                      <div className="progress progress-md">
                        <div className="progress-bar bg-success" role="progressbar"  aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </td>
                  <td><div className="badge badge-opacity-success">Completed</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> */}