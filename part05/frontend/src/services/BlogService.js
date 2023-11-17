import axios from 'axios'
const baseUrl = '/api/blogs'

const getBlogs = (authToken) => {
    //Header to be used containg the Auth Bearer Token
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    const request = axios.get(baseUrl,config)
    console.log('Auth Token: ', authToken)
    return request.then(response => response.data)
}

const saveBlog = (newObject,authToken) => {
    //Header to be used containg the Auth Bearer Token
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    return axios.post(baseUrl, newObject,config)
        .then(response => response.data)
        .catch(error => {
            console.log('Error saving person:', error)
            throw error
        })
}

const deleteBlog = (id,authToken) => {
    //Header to be used containg the Auth Bearer Token
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    const request = axios.delete(`${baseUrl}/${id}`,config)
    return request.then(response => response.data)
}

const likeBlog = (id,authToken) => {
    //Header to be used containg the Auth Bearer Token
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }
    const request = axios.post(`${baseUrl}/${id}/like`,'',config)
    return request.then(response => response.data)
}


export default { getBlogs, saveBlog, deleteBlog, likeBlog }