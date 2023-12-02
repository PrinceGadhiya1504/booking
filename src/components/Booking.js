import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Booking = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    event: 'wedding',
    comments: '',
    date: '',
  })

  const [error, setError] = useState({
    status: false,
    type: '',
    msg: ''
})

const navigate = useNavigate();

const [data, setData] = useState();

useEffect(() => {
  axios.get("http://localhost:8000/booking")
  .then((res) => setData(res.data))
  .catch(err => console.log(err))
},[setData])

const r1 = document.getElementById("date1");
const r2 = document.getElementById("date2");
// https://www.aspsnippets.com/Articles/1981/RadioButton-OnClick-event-example-in-JavaScript/

function oneDays(){
  // let one = document.getElementById("one");
  // let d1 = document.getElementById("date1");
  // d1.style.display = one.checked ? "block" : "none";
  r1.style.display = 'flex';
  r2.style.display = 'none';
}

function multiDays(){
  r1.style.display = 'flex';
  r2.style.display = 'flex';
}

  const handleSubmit = ((e) => {
    e.preventDefault();

    const val = new FormData(e.currentTarget);
    const actualData = {
      name: val.get('name'),
      email: val.get('email'),
      phone: val.get('phone'),
      event: val.get('event'),
      comments: val.get('comments'),
      date: val.get('date'),
    }
    let a = true;
    // if (actualData.name && actualData.email && actualData.phone && actualData.comments && actualData.date) {
      if (actualData.date) {
      data.map((d) => {
        if(actualData.date !== d.date &&  a===true){
          a=true;
        }
        else{
          console.log("Error");
          setError({ status: true, msg: "Date already bookked", type: "Error" })
          a=false;
        }
        return 0;
      })
      if(a===true){
        axios.post("http://localhost:8000/booking", values)
        .then(navigate('/'))
        .catch(err => console.log(err))
      }
  } else {
      setError({ status: true, msg: "All fields are require", type: "Error" })
  }
  })

  return (
    <div>
      {/* Serching hall : https://www.suratmunicipal.gov.in/OnlineServices/CommunityHallBook/CheckAvailability */}

      <div className="card d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
          <h2 className='text-secondary'><u>PARTY PLOT BOOKING AVAILABILITY</u></h2>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className='col-md-9 col-lg-7 col-xl-5 mt-3'>
              {/* <div className='mb-3'>
                  <input type='text' name='name' onChange={e => setValues({ ...values, name: e.target.value })} className='form-control' placeholder='Enter Name' autoComplete='off' autoFocus/>
                </div>
                <div className='mb-3'>
                  <input type='text' name='email' onChange={e => setValues({ ...values, email: e.target.value })} className='form-control' placeholder='Enter Email' autoComplete='off' />
                </div>
                <div className='mb-3'>
                  <input type='text' name='phone' onChange={e => setValues({ ...values, phone: e.target.value })} className='form-control' placeholder='Enter Phone No' autoComplete='off' />
                </div>
                <div className='mb-3'>
                  Event : 
                  <select className='ms-3' name='event' onChange={e => setValues({...values, event: e.target.value})}>
                    <option value='wedding'>Wedding</option>
                    <option value='engagement'>Engagement</option>
                    <option value='birthday'>Birthday Celebration</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <textarea name='comments' onChange={e => setValues({ ...values, comments: e.target.value })} className='form-control' rows="4" cols="50" placeholder='Enter Comments.....' autoComplete='off'>
                  </textarea>
                </div> */}
                <div className='mb-3'>
                  <input type='radio' id='one' name='days' onClick={oneDays}/> One Days &nbsp;&nbsp;
                  <input type='radio' id='two' name='days' onClick={multiDays}/> Multi Days
                </div>
                <div className='mb-3'>
                  <input type='date' style={{display: 'none'}} id='date1' name='date1' onChange={e => setValues({ ...values, date1: e.target.value })} className='form-control' />
                </div>
                <div className='mb-3'>
                  <input type='date' style={{display: 'none'}} id='date2' name='date2' onChange={e => setValues({ ...values, date2: e.target.value })} className='form-control' autoComplete='off' />
                </div>
                {error.status ? <div className='mb-3 alert alert-danger'>{error.type}, {error.msg}</div> : ''}
                <div className='mb-3'>
                  <button className='btn btn-success'>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking
