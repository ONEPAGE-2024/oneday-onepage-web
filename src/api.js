import axios from "axios";

const BASE_URL = "http://10.80.162.25:8080";

// 일기 목록 가져오기
export const fetchPosts = () => {
  return axios.get(`${BASE_URL}/diary/list`).then((res) => res.data);
};

// 일기 상세 정보 가져오기
export const fetchPost = (id) => {
  return axios.get(`${BASE_URL}/diary/${id}`);
};

// 일기 수정
export const updatePost = (id, updatedDiary) => {
  return axios.put(`${BASE_URL}/diary/update/${id}`, updatedDiary, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 일기 작성
export const createPost = async (post) => {
  try {
    const response = await axios.post(`${BASE_URL}/diary/create`, post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// 글 삭제
export const deletePost = (id, password) => {
  return axios.delete(`${BASE_URL}/diary/delete/${id}`, {
    data: { password },
    headers: {
      "Content-Type": "application/json",
    },
  });
};
