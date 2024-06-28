import React, { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import './form.scss'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { editUser } from '../../redux/actions'

interface IFormInput {
  firstName: string
  email: string
  password: string
  avatarImage: string
}

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
    clearErrors,
  } = useForm<IFormInput>()

  const { error, isAuthority } = useAppSelector((state: RootState) => state.state)
  const { username, image, email } = useAppSelector((state: RootState) => state.state.user)

  const navigate = useNavigate()

  useEffect(() => {
    setFocus('firstName')
  }, [setFocus])

  useEffect(() => {
    if (!isAuthority) navigate('/')
  }, [])

  const oChangeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const regexp = /[a-z0-9._-]+@[a-z0-9_-]+\.\b[a-z]{2}\b/
    if (!regexp.test(event.target.value)) {
      setError('email', { type: 'pattern' })
    } else {
      clearErrors('email')
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let userString = '{"user":{'
    if (data.email !== email && data.email !== '') {
      userString += `"email":"${data.email}",`
    }
    if (data.firstName !== username && data.firstName !== '') {
      userString += `"username":"${data.firstName}",`
    }
    if (data.avatarImage !== image) {
      userString += `"image":"${data.avatarImage}",`
    }
    userString += `"password":"${data.password}"}}`

    console.log(userString)

    editUser(userString, navigate, '/')
  }

  const form = (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__header">Edit Profile</h2>
      <label htmlFor="inputName" className="form__label">
        Username
        <input
          id="inputName"
          className="form__input"
          type="input"
          placeholder="Username"
          {...register('firstName', { value: username, minLength: 3, maxLength: 20 })}
          aria-invalid={errors.firstName ? 'true' : 'false'}
        />
        {errors.firstName?.type === 'minLength' && (
          <p className="form__error" role="alert">
            Имя должно содержать минимум 3 символа
          </p>
        )}
        {errors.firstName?.type === 'maxLength' && (
          <p className="form__error" role="alert">
            Имя не должно быть больше 20 символов
          </p>
        )}
      </label>
      <label htmlFor="inputEmail" className="form__label">
        Email address
        <input
          id="inputEmail"
          className="form__input"
          type="email"
          placeholder="Email address"
          {...register('email', {
            value: email,
            pattern: /[a-z0-9._-]+@[a-z0-9_-]+\.\b[a-z]{2}\b/,
          })}
          onChange={(event) => oChangeEmailHandler(event)}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email?.type === 'pattern' && (
          <p className="form__error" role="alert">
            E-mail указан некорректно
          </p>
        )}
      </label>
      <label htmlFor="inputPassword" className="form__label">
        New password
        <input
          id="inputPassword"
          className="form__input"
          type="password"
          placeholder="New password"
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
      <label htmlFor="Avatar" className="form__label">
        Avatar image (url)
        <input
          id="Avatar"
          className="form__input"
          type="input"
          placeholder="Avatar image"
          {...register('avatarImage', { value: image })}
          aria-invalid={errors.avatarImage ? 'true' : 'false'}
        />
      </label>
      <input className="form__button" type="submit" value="Save" />
      {error.from === 'editUser' && (
        <p className="form__error" role="alert">
          {error.status}
        </p>
      )}
    </form>
  )

  const result = isAuthority ? form : null

  return result
}
