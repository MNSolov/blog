export default class ApiService {
  getArticles

  constructor() {
    this.getArticles = async (numberPage: number, limit: number) => {
      const url = new URL('articles', 'https://blog.kata.academy/api/')
      url.searchParams.set('limit', String(limit))
      url.searchParams.set('offset', String(limit * numberPage))
      const responce = await fetch(url)
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      throw new TypeError(responce.statusText)
    }
  }
}
