import React, { useEffect, useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom';
import { getAPIData } from '../../utils/Index';

const Home = () => {
  const [dataList, setDataList] = useState([]);
  let token = window.localStorage.getItem("token");
  useEffect(() => {
    getEmployeeData()
  }, [])
  const getEmployeeData = () => {
    getAPIData('/get-all-emp', token).then(res => {
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