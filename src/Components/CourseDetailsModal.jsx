import React from 'react';
import './CourseDetailsModal.css';

const CourseDetailsModal = ({ course, onClose }) => {
    if (!course) return null;

    return (
        <div className="modal show" style={{ display: 'block' }} aria-labelledby="courseDetailsModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="courseDetailsModalLabel">Course Details</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p className="text-capitalize"><strong>Course Title :</strong> {course.course_title}</p>
                        <p><strong>Course Code :</strong> {course.course_code}</p>
                        <p className="text-capitalize"><strong>Course Description :</strong> {course.course_desc}</p>
                        {/* Add more fields if necessary */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsModal;
