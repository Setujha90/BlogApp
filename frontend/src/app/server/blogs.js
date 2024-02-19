import axios from "axios"

const url = "http://localhost:8000/api/v1/blog"

export const getAllBlogs = async () => {

    const response = await axios.get(url)
    const blogs = response.data.data["blogs"]

    return blogs
}

export const createBlog = async (title, description, thumbnail, images) => {
    try {
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description",description)
        formData.append("thumbnail",thumbnail)
        formData.append("images",images)
    
        const response = await axios.post(`${url}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
            })

        return response.data.data["blog"]
        
    } catch (error) {
        throw error
    }

}

export const deleteBlog = async (id) => {
    try{
        const response = await axios.delete(`${url}/${id}/delete`, {
            withCredentials: true,
        })

        return response
    }
    catch(error){
        throw error
    }
}

export const updateBlog = async (id, title, description) => {
    try{
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)

        const response = await axios.patch(`${url}/${id}/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
    }
    catch(error){
        throw error
    }
}

export const likeBlog = async (id) => {
    try{
        const response = await axios.post(`${url}/${id}/like`, {}, {withCredentials: true})

        return response.data.data
    }
    catch(error){
        throw error
    }
}

export const getBlogById = async (id) => {
    try{
        const response = await axios.get(`${url}/${id}`, {}, {withCredentials:true})

        return response.data.data["blog"]
    }
    catch(error){
        throw error
    }
}