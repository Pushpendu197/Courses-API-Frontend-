// import React from 'react'
// import { Link } from 'react-router-dom'

// const AddUser = ({ handleAddSubmit }) => {
//     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
//     const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
//     return (
//         <>

//             <h3 className='text-center mb-4'>Create Course</h3>

//             <form onSubmit={handleAddSubmit}>
//                 <div className='row mb-3'>
//                     <label className='col-sm-4 col-form-label'>Course Title</label>
//                     <div className='col-sm-8'>
//                         <input className='form-control text-capitalize' name='course_title' placeholder='Course Title' required></input>
//                         <span className='text-danger'></span>
//                     </div>
//                 </div>
//                 <div className='row mb-3'>
//                     <label className='col-sm-4 col-form-label'>Course Code</label>
//                     <div className='col-sm-8'>
//                         <input className='form-control text-capitalize' name='course_code' placeholder='Course Code' required></input>
//                         <span className='text-danger'></span>
//                     </div>
//                 </div>
//                 <div className='row mb-3'>
//                     <label className='col-sm-4 col-form-label'>Course Description</label>
//                     <div className='col-sm-8'>
//                         <input className='form-control text-capitalize' name='course_desc' placeholder='Course Description' required></input>
//                         <span className='text-danger'></span>
//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className='offset-sm-4 col-sm-7 d-flex'>
//                         <button type='submit' className='btn btn-primary' handleAddSubmit={handleAddSubmit}>Add Course</button>
//                         <Link to='/addinstance' type='submit' className='btn btn-info ms-3'>Add Instance</Link>

//                     </div>


//                 </div>
//             </form>


//         </>
//     )
// }

// export default AddUser