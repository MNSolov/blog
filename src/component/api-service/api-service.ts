export default class ApiService {
  getArticles

  getArticleBySlug

  createNewUser

  loginUser

  editUser

  createArticle

  deleteArticle

  updateArticle

  setLike

  deleteLike

  constructor() {
    this.getArticles = async (numberPage: number, limit: number) => {
      const url = new URL('articles', 'https://blog.kata.academy/api/')

      url.searchParams.set('limit', String(limit))
      url.searchParams.set('offset', String(limit * (numberPage || 0)))

      let responce: Response
      let token = ''

      if (sessionStorage.getItem('token')) {
        token = `Token ${sessionStorage.getItem('token')}`

        responce = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        })
      } else {
        responce = await fetch(url)
      }

      if (responce.ok) {
        const result = responce.json()
        return result
      }
      throw new TypeError(String(responce.status))
    }

    this.getArticleBySlug = async (slug: string) => {
      const url = new URL(`articles/${slug}`, 'https://blog.kata.academy/api/')

      let responce: Response
      let token = ''

      if (sessionStorage.getItem('token')) {
        token = `Token ${sessionStorage.getItem('token')}`

        responce = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        })
      } else {
        responce = await fetch(url)
      }

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
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
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
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
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
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
    }

    this.createArticle = async (article: Article) => {
      const url = new URL('articles', 'https://blog.kata.academy/api/')

      const token = `Token ${sessionStorage.getItem('token')}`

      const responce = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      })
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      if (responce.status === 500) {
        throw new TypeError('Не удалось создать статью. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось создать статью')
      }
      if (responce.status === 401) {
        throw new TypeError(String(responce.status))
      }
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
    }

    this.deleteArticle = async (slug: string) => {
      const url = new URL(`articles/${slug}`, 'https://blog.kata.academy/api/')

      const token = `Token ${sessionStorage.getItem('token')}`

      const responce = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      })
      if (responce.status === 204) {
        return
      }
      if (responce.status === 500) {
        throw new TypeError('Не удалось удалить статью. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось удалить статью')
      }
      if (responce.status === 401) {
        throw new TypeError(String(responce.status))
      }
      if (responce.status === 404) {
        throw new TypeError('Страница не найдена')
      }
      throw new TypeError('Что-то пошло не так')
    }

    this.updateArticle = async (article: Article, slug: string | undefined) => {
      const url = new URL(`articles/${slug}`, 'https://blog.kata.academy/api/')

      const token = `Token ${sessionStorage.getItem('token')}`

      const responce = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      })
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      if (responce.status === 500) {
        throw new TypeError('Не удалось обновить статью. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось обновить статью')
      }
      if (responce.status === 401) {
        throw new TypeError(String(responce.status))
      }
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
    }

    this.setLike = async (slug: string) => {
      const url = new URL(`articles/${slug}/favorite`, 'https://blog.kata.academy/api/')

      const token = `Token ${sessionStorage.getItem('token')}`

      const responce = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
      })
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      if (responce.status === 500) {
        throw new TypeError('Не удалось создать статью. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось создать статью')
      }
      if (responce.status === 401) {
        throw new TypeError(String(responce.status))
      }
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
    }

    this.deleteLike = async (slug: string) => {
      const url = new URL(`articles/${slug}/favorite`, 'https://blog.kata.academy/api/')

      const token = `Token ${sessionStorage.getItem('token')}`

      const responce = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      })
      if (responce.ok) {
        const result = responce.json()
        return result
      }
      if (responce.status === 500) {
        throw new TypeError('Не удалось создать статью. Ошибка сервера')
      }
      if (responce.status === 422) {
        throw new TypeError('Не удалось создать статью')
      }
      if (responce.status === 401) {
        throw new TypeError(String(responce.status))
      }
      if (responce.status === 404) {
        throw new TypeError('Неправильный запрос')
      }
      throw new TypeError('Что-то пошло не так')
    }
  }
}
