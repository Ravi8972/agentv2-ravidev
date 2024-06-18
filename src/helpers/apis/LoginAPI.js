
import BaseUrl from "./BaseUrl";

export const APILoginUser = async (code, password) => {
    try {
      const res = await BaseUrl.post('/api/agent/login', {
        "unique_code":code, "password":password
      });
      console.log(res);
      if (res.status === 200) {
        if (res.data && res.data.status && res.data.token) {
          return res.data;
        }
      }
    } catch (e) {
      console.log(e)
      if (e.response) {
        if (e.response.status === 500) {
          return 'serverError'
        } else if (e.response.status === 422) {
          return 'wrongAgentCode'
        } else if (e.response.status === 402) {
          return 'passwordDoesNotMatch'
        }else if (e.response.status === 401) {
          return 'validationError'
        } else {
          console.log(e)
        }
      }
    }
    return null;
  }