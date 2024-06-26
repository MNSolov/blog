export default class ApiService {
  getArticles

  getArticleBySlug

  constructor() {
    this.getArticles = async (numberPage: number, limit: number) => {
      const url = new URL('articles', 'https://blog.kata.academy/api/')
      url.searchParams.set('limit', String(limit))
      url.searchParams.set('offset', String(limit * (numberPage || 0)))
      const responce = await fetch(url)
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      throw new TypeError(String(responce.status))
    }

    this.getArticleBySlug = async (slug: string) => {
      const url = new URL(`articles/${slug}`, 'https://blog.kata.academy/api/')

      const responce = await fetch(url)

      if (responce.ok) {
        const result = responce.json()
        return result
      }
      throw new TypeError(String(responce.status))
    }
  }
}
