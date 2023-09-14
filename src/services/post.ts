import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;


export const createPost = async (accessToken:string | undefined , postData:any) => {
  
  try {
    const response = await axios({
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      url: `${API_BASE_URL}/post/createPost`,
      data: postData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updatePost = async (accessToken: string | undefined , postId :string | string[], updatedData:any) => {
    try {
      const response = await axios({
        method: 'post', 
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        url: `${API_BASE_URL}/post/updatePost?post_id=${postId}`,
        data: updatedData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export const getAllPostsbyUserId = async (accessToken: string | undefined |null, userId: string) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/post/getAllPost?user_id=${userId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getAllSavePostsbyUserId = async (accessToken: string | undefined |null) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/post/userSavedPostsList`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllPosts = async (accessToken:string|undefined|null, limit:number, skip:number) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/post/getAllPost?limit=${limit}&skip=${skip}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const getPostsByBlogId = async (accessToken:String|undefined,blogId:string |string[]) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/post/getAllPost?blog_id=${blogId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  export const getTrendingPosts = async (accessToken:string|undefined|null, limit:number, skip:number) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/post/getTrandingPost?limit=${limit}&skip=${skip}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


export const dislikePost = async (accessToken: string | undefined, postId: string | string[] | undefined) => {
  try {
    const response = await axios({
      method: 'post', 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/post/dislikePost`,
      data: {
        post_id: postId, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const likePost = async (accessToken: string | undefined, postId: string | string[] | undefined) => {
  try {
    const response = await axios({
      method: 'post', 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/post/likePost`, 
      data: {
        post_id: postId, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const savePost = async (accessToken: string | undefined, postId: string | string[] | undefined) => {
  try {
    const response = await axios({
      method: 'post', 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/post/savePostUser`, 
      data: {
        post_id: postId, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unsavePost = async (accessToken: string | undefined, postId: string | string[] | undefined) => {
  try {
    const response = await axios({
      method: 'post', 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/post/unSavePostUser`, 
      data: {
        post_id: postId, 
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllCategory = async (accessToken: string | undefined | null) => {
  try {
    const response = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/post/getBlogCategory`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostsByCategory = async (
  accessToken: string | undefined | null,
  category: string
) => {
  try {
    const response = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/post/getAllPost?category_name=${category}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};