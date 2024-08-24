import React from 'react';
import './CourseDetailsModal.css';

const InstanceDetailsModal = ({ instances, onClose }) => {
    if (!instances) return null;

    return (
        <div className="modal show" style={{ display: 'block' }} aria-labelledby="instanceDetailsModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="instanceDetailsModalLabel">Instances Details</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p className="text-capitalize"><strong>Instances ID :</strong> {instances.instances_id}</p>
                        <p className="text-capitalize"><strong>Instances Title :</strong> {instances.instances_title}</p>
                        {/* <p><strong>Course Code :</strong> {instances.course_code}</p> */}
                        <p className="text-capitalize"><strong>Instances Year :</strong> {instances.instances_year}</p>
                        <p className="text-capitalize"><strong>Instances Semester :</strong> {instances.instances_sem}</p>
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

export default InstanceDetailsModal;
