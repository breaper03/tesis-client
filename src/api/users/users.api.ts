import api from "@/api/api"
import { AxiosResponse } from "axios"

export const findByDocument = async (document: string) => {
  try {
    const res = await api.get(`users/doc/${document}`)
    console.log(res)
    return res
  } catch (error) {
    return error
  }
}

export const findAllUsers = async (): Promise<AxiosResponse<any, any>> => {
  try {
    const res = await api.get("users")
    return res
  } catch (error: any) {
    return error
  }
}