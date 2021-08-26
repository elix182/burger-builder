import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-55aa1-default-rtdb.firebaseio.com'
});

export default instance;