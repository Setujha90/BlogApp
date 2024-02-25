import axios from 'axios';

const url = "http://localhost:8000/api/v1/users";

export const userById = async(id) =>{
    const url = "http://localhost:8000/api/v1/users"
  
    try {
      const res = await axios.get(`${url}/${id}`)
        return res.data.data["user"]
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

        return response.data.data["createdUser"]
    } catch (error) {
        throw error; // Re-throw the error to handle it in the component
    }
};

export const SigninSubmit = async (email, password) => {
    try {
        const response = await axios.post(`${url}/login`, 
                {"email": email, "password": password},
                {withCredentials: true});
                
        return response.data.data["loggedInUser"]
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

export const updateProfilePic = async(id, avatarImage) => {
    try {
        const formData = new FormData();
        formData.append('avatarImage', avatarImage); // Append the file here
        const response = await axios.post(`${url}/${id}/updateProfilePic`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        })

        return response.data.data["user"]
    } catch (error) {
        throw error
    }
}

export const updateUserProfile = async(id, fullName, email) => {
    try{
        const response = await axios.post(`${url}/${id}/updateUserProfile`, {
            "fullName":fullName,
            "email": email
        }, {withCredentials:true})

        return response.data.data["user"]
    }
    catch(error){
        throw error
    }
}

export const bookmark = async(id, blogId) => {
    try{
        const response = await axios.post(
            `${url}/${id}/bookmark`,
            {
                "blogId": blogId
            },
            {withCredentials:true}
        )

        const res = {
            "user" : response.data.data["user"],
            "msg" : response.data.data["message"]
        }

        return res
    }
    catch(error){
        throw error
    }
}

export const follow = async(id, userId) => {
    try{
        const response = await axios.post(
            `${url}/${id}/follow`,
            {
                "userId": userId
            },
            {withCredentials:true}
        )

        const res = {
            "user" : response.data.data["user"],
            "msg" : response.data.data["message"],
            "isFollowed" : response.data.data["isFollowed"]
        }

        return res
    }
    catch(error){
        throw error
    }
}