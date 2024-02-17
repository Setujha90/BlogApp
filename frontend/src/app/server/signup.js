import axios from 'axios';

const url = "http://localhost:8000/api/v1/users";

export const loggedInUser = async (id) => {

}

export const userById = async(id) =>{
    let user;
    const url = "http://localhost:8000/api/v1/users"
  
    try {
      const res = await axios.get(`${url}/${id}`)
        user = res.data.data["user"]
        return { 
            "username": user.username, 
            "fullName": user.fullName, 
            "email": user.email, 
            "avatarImage": user.avatarImage, 
            "blogs": user.blogs, 
            "blogHistory": user.blogHistory 
        }
    } catch (error) {
      throw error
    }
}


export const SignupSubmit = async (username, fullName, email, avatarImage, password) => {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('avatarImage', avatarImage); // Append the file here
        formData.append('password', password);

        const response = await axios.post(`${url}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const res = response.data.data["createdUser"]
        return {id:res._id, avatarImage:res.avatarImage};
    } catch (error) {
        console.error('Error occurred while signing up:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const SigninSubmit = async (email, password) => {
    try {
        const response = await axios.post(`${url}/login`, 
                {"email": email, "password": password},
                {withCredentials: true});
        const res = response.data.data["loggedInUser"]
        return {id:res._id, avatarImage:res.avatarImage};
    } catch (error) {
        throw error;
    }
};

export const LogoutSubmit = async() => {

    try {
        const response = await axios.post(`${url}/logout`, {}, {
            withCredentials:true,
        })

        return response
    } catch (error) {
        throw error;
    }

}

