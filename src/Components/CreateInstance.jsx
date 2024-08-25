import React, { useEffect, useState } from 'react';
import './CreateInstance.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { addinstances, deleteinstances, getinstances, updateinstances } from '../services/ApiServicesInstance';
import { getcourse } from '../services/ApiService';

const CreateInstance = () => {
    const [instances, setInstances] = useState([]);
    const [courses, setCourses] = useState([]);
    const [editingInstances, setEditingInstances] = useState(null);
    const [viewingInstance, setViewingInstance] = useState(null);
    const [searchYear, setSearchYear] = useState('');
    const [searchSemester, setSearchSemester] = useState('');

    const uniqueSemesters = [...new Set(instances.map(instance => instance.instances_sem))];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const instancesData = await getinstances();
                setInstances(instancesData);
                const coursesData = await getcourse();
                setCourses(coursesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const newInstance = await addinstances(e.target);
            setInstances(prevInstances => [...prevInstances, newInstance]);
        } catch (error) {
            console.error("Error adding instance:", error);
        }
    }

    const handleDeleteBtn = async (id) => {
        try {
            await deleteinstances(id);
            setInstances(prevInstances => prevInstances.filter(p => p.instances_id !== id));
        } catch (error) {
            console.error("Error deleting instance:", error);
        }
    }

    const handleEditClick = (instance) => {
        setEditingInstances(instance);
    }

    const handleViewClick = (instance) => {
        setViewingInstance(instance);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { instances_id, instances_title, instances_year, instances_sem } = e.target;
        try {
            const updatedInstance = await updateinstances(instances_id.value, {
                instances_title: instances_title.value,
                instances_year: instances_year.value,
                instances_sem: instances_sem.value
            });
            setInstances(prevInstances =>
                prevInstances.map(c => (c.instances_id === updatedInstance.instances_id ? updatedInstance : c))
            );
            setEditingInstances(null);
        } catch (error) {
            console.error("Error updating instance:", error);
        }
    }

    const getCourseCodeByTitle = (title) => {
        const course = courses.find(c => c.course_title === title);
        return course ? course.course_code : 'N/A';
    };

    const filteredInstances = instances.filter(instance =>
        (searchYear ? instance.instances_year === searchYear : true) &&
        (searchSemester ? instance.instances_sem === searchSemester : true)
    );

    return (
        <>
            <div className='createUser'>
                <div className='container-create my-2'>
                    <div className='row'>
                        <div className='col-md-5 mx-auto rounded border p-4'>
                            <h3 className='text-center mb-4'>Create Instances</h3>

                            <form onSubmit={handleAddSubmit}>
                                <div className='row mb-3'>
                                    <label className='col-sm-4 col-form-label'>Course</label>
                                    <div className='col-sm-8'>
                                        <select className='form-control' name='instances_title' required>
                                            <option value="">Select Course</option>
                                            {courses.map(course => (
                                                <option key={course.course_id} value={course.course_title}>
                                                    {course.course_title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-sm-4 col-form-label'>Year</label>
                                    <div className='col-sm-8'>
                                        <input className='form-control text-capitalize' name='instances_year' placeholder='Year' required />
                                    </div>
                                </div>
                                <div className='row mb-3'>
                                    <label className='col-sm-4 col-form-label'>Semester</label>
                                    <div className='col-sm-8'>
                                        <input className='form-control text-capitalize' name='instances_sem' placeholder='Semester' required />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='offset-sm-4 col-sm-7 d-flex'>
                                        <button type='submit' className='btn btn-primary'>Add Instance</button>
                                        <Link to='/' className='btn btn-info ms-3'>Add Course</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='container-search my-2'>
                    <div className='row'>
                        <div className='col-md-5 mx-auto rounded border p-4'>
                            <h4 className='text-center mb-4'>Search Instance</h4>

                            <span className='row mb-3'>
                                <label className='col-sm-2 col-form-label'>Year : </label>
                                <div className='col-sm-3'>
                                    <input
                                        className='form-control'
                                        value={searchYear}
                                        onChange={(e) => setSearchYear(e.target.value)}
                                        placeholder='Enter Year'
                                    />
                                </div>
                                <label className='col-sm-3 col-form-label'>Semester : </label>
                                <div className='col-sm-3'>
                                    <select
                                        className='form-control'
                                        value={searchSemester}
                                        onChange={(e) => setSearchSemester(e.target.value)}
                                    >
                                        <option value="">Select Semester</option>
                                        {uniqueSemesters.map((sem, index) => (
                                            <option key={index} value={sem}>{sem}</option>
                                        ))}
                                    </select>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center my-4">
                    <div className="col-md-10">
                        <div className="table-responsive">
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th className='col-5 text-start ps-3'>Course Title</th>
                                        <th className='col-2 text-start ps-3'>Year-Sem</th>
                                        <th className='col-3 text-start ps-3'>Code</th>
                                        <th className='col-2 text-start ps-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInstances.map(instance => (
                                        <tr key={instance.instances_id}>
                                            <td className="text-capitalize text-start ps-3"><strong>{instance.instances_title}</strong></td>
                                            <td className='text-start ps-3'>{instance.instances_year} - {instance.instances_sem}</td>
                                            <td className='text-start ps-3'>{getCourseCodeByTitle(instance.instances_title)}</td>
                                            <td className='btnarea'>
                                                <button className='btn click' data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Instance" onClick={() => handleEditClick(instance)}><FontAwesomeIcon icon={faUserPen} /></button>
                                                <button className='btn click' data-bs-toggle="tooltip" data-bs-placement="top" title="View Instance" onClick={() => handleViewClick(instance)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                                <button className='btn click' data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Instance" onClick={() => handleDeleteBtn(instance.instances_id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {editingInstances && (
                <div className="edit-instances-modal col-5">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className='my-4 text-center'>Edit Instance</h4>
                        </div>

                        <form onSubmit={handleEditSubmit}>
                            <p className="text-capitalize"><strong>Editing Instance ID :</strong> {editingInstances.instances_id}</p>
                            <input type="hidden" name="instances_id" value={editingInstances.instances_id} />
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Course Title</label>
                                <div className='col-sm-8'>
                                    <input className='form-control text-capitalize' name='instances_title' defaultValue={editingInstances.instances_title} required />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Year</label>
                                <div className='col-sm-8'>
                                    <input className='form-control text-capitalize' name='instances_year' defaultValue={editingInstances.instances_year} required />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-4 col-form-label'>Semester</label>
                                <div className='col-sm-8'>
                                    <input className='form-control text-capitalize' name='instances_sem' defaultValue={editingInstances.instances_sem} required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='offset-sm-4 col-sm-7 py-3 d-flex'>
                                    <button type='submit' className='btn btn-primary'>Update Instance</button>
                                    <button type='button' className='btn btn-secondary ms-3' onClick={() => setEditingInstances(null)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {viewingInstance && (
                <div className="edit-instances-modal col-5">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className='my-4 text-center'>Instance Details</h4>
                        </div>
                        <div className='modal-body'>
                            <p><strong>Instance ID : </strong> {viewingInstance.instances_id}</p>
                            <p><strong>Course Title : </strong> {viewingInstance.instances_title}</p>
                            <p><strong>Year : </strong> {viewingInstance.instances_year}</p>
                            <p><strong>Semester : </strong> {viewingInstance.instances_sem}</p>
                            <p><strong>Course Code : </strong> {getCourseCodeByTitle(viewingInstance.instances_title)}</p>
                        </div>
                        <hr />
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-warning' onClick={() => setViewingInstance(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateInstance;
