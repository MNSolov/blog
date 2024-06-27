import { Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import React, { ChangeEvent, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { RootState } from '../../redux/store'
import { useAppSelector } from '../../redux/hooks'
import './form.scss'
import { createNewUser } from '../../redux/actions'

interface IFormInput {
  firstName: string
  email: string
  password: string
  repeatPassword: string
  checkBox: boolean
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
    setError,
    getValues,
    clearErrors,
  } = useForm<IFormInput>({
    defaultValues: {
      checkBox: false,
    },
  })

  const { error } = useAppSelector((state: RootState) => state.state)

  useEffect(() => {
    setFocus('firstName')
  }, [setFocus])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', { type: 'validate', message: 'Пароли не совпадают' }, { shouldFocus: true })
      return
    }

    const user: User = {
      user: {
        username: data.firstName,
        email: data.email,
        password: data.password,
      },
    }

    createNewUser(user)
  }

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const password = getValues('password')

    if (password !== event.target.value) {
      setError('repeatPassword', { type: 'validate', message: 'Пароли не совпадают' }, { shouldFocus: true })
    } else {
      clearErrors('repeatPassword')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__header">Create a new account</h2>
      <label htmlFor="inputName" className="form__label">
        Username
        <input
          id="inputName"
          className="form__input"
          type="input"
          placeholder="Username"
          {...register('firstName', { required: true, minLength: 3, maxLength: 20 })}
          aria-invalid={errors.firstName ? 'true' : 'false'}
        />
        {errors.firstName?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
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
          {...register('email', { required: true, pattern: /[a-z0-9._-]@[a-z0-9_-].[a-z0-9,2]+/ })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p role="alert">{errors.email.type}</p>}
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
      <label htmlFor="repeatPassword" className="form__label">
        Repeat Password
        <input
          id="repeatPassword"
          className="form__input"
          type="password"
          placeholder="Password"
          {...register('repeatPassword', { required: true, minLength: 6, maxLength: 40 })}
          aria-invalid={errors.repeatPassword ? 'true' : 'false'}
          onChange={(event) => onChangeHandle(event)}
        />
        {errors.repeatPassword?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
        {errors.repeatPassword?.type === 'minLength' && (
          <p className="form__error" role="alert">
            Пароль должен содержать минимум 6 символов
          </p>
        )}
        {errors.repeatPassword?.type === 'maxLength' && (
          <p className="form__error" role="alert">
            Пароль не должен быть больше 40 символов
          </p>
        )}
        {errors.repeatPassword?.message && (
          <p className="form__error" role="alert">
            {errors.repeatPassword.message}
          </p>
        )}
      </label>
      <Controller
        name="checkBox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          const { name, value, onChange, ref } = field
          return (
            <div>
              <Checkbox className="form__checkbox" name={name} checked={value} onChange={onChange} ref={ref}>
                I agree to processing of my personal information
              </Checkbox>
              {errors.checkBox?.type === 'required' && (
                <p className="form__error" role="alert">
                  Подтвердите свое согласие на обработку персональных данных
                </p>
              )}
            </div>
          )
        }}
      />
      <div>
        <input className="form__button" type="submit" value="Create" />
        <p className="form__text">
          Already have an account?
          <Link to="/sign-in" className="form__link">
            {' Sign In'}
          </Link>
        </p>
      </div>
      {error.from === 'createNewUser' && (
        <p className="form__error" role="alert">
          {error.status}
        </p>
      )}
    </form>
  )
}
