import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../loader'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { createArticle, getArticleBySlug, updateArticle } from '../../redux/actions'
import { ArticleProps } from '../../redux/reducer'
import Error from '../error'
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
  }, [])

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

  const onDelete = (index: number) => {
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
  }

  const onAddButtonClick = () => {
    if (getValues(`tag.${count.current}`) !== '') {
      setEmptyTagError('')
      count.current += 1
      setTags((value) => {
        const onDeleteWithIndex = onDelete(count.current)
        const newElem: TagInput = {
          id: count.current,
          tag: (
            <li key={count.current} className="form__tags-list-item">
              <input
                id="inpuTags"
                className="form__input form__input--small"
                type="input"
                placeholder="Tag"
                {...register(`tag.${count.current}`)}
                onChange={(event) => onChangeHandler(event)}
                aria-invalid={errors.title ? 'true' : 'false'}
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
        const result = [...value, newElem]

        return result
      })
    } else {
      setEmptyTagError('Заполните это поле, прежде чем добавлять новое')
    }
  }

  const newTagsInput: TagInput[] = []
  articleEdit?.tagList.forEach((item: string) => {
    count.current += 1
    const onDeleteWithIndex = onDelete(count.current)
    if (String(item) !== 'null') {
      newTagsInput.push({
        id: count.current,
        tag: (
          <li key={count.current} className="form__tags-list-item">
            <input
              id="inpuTags"
              className="form__input form__input--small"
              type="input"
              placeholder="Tag"
              {...register(`tag.${count.current}`, { value: item })}
              onChange={(event) => onChangeHandler(event)}
              aria-invalid={errors.title ? 'true' : 'false'}
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
      })
    }
  })

  useEffect(() => {
    setTags(newTagsInput)
  }, [])

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
          {...register('title', { required: true, value: title })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
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
          {...register('description', { required: true, value: description })}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.description?.type === 'required' && (
          <p className="form__error" role="alert">
            Это поле должно быть заполнено
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
      {error.from === 'createArticle' && (
        <p className="form__error" role="alert">
          {error.status}
        </p>
      )}
    </form>
  )
}
