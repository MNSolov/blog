import { Link, useNavigate } from 'react-router-dom'
import React, { ChangeEvent, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { loginUser } from '../../redux/actions'

import './form.scss'

interface IFormInput {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
    clearErrors,
  } = useForm<IFormInput>()

  const { error, isAuthority } = useAppSelector((state: RootState) => state.state)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthority) navigate('/')
  }, [])

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const user: LoginUser = {
      user: {
        email: data.email,
        password: data.password,
      },
    }

    loginUser(user, navigate, '/')
  }

  const oChangeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const regexp = /[a-z0-9._-]+@[a-z0-9_-]+\.\b[a-z]{2}\b/
    if (!regexp.test(event.target.value)) {
      setError('email', { type: 'pattern' })
    } else {
      clearErrors('email')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__header">Sign In</h2>
      <label htmlFor="email" className="form__label">
        Email addres
        <input
          id="email"
          className="form__input"
          type="email"
          placeholder="Email addres"
          {...register('email', { required: true, pattern: /[a-z0-9._-]+@[a-z0-9_-]+\.\b[a-z]{2}\b/ })}
          onChange={(event) => oChangeEmailHandler(event)}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
        {errors.email?.type === 'pattern' && (
          <p className="form__error" role="alert">
            E-mail указан некорректно
          </p>
        )}
      </label>
      <label htmlFor="inputPassword" className="form__label">
        Password
        <input
          id="inputPassword"
          className="form__input"
          type="password"
          placeholder="Password"
          {...register('password', { required: true, minLength: 6, maxLength: 40 })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
        {errors.password?.type === 'minLength' && (
          <p className="form__error" role="alert">
            Пароль должен содержать минимум 6 символов
          </p>
        )}
        {errors.password?.type === 'maxLength' && (
          <p className="form__error" role="alert">
            Пароль не должен быть больше 40 символов
          </p>
        )}
      </label>
      <div>
        <input className="form__button" type="submit" value="Login" />
        <p className="form__text">
          Already have an account?
          <Link to="/sign-up" className="form__link">
            {' Sign Up'}
          </Link>
        </p>
      </div>
      {error.from === 'loginUser' && (
        <p className="form__error" role="alert">
          {error.status}
        </p>
      )}
    </form>
  )
}
