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
    username: string
    email: string
    password: string
    image: string | null
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
