import axios, { AxiosError, AxiosResponse } from "axios"
import api from "../api"

const authUser = async (password: string, document: string) => {
  try {
    const response = await axios.post('https://medieval-danika-breaper03-f5d6aaef.koyeb.app/auth/login', { password, document });
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciales invalidas.'); 
    }
    throw new Error('Ocurrio un error al iniciar sesion');
  }
};

export {
  authUser
}