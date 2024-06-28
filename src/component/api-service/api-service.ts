export default class ApiService {
  getArticles

  getArticleBySlug

  createNewUser

  loginUser

  editUser

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

    this.createNewUser = async (user: User) => {
      const url = new URL('users', 'https://blog.kata.academy/api/')

      const responce = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (responce.ok) {
        const result = responce.json()
        return result
      }

      if (responce.status === 500) {
        throw new TypeError('Не удалось зарегистрировать пользователя. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось зарегистрировать пользователя')
      }
      throw new TypeError(String(responce.json()))
    }

    this.loginUser = async (user: LoginUser) => {
      const url = new URL('users/login', 'https://blog.kata.academy/api/')

      const responce = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (responce.ok) {
        const result = responce.json()
        return result
      }

      if (responce.status === 500) {
        throw new TypeError('Не удалось авторизовать пользователя. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось авторизовать пользователя. Проверьте логин и пароль')
      }
      throw new TypeError(String(responce.json()))
    }

    this.editUser = async (user: string) => {
      const url = new URL('user', 'https://blog.kata.academy/api/')

      const token = `Token ${sessionStorage.getItem('token')}`

      const responce = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: user,
      })

      if (responce.ok) {
        const result = responce.json()
        return result
      }

      if (responce.status === 500) {
        throw new TypeError('Не удалось сохранить изменения. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось  сохранить изменения')
      }
      if (responce.status === 401) {
        throw new TypeError(String(responce.status))
      }
      throw new TypeError(String(responce.json()))
    }
  }
}
