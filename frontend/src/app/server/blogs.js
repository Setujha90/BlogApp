import axios from "axios";

const url = "http://localhost:8000/api/v1/blog";
// const url = "https://blogapp-4fjb.onrender.com/api/v1/blog"

let isViewedCalled = false;

export const getAllBlogs = async () => {
  const response = await axios.get(url);
  const blogs = response.data.data["blogs"];

  return blogs;
};

export const createBlog = async (title, description, content, status, thumbnail) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("status", status);
    formData.append("thumbnail", thumbnail);
    console.log(thumbnail);
    const response = await axios.post(`${url}/create`, formData , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    const res = {
      _id: response.data.data["blog"]._id,
      user: response.data.data["user"],
    };
    return res;
  } catch (error) {
    throw error;
  }
};

export const uploadThumbnail = async (id, thumbnail) => {
  try {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const response = await axios.patch(`${url}/${id}/thumbnail`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data.data["thumbnail"];
  } catch (error) {
    throw error;
  }

}

export const uploadBlogImage = async (id, image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.patch(`${url}/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data.data["image"];
  } catch (error) {
    throw error;
  }

}

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`, {
      withCredentials: true,
    });

    return response.data.data["user"];
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (id, title, description) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    const response = await axios.patch(`${url}/${id}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const likeBlog = async (id) => {
  try {
    const response = await axios.post(
      `${url}/${id}/like`,
      {},
      { withCredentials: true }
    );

    const res = {
      blog: response.data.data["blog"],
      liked: response.data.data["likedDocument"],
      user: response.data.data["userLikedBlogs"],
    };

    return res;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);

    return response.data.data["blog"];
  } catch (error) {
    throw error;
  }
};


export const viewBlog = async (id) => {
  if(!isViewedCalled){
    try {
      isViewedCalled = true;
      const response = await axios.post(
        `${url}/${id}/view`, 
        {},
        { withCredentials: true }
      );
  
      return response.data.data["blog"];
    } catch (error) {
      throw error;
    } finally{
      setTimeout(function () {
        isViewedCalled = false;
      }, 1000);
    }
  }
}

// export function limiter(fn, wait) {
//   let isCalled = false;

//   return async function (...args) {
//       if (!isCalled) {
//           isCalled = true;
//           try {
//               const response = await fn(...args);
//               return response;
//           } catch (error) {
//               // Handle errors here if needed
//               console.error(error);
//           } finally {
//               setTimeout(function () {
//                   isCalled = false;
//               }, 5000);
//           }
//       }
//       else{
//         console.log("Abhi to run h bhai kya kr rha h")
//       }
//   };
// }

// export const viewBlog = async(id) => {
//   const wrapper = limiter(viewBlogById, 2000)
//   const data = await wrapper(id);
//   return data;
// };

export const comment = async (id, content) => {
  try {
    const response = await axios.post(
      `${url}/${id}/comment`,
      { content: content },
      { withCredentials: true }
    );

    return response.data.data["comment"];
  } catch (error) {
    throw error;
  }
};

export const serachBlog = async (query, tag) => {
  try {
    const response = await axios.get(`${url}/filter?title=${query}&tag=${tag}`);

    return response.data.data["blogs"];
  } catch (error) {
    throw error;
  }
};
