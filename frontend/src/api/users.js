import axios from 'axios';  // axios를 import

const API_URL = 'http://localhost:3000/api/users';  // replace when Django ready

export const getUsers = () => axios.get('/api/users');  // insert apis here haha