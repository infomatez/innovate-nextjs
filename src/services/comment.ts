import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;



export const commentOnPost = async (accessToken: string | undefined, content:string, postId:string | string[] | undefined) => {
    try {
      const response = await axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/comment/commentOnPost`,
        data: {
          content,
          post: postId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };



  export const fetchAllCommentsForPost = async (accessToken: string | undefined, postId:string | string[] | undefined) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/comment/PostAllComments?post_id=${postId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  export const likePostComment = async (accessToken: string | undefined, commentId:string | string[] | undefined) => {
    try {
      const response = await axios({
        method: 'put',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/comment/likePostComment?comment_id=${commentId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


  export const dislikePostComment = async (accessToken: string | undefined, commentId:string | string[] | undefined) => {
    try {
      const response = await axios({
        method: 'put', 
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/comment/DislikePostComment?comment_id=${commentId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  export const deleteComment = async (accessToken: string | undefined, commentId:string | string[] | undefined) => {
    try {
      const response = await axios({
        method: 'delete', 
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/comment/deleteComment?comment_id=${commentId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  