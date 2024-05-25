import axios from 'axios';

const baseUrl = 'https://swapi.dev/api';

export const fetchFilmsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/films`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getFilmDetails = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/films/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching film details:', error);
      throw error;
    }
  };

  export const getCharactersList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/people`);
      return response.data;
    } catch (error) {
      console.error('Error fetching film details:', error);
      throw error;
    }
  }

  export const getcharacterDetails = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/people/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching film details:', error);
      throw error;
    }
  }

