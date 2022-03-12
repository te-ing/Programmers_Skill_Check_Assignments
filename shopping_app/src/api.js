import { API_KEY } from "../secretKey"

const API_END_POINT = API_KEY

export const request = async (url="") => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`)

    if(!res.ok) {
      throw new Error('API Call Fail')
    }

    return await res.json()
  } catch(e) {
    alert(e.message)
  }
}
