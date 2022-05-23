import axios from 'axios'

export let axiosClient = axios.create({
  baseURL: process.env.API_URI,
})

// axiosClient.defaults.withCredentials = true

class API {
  async CALL({ method, url, data = null }) {
    try {
      const response = await axiosClient({
        url,
        method,
        data,
        // headers
      })

      return response
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 로그인 쿠키 제거
        // authClient.removeCookie();
        // location.href = '/error/errorAuth';
      }

      console.error('# client-error-axios: ', error)
      return error.response
    }
  }

  GET(url) {
    return this.CALL({
      method: 'GET',
      url,
    })
  }

  POST({ url, ...params }) {
    return this.CALL({
      method: 'POST',
      url,
      ...params,
    })
  }

  PUT({ url, ...params }) {
    return this.CALL({
      method: 'PUT',
      url,
      ...params,
    })
  }

  DELETE({ url, ...params }) {
    return this.CALL({
      method: 'DELETE',
      url,
      ...params,
    })
  }

  PATCH({ url, ...params }) {
    return this.CALL({
      method: 'PATCH',
      url,
      ...params,
    })
  }
}

export default new API()
