import api from "@/api/api"

import { ICreateAssistant } from "@/models/assistance.model"
import { AxiosResponse } from "axios"

export const findAllAssistance = async (): Promise<AxiosResponse> => {
  try {
    const res = await api.get("/assistance")
    console.log(res)
    return res
  } catch (error: any) {
    return error
  }
}

export const addAssistance = async (data: ICreateAssistant) => {
  try {
    const res = await api.post("/assistance/add", data)
    console.log(res)
    return res
  } catch (error) {
    return error
  }
}

