import axios from "axios"

const url = "http://localhost:8000/api/v1/blog"

export const getAllBlogs = async () => {

    const response = await axios.get(url)
    const data = response.data.data["blogs"]

    return data
}