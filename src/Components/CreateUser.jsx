import React, { useEffect, useState } from 'react';
import './CreateUser.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { addcourse, deletecourse, getcourse, updatecourse } from '../services/ApiService';
import CourseDetailsModal from './CourseDetailsModal';

const CreateUser = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await getcourse();
                setCourses(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addcourse(e.target);
            setCourses(prevCourses => [...prevCourses, res]);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleDeleteBtn = async (id) => {
        try {
            await deletecourse(id);
            setCourses(prevCourses => prevCourses.filter(p => p.course_id !== id));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleViewCourse = (course) => {
        setSelectedCourse(course);
    };

    const handleEditClick = (course) => {
        setEditingCourse(course);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { course_id, course_title, course_code, course_desc } = e.target;
        try {
            const updatedCourse = {
                course_title: course_title.value,
                course_code: course_code.value,
                course_desc: course_desc.value,
            };
            const res = await updatecourse(course_id.value, updatedCourse);
            setCourses(prevCourses => prevCourses.map(c => (c.course_id === res.course_id ? res : c)));
            setEditingCourse(null);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setEditingCourse(null);
    };

    return (
        <>
            <div className='createUser'>
                <div className='container-create my-2'>
                    <div className='row '>
                        <div className='col-md-5 mx-auto rounded border p-4 '>
                            <h3 className='text-center mb-4'>Create Course</h3>

                            <form onSubmit={handleAddSubmit}>
                                <div className='row mb-3'>
                                    <label htmlFor='course_title' className='col-sm-4 col-form-label'>Course Title</label>
                                    <div className='col-sm-8'>
                                        <input
                                            id='course_title'
                                            className='form-control text-capitalize'
                                            name='course_title'
                                            placeholder='Course Title'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='course_code' className='col-sm-4 col-form-label'>Course Code</label>
                                    <div className='col-sm-8'>
                                        <input
                                            id='course_code'
                                            className='form-control text-capitalize'
                                            name='course_code'
                                            placeholder='Course Code'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor='course_desc' className='col-sm-4 col-form-label'>Course Description</label>
                                    <div className='col-sm-8'>
                                        <input
                                            id='course_desc'
                                            className='form-control text-capitalize'
                                            name='course_desc'
                                            placeholder='Course Description'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='offset-sm-4 col-sm-7 d-flex'>
                                        <button type='submit' className='btn btn-primary'>Add Course</button>
                                        <Link to='/addinstance' className='btn btn-info ms-3'>Add Instance</Link>
                                    </div>
                                </div>
                                <p className='text-center subtext'>** in case at the time of Records any interrupted occurs, please Reload the Page **</p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center my-4">
                    <div className="col-md-10">
                        <div className="table-responsive">
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th className='col-6 text-start ps-3'>Course Title</th>
                                        <th className='col-4 text-start ps-3'>Code</th>
                                        <th className='col text-start ps-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.course_id}>
                                            <td className="text-capitalize text-start ps-3"><strong>{course.course_title}</strong></td>
                                            <td className='text-start ps-3'>{course.course_code}</td>
                                            <td className='btnarea'>
                                                <button className='btn click' data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Course" onClick={() => handleEditClick(course)}><FontAwesomeIcon icon={faUserPen} /></button>
                                                <button className='btn click' data-bs-toggle="tooltip" data-bs-placement="top" title="View Course" onClick={() => handleViewCourse(course)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                                <button className='btn click' data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Course" onClick={() => handleDeleteBtn(course.course_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {selectedCourse && <CourseDetailsModal course={selectedCourse} onClose={closeModal} />}

            {/* Edit Course Form */}
            {editingCourse && (
                <div className="edit-course-modal col-5">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className='my-4 text-center'>Edit Course</h4>
                        </div>

                        <form onSubmit={handleEditSubmit}>
                            <p className="text-capitalize"><strong>Editing Course ID :</strong> {editingCourse.course_id}</p>
                            <input type="hidden" name="course_id" value={editingCourse.course_id} />
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Course Title</label>
                                <div className='col-sm-8'>
                                    <input className='form-control text-capitalize' name='course_title' defaultValue={editingCourse.course_title} required />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Course Code</label>
                                <div className='col-sm-8'>
                                    <input className='form-control text-capitalize' name='course_code' defaultValue={editingCourse.course_code} required />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Course Description</label>
                                <div className='col-sm-8'>
                                    <input className='form-control text-capitalize' name='course_desc' defaultValue={editingCourse.course_desc} required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='offset-sm-4 col-sm-7 py-3 d-flex'>
                                    <button type='submit' className='btn btn-primary'>Update Course</button>
                                    <button type='button' className='btn btn-secondary ms-3' onClick={() => setEditingCourse(null)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateUser;
