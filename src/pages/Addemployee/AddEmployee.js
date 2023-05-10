import React, { useState } from 'react'
import './AddEmployee.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [empData, setEmpData] = useState({});
    const [empError, setEmpError] = useState('');
    const initialState = {
        empName: "",
        email:"",
        gender:"",
        dob:"",
        phone:"",
        address1:"",
        address2:"",
        father:"",
        mother:"",
        bankName:"",
        accNumber:"",
        ifsc:"",
        pan:"",
        adhar:"",
        voterId:"",
        dL:"",
        passport:"",
        company:"",
        department:"",
        designation:"",
        role:""
    }
  const navigate = useNavigate();



    const handleChange = (e) => {
        const employeeData = { ...empData, [e.target.name]: e.target.value };
        setEmpData(employeeData);

    }

    const submit = () => {
       let token = window.localStorage.getItem("token");
        console.log("empData", empData)
        let errorData = validate(empData)
        setEmpError(errorData);
         
       if( Object.keys(errorData).length > 0 ) return;
        // window.localStorage.setItem("empData",JSON.stringify(empData));
        axios.post('http://65.2.132.88:7070/admin/emp/add',empData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log("res", res.data);
             setTimeout(()=> {
              navigate(-1);
             },1000)
        }).catch(err => {
            console.log(err);
        })
    }

    const validate = (val) => {
        const no_pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const adharvalid = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/
        const voteridval = /^([a-zA-Z]){3}([0-9]){7}?$/g;
        const passportval = new RegExp("^[A-Z0-9.,/ $@()]+$");
        const errors = {};
        if (!val?.empName) {
            errors.empName = "empName is required";
        }
        if (!val?.email) {
            errors.email = "email is required";
        } else if (!email_pattern.test(val.email)) {
            errors.email = "enter valid email";
        }
        if (!val?.gender) {
            errors.gender = "gender is required";
        }
        if (!val?.dob) {
            errors.dob = "dob is required";
        }
        if (!val?.phone) {
            errors.phone = "phone is required";
        } else if (!no_pattern.test(val.phone)) {
            errors.phone = "enter valid phone";
        }
        if (!val?.address1) {
            errors.address1 = "address1 is required";
        }
        if (!val?.address2) {
            errors.address2 = "address2 is required";
        }
        if (!val?.father) {
            errors.father = "father name is required";
        }
        if(!val?.mother){
           errors.mother = "mother name is required";
        }
        if(!val?.bankName){
            errors.bankName = "bankname is required";
        }
        if(!val?.accNumber){
            errors.accNumber ="account no is required";
        }
        if(!val?.ifsc){
          errors.ifsc ="ifsc is required";
        }
        if(!val?.pan){
            errors.pan ="Pan no. is required";
        }
        if(!val?.adhar){
            errors.adhar="adhar number is required";
        }else if(!adharvalid.test(val.adhar)){
            errors.adhar="enter valid adhar number";
        } 
        if(!val?.voterId){
            errors.voterId="voterId is required";
        }else if(!voteridval.test(val.voterId)){
           errors.voterId="enter valid voterId"; 
        }
        if(!val?.dL){
            errors.dL="dL is required";
        }
        if(!val.passport){
          errors.passport="passport number is required";
        }else if(!passportval.test(val.passport)){
             errors.passport="enter valid passport numer";
        }
        if(!val?.company){
            errors.company="company name is required";
        }
        if(!val?.department){
            errors.department="department is required";
        }
        if(!val?.designation){
             errors.designation="designation is required";
        }
        if(!val?.role){
            errors.role="role is required";
        }
        
        console.log("errors",errors)

        return errors;
    }

    const reset = () => {
        setEmpData(initialState);
        
    }

    return (
        <div>
            <div className='container'>
            <div className='flex'>
            <button onClick={() => navigate(-1)}>{`<`}</button>
            <h2>Add Employee</h2>
          </div>
                <div className='form_sec'>
                    <div className='form_control'>
                        <label>Name</label>
                        <input type='text' name='empName' onChange={handleChange} value={empData.empName} placeholder='Enter empName' autocomplete="off" />
                        {empError.empName && <span>{empError.empName}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Email</label>
                        <input type='text' name='email' onChange={handleChange} value={empData.email} placeholder='Enter email' autocomplete="off" />
                        {empError.email && <span>{empError.email}</span>}
                    </div>
                    <div className='form_control gend'>
                        <label>Gender</label>
                        <div className='gender'>
                            <label for="male">Male</label>
                            <input type="radio" id="gender" onChange={handleChange} name="gender" value="male" />
                            <label for="male">Female</label>
                            <input type="radio" id="gender" name="gender" onChange={handleChange} value="female" />
                            <label for="male">Others</label>
                            <input type="radio" id="gender" name="gender" onChange={handleChange} value="others" />
                        </div>
                        {empError.gender && <span>{empError.gender}</span>}
                    </div>
                    <div className='form_control'>
                        <label>DOB</label>
                        <input type='date' name='dob' value={empData.dob} onChange={handleChange} autocomplete="off" />
                        {empError.dob && <span>{empError.dob}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Phone</label>
                        <input type='text' name='phone' onChange={handleChange} value={empData.phone} placeholder='Enter phone' autocomplete="off" />
                        {empError.phone && <span>{empError.phone}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Address1</label>
                        <input type='text' name='address1' onChange={handleChange} value={empData.address1} placeholder='Enter Address1' autocomplete="off" />
                        {empError.address1 && <span>{empError.address1}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Address2</label>
                        <input type='text' name='address2' onChange={handleChange} value={empData.address2} placeholder='Enter permanent address' autocomplete="off" />
                        {empError.address2 && <span>{empError.address2}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Father Name</label>
                        <input type='text' name='father' onChange={handleChange} value={empData.father} placeholder='Enter fathername' autocomplete="off" />
                        {empError.father && <span>{empError.father}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Mother Name</label>
                        <input type='text' name='mother' onChange={handleChange} value={empData.mother} placeholder='Enter mother name' autocomplete="off" />
                        {empError.mother && <span>{empError.mother}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Bank Name</label>
                        <input type='text' name='bankName' onChange={handleChange} value={empData.bankName} placeholder='Enter bank name' autocomplete="off" />
                        {empError.bankName && <span>{empError.bankName}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Account Number</label>
                        <input type='text' name='accNumber' onChange={handleChange} value={empData.accNumber} placeholder='Enter accNumber' autocomplete="off" />
                        {empError.accNumber && <span>{empError.accNumber}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Ifsc</label>
                        <input type='text' name='ifsc' onChange={handleChange} value={empData.ifsc} placeholder='Enter ifsc' autocomplete="off" />
                        {empError.ifsc && <span>{empError.ifsc}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Pan</label>
                        <input type='text' name='pan' onChange={handleChange} value={empData.pan} placeholder='Enter pan' autocomplete="off" />
                        {empError.pan && <span>{empError.pan}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Adhar</label>
                        <input type='text' name='adhar' onChange={handleChange} value={empData.adhar} placeholder='Enter adhar' autocomplete="off" />
                        {empError.adhar && <span>{empError.adhar}</span>}
                    </div>
                    <div className='form_control'>
                        <label>VoterId</label>
                        <input type='text' name='voterId' onChange={handleChange} value={empData.voterId} placeholder='Enter voterId' autocomplete="off" />
                        {empError.voterId && <span>{empError.voterId}</span>}
                    </div>
                    <div className='form_control'>
                        <label>DL</label>
                        <input type='text' name='dL' onChange={handleChange} value={empData.dL} placeholder='Enter dL' autocomplete="off" />
                        {empError.dL && <span>{empError.dL}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Passport</label>
                        <input type='text' name='passport' onChange={handleChange} value={empData.passport} placeholder='Enter passport' autocomplete="off" />
                        {empError.passport && <span>{empError.passport}</span>}
                    </div>
                    <div className='form_control'>
                        <label>Company</label>
                        <input type='text' name='company' onChange={handleChange} value={empData.company} placeholder='Enter company' autocomplete="off" />
                        {empError.company && <span>{empError.company}</span>}
                    </div>
                    <div className='form_control'>
                        <label for="">Department</label>
                        <select name="department" onChange={handleChange} value={empData.department} id="">
                            <option value="human resources">Human Resources</option>
                            <option value="marketing">Marketing</option>
                            <option value="sales">Sales</option>
                            <option value="finance">Finance</option>
                        </select>
                        {empError.department && <span>{empError.department}</span>}
                    </div>
                    <div className='form_control'>
                        <label for="">Designation</label>
                        <select name="designation" onChange={handleChange} value={empData.designation} id="">
                            <option value="software engineer">Software Engineer</option>
                            <option value="software developer">Software Developer</option>
                            <option value="junior software developer">Junior Software Developer</option>
                            <option value="intern software developer">Intern Software Developer</option>
                        </select>
                        {empError.designation && <span>{empError.designation}</span>}
                    </div>
                    <div className='form_control'>
                        <label for="">Role</label>
                        <select name="role" onChange={handleChange} value={empData.role} id="">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {empError.role && <span>{empError.role}</span>}
                    </div>
                </div>

                <div className='button_group'>
                    <button onClick={submit}>Submit</button>
                    <button onClick={reset}>Reset</button>
                </div>
            </div>
            {/* <div>{window.localStorage.getItem('empData')}</div> */}
        </div>
    )
}

export default AddEmployee