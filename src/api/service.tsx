import axios from 'axios';
import { useQuery } from 'react-query';

const BASE_URL = 'https://rickandmortyapi.com/api';

const fetchCharacters = async (page) => {
  const { data } = await axios.get(`${BASE_URL}/character?page=${page}`);
  return data;
};

export const useCharacters = (page) => {
  return useQuery(['characters', page], () => fetchCharacters(page));
};
