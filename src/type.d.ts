declare interface User {
  user: {
    username: string
    email: string
    password: string
  }
}

declare interface LoginUser {
  user: {
    email: string
    password: string
  }
}

declare interface EditUser {
  user: {
    email?: string
    image?: string
    username?: string
    password: string
  }
}

declare interface Article {
  article: {
    title: string
    description: string
    body: string
    tagList?: string[]
  }
}

declare interface ResponseCreateUser {
  user: {
    email: string
    image: null | string
    token: string
    username: string
  }
}

declare interface ErrorResponseCreateUser {
  body: string[]
}
