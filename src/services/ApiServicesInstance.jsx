import axios from 'axios';

export function getinstances() {
    return axios.get('http://127.0.0.1:8000/instances/')
        .then(res => res.data);
}

export function addinstances(instances) {
    return axios.post('http://127.0.0.1:8000/instances/', {
        instances_id: null,
        instances_title: instances.instances_title.value,
        instances_year: instances.instances_year.value,
        instances_sem: instances.instances_sem.value,
    }).then(res => res.data);
}

export function deleteinstances(id) {
    return axios.delete('http://127.0.0.1:8000/instances/' + id + '/')
        .then(res => res.data);
}

export function updateinstances(id, updatedInstances) {
    return axios.put('http://127.0.0.1:8000/instances/' + id + '/', updatedInstances)
        .then(res => res.data);
}

export const getcourse = () => {
    return axios.get('/api/courses')
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error fetching the courses!", error);
        });
};
