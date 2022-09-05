import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios";
import { API_URL } from "../commen/utils";

const API_Login = `${API_URL}/user/login`

export default function Login() {

    const [input, setInput] = useState({
        username: '', password: '',
        type: ''
    })
    const history = useHistory()

    const handlecChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleLogin = async () => {
        if (input.type === '') {
            document.getElementById('err').innerHTML = 'Select User Type'
        } else if (input.type === 'Admin') {
            if (input.username === 'admin@prs.com' && input.password === 'prs@123') {
                const datas = {
                    User: 'Admin',
                    Tokens: "34567890rtyui"
                }
                localStorage.setItem('HR_Token', JSON.stringify(datas));
                history.push('/portal')
            } else {
                document.getElementById('err').innerHTML = 'Wrong'
            }
        } else if (input.type === 'Employee') {
            if (input.username !== '' && input.password !== '') {
                const { data } = await axios.post(`${API_Login}`, {
                    Email: input.username,
                    Password: input.password,
                })
                if (data) {
                    if (data.result === "error") {
                        document.getElementById('err').innerHTML = data.message
                    } else if (data.result === "success") {
                        document.getElementById('err').innerHTML = ''
                        const datas = {
                            User: 'Employee',
                            Tokens: data.token
                        }
                        localStorage.setItem('HR_Token', JSON.stringify(datas));
                        history.push('/portal')
                    }
                } else {
                    document.getElementById('err').innerHTML = 'Internal Server Error'
                }
            } else {
                document.getElementById('err').innerHTML = 'Fields are Required'
            }
        }

    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-6 loginBox">
                    <div className="col loginKey">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div className="col loginTitle">
                        HR PORTAL
                    </div>
                    <div className="col loginForm">
                        <div className="form-group">
                            <label className="inputLabel">USER TYPE</label>
                            <select type="text" className="form-control loginInput" name='type' onChange={handlecChange} value={input.type} >
                                <option value=''>Select User</option>
                                <option value='Admin'>Admin</option>
                                <option value='Employee'>Employee</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="inputLabel">USERNAME</label>
                            <input type="email" className="form-control loginInput" name='username' onChange={handlecChange} value={input.username} />
                        </div>
                        <div className="form-group">
                            <label className="inputLabel">PASSWORD</label>
                            <input type="password" className="form-control loginInput" name='password' onChange={handlecChange} value={input.password} />
                        </div>
                        <p id='err' className='text-danger'></p>
                        <div className="col loginButton text-right">
                            <button type="button" className="btn" onClick={handleLogin}>LOGIN</button>
                        </div>
                    </div>
                    {/* <div className="col forgetLink ">
                        <a className='btn' href='/'>Forget Password ?</a>
                    </div> */}
                </div>
            </div>
        </div>
    )
}