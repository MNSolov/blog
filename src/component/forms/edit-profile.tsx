import React, { useEffect } from 'react'
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
  } = useForm<IFormInput>()

  const { error } = useAppSelector((state: RootState) => state.state)

  useEffect(() => {
    setFocus('firstName')
  }, [setFocus])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.email !== '' || data.avatarImage !== '' || data.firstName !== '' || data.password !== '') {
      const imageData = data.avatarImage === '' ? null : data.avatarImage
      const user: EditUser = {
        user: {
          email: data.email,
          password: data.password,
          username: data.firstName,
          image: imageData,
        },
      }

      editUser(user)

      console.log(data)
    } else {
      setError('firstName', { type: 'required', message: 'Хотя бы одно поле должно быть заполнено' })
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__header">Edit Profile</h2>
      <label htmlFor="inputName" className="form__label">
        Username
        <input
          id="inputName"
          className="form__input"
          type="input"
          placeholder="Username"
          {...register('firstName', { minLength: 3, maxLength: 20 })}
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
          {...register('email', { pattern: /[a-z0-9._-]@[a-z0-9_-].[a-z0-9,2]+/ })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p role="alert">{errors.email.type}</p>}
      </label>
      <label htmlFor="inputPassword" className="form__label">
        New password
        <input
          id="inputPassword"
          className="form__input"
          type="password"
          placeholder="New password"
          {...register('password', { minLength: 6, maxLength: 40 })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
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
          {...register('avatarImage')}
          aria-invalid={errors.avatarImage ? 'true' : 'false'}
        />
      </label>
      <input className="form__button" type="submit" value="Save" />
      {error.from === 'editUser' && (
        <p className="form__error" role="alert">
          {error.status}
        </p>
      )}
      {errors.firstName?.type === 'required' && (
        <p className="form__error" role="alert">
          {errors.firstName?.message}
        </p>
      )}
    </form>
  )
}
