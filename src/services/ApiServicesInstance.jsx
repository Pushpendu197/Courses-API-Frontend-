import axios from 'axios';

export const getinstances = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/instances/');
        return response.data;
    } catch (error) {
        console.error("Error fetching instances:", error);
        throw error;
    }
}

export const addinstances = async (instances) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/instances/', {
            instances_id: null,
            instances_title: instances.instances_title.value,
            instances_year: instances.instances_year.value,
            instances_sem: instances.instances_sem.value,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding instance:", error);
        throw error;
    }
}

export const deleteinstances = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/instances/${id}/`);
    } catch (error) {
        console.error("Error deleting instance:", error);
        throw error;
    }
}

export const updateinstances = async (id, updatedInstances) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/instances/${id}/`, updatedInstances);
        return response.data;
    } catch (error) {
        console.error("Error updating instance:", error);
        throw error;
    }
}

export const getcourse = async () => {
    try {
        const response = await axios.get('/api/courses');
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the courses!", error);
        throw error;
    }
}
