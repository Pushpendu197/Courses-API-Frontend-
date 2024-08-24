import axios from 'axios';

export function getcourse() {
    return axios.get('http://127.0.0.1:8000/course/')
        .then(res => res.data);
}

export function addcourse(course) {
    return axios.post('http://127.0.0.1:8000/course/', {
        course_id: null,
        course_title: course.course_title.value,
        course_code: course.course_code.value,
        course_desc: course.course_desc.value,
    }).then(res => res.data);
}

export function deletecourse(id) {
    return axios.delete('http://127.0.0.1:8000/course/' + id + '/')
        .then(res => res.data);
}

export function updatecourse(id, updatedCourse) {
    return axios.put('http://127.0.0.1:8000/course/' + id + '/', updatedCourse)
        .then(res => res.data);
}
