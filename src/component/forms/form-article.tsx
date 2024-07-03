import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { createArticle, updateArticle } from '../../redux/actions'
import { ArticleProps } from '../../redux/reducer'

import './form.scss'

interface Props {
  createNewArticle: boolean
}

interface IFormInput {
  title: string
  description: string
  text: string
  tag: string[]
}

interface TagInput {
  tag: JSX.Element
  id: number
}

export default function FormArticle({ createNewArticle }: Props) {
  const {
    register,
    unregister,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const { error, isAuthority } = useAppSelector((state: RootState) => state.state)
  const navigate = useNavigate()
  const initState: TagInput[] = []

  const [tagInputs, setTags] = useState(initState)
  const [emptyTagError, setEmptyTagError] = useState('')
  const count = useRef(0)

  useEffect(() => {
    if (!isAuthority) navigate('/sign-in')
  })

  const { slug } = useParams()

  const { articlesArray } = useAppSelector((state: RootState) => state.state.articles)

  const articleEdit = articlesArray.find((item: ArticleProps) => item.slug === slug)

  const title: undefined | string = typeof articleEdit !== 'undefined' ? articleEdit.title : undefined
  const description: undefined | string = typeof articleEdit !== 'undefined' ? articleEdit.description : undefined
  const body: undefined | string = typeof articleEdit !== 'undefined' ? articleEdit.body : undefined

  const header = createNewArticle ? 'Create new article' : 'Edit article'

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (getValues(`tag.${count.current}`) === '') {
      setEmptyTagError('Заполните это поле или удалите')
      return
    }
    const article: Article = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
      },
    }

    if (typeof data.tag !== 'undefined') {
      article.article.tagList = [...data.tag]
    }
    if (createNewArticle) {
      createArticle(article, navigate, '/')
    } else {
      updateArticle(article, slug, navigate, '/')
    }
  }

  const onDeleteInputTag = (index: number) => {
    return () => {
      setTags((value) => {
        let result: TagInput[] = []
        const number = value.findIndex((item) => item.id === index)

        if (number > -1) {
          result = [...value.slice(0, number), ...value.slice(number + 1)]
          unregister(`tag.${index}`)

          if (number === value.length - 1) {
            if (getValues(`tag.${count.current}`) !== '') {
              setEmptyTagError('')
            }
          }
        } else {
          result = [...value]
        }
        return result
      })
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setEmptyTagError('')
    }
    if (event.target.value.length > 20) {
      setEmptyTagError('Должно быть не больше 20 символов')
    }
    if (event.target.value.length === 0) {
      setEmptyTagError('Все поля должны быть заполнены')
    }
  }

  const createInputTag = (id: number, item?: string) => {
    const onDeleteWithIndex = onDeleteInputTag(id)
    return {
      id,
      tag: (
        <li key={id} className="form__tags-list-item">
          <input
            id="inpuTags"
            className="form__input form__input--small"
            type="input"
            placeholder="Tag"
            {...register(`tag.${id}`, { required: true, value: item, maxLength: 20 })}
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            type="button"
            className="form__delete-tag"
            onClick={() => {
              onDeleteWithIndex()
            }}
          >
            Delete tag
          </button>
        </li>
      ),
    }
  }

  const newTagsInput: TagInput[] = []

  useEffect(() => {
    if (newTagsInput.length === 0) {
      articleEdit?.tagList.forEach((item: string) => {
        if (String(item) !== 'null') {
          count.current += 1
          newTagsInput.push(createInputTag(count.current, item))
        }
      })
      setTags(newTagsInput)
    }
  }, [])

  const onAddButtonClick = () => {
    if (getValues(`tag.${count.current}`) !== '') {
      setEmptyTagError('')
      count.current += 1
      setTags((value) => {
        const result = [...value, createInputTag(count.current)]

        return result
      })
    } else {
      setEmptyTagError('Заполните это поле, прежде чем добавлять новое')
    }
  }

  const arrayTagInputs = tagInputs.map((item) => item.tag)

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__header">{header}</h2>
      <label htmlFor="inpuTitle" className="form__label">
        Title
        <input
          id="inputTitle"
          className="form__input form__input--large"
          type="input"
          placeholder="Title"
          {...register('title', { required: true, value: title, maxLength: 100 })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
        {errors.title?.type === 'maxLength' && (
          <p className="form__error" role="alert">
            Должно быть больше 100 символов
          </p>
        )}
      </label>
      <label htmlFor="inpuDescription" className="form__label">
        Description
        <input
          id="inpuDescription"
          className="form__input form__input--large"
          type="input"
          placeholder="Description"
          {...register('description', { required: true, value: description, maxLength: 100 })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.description?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
        {errors.description?.type === 'maxLength' && (
          <p className="form__error" role="alert">
            Должно быть больше 100 символов
          </p>
        )}
      </label>
      <label htmlFor="inputText" className="form__label">
        Text
        <textarea
          id="inputText"
          className="form__textarea"
          placeholder="Text"
          {...register('text', { required: true, value: body })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.text?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
          </p>
        )}
      </label>
      <div className="form__label">
        Tags
        <ul className="form__tags-list">
          {arrayTagInputs}
          <button type="button" className="form__add-tag" onClick={onAddButtonClick}>
            Add tag
          </button>
          {emptyTagError !== '' && (
            <p className="form__error form__error--left" role="alert">
              {emptyTagError}
            </p>
          )}
        </ul>
      </div>
      <input className="form__button form__button--left" type="submit" value="Send" />
      {(error.from === 'createArticle' || error.from === 'updateArticle') && (
        <p className="form__error" role="alert">
          {error.status}
        </p>
      )}
    </form>
  )
}
