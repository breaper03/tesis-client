import api from "@/api/api"

import { ICreateAssistant } from "@/models/assistance.model"

export const post = async (data: ICreateAssistant) => {
  try {
    const res = await api.post("/assistance/add", data)
    console.log(res)
    return res
  } catch (error) {
    return error
  }
}

