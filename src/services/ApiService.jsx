import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/course/';

export const getcourse = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const addcourse = async (course) => {
    try {
        const response = await axios.post(API_URL, {
            course_id: null,
            course_title: course.course_title.value,
            course_code: course.course_code.value,
            course_desc: course.course_desc.value,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding course:', error);
        throw error;
    }
};

export const deletecourse = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};

export const updatecourse = async (id, updatedCourse) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, updatedCourse);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};
