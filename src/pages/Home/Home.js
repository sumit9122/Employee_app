import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {
  const [dataList, setDataList] = useState([]);
  let token = window.localStorage.getItem("token");

  useEffect(() => {
    getEmployeeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getEmployeeData = () => {
    axios.get('http://65.2.132.88:7070/admin/get-all-emp', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setDataList(res.data.details);
    })
  }


  return (
    <div>
      <div className='container'>
        <div className='heading_add'>
          <h2>Employee List</h2>
          <Link className='add_button' to='/addEmployee'>Add Employee</Link>
        </div>
        <div className='table_data'>
          <table class="table">
            <thead>
              <th>EmpName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Role</th>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr>
                  <td data-label="EmpName">{item.emp_name}</td>
                  <td data-label="Email">{item.email}</td>
                  <td data-label="Phone">{item.phone}</td>
                  <td data-label="Company">{item.company}</td>
                  <td data-label="Designation">{item.designation}</td>
                  <td data-label="Department">{item.department}</td>
                  <td data-label="Role">{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home