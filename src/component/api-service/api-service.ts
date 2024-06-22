export default class ApiService {
  getArticles

  constructor() {
    this.getArticles = async () => {
      const url = new URL('articles', 'https://blog.kata.academy/api/')
      const responce = await fetch(url)
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      throw new TypeError(responce.statusText)
    }
  }
}
