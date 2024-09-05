import axios from 'axios'

export const doGet = async (endpoint: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${endpoint}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error:', error.response.data);
      throw new Error(`Error: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred during the request.');
    }
  }
};

const apiUrl = 'http://127.0.0.1:8000/api';

export const doPost = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
};

export const doPostUser = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${apiUrl}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error:', error.response.data);
      throw new Error(`Error: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred during the request.');
    }
  }
};

export const doDelete = async (endpoint: string, id: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error:', error.response.data);
      throw new Error(`Error: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred during the request.');
    }
  }
};

export const doPut = async (endpoint: string, id: string, data: any) => {
  try {
    const response = await axios.put(`${apiUrl}/${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error:', error.response.data);
      throw new Error(`Error: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred during the request.');
    }
  }
};

export const doLogin = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${apiUrl}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server error:', error.response.data);
      throw new Error(`Error: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred during the request.');
    }
  }
};
