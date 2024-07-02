import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { message, Popconfirm, PopconfirmProps } from 'antd'

import Tags from '../tag'
import Like from '../like'
import './article.scss'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { deleteArticle, ErrorClear } from '../../redux/actions'

import defaultAvatar from './assets/Avatar.svg'

interface ArticleProps {
  author: {
    following: boolean
    image: string
    username: string
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: Array<string | null>
  title: string
  updatedAt: string
}

interface Props {
  article: ArticleProps
  isLarge: boolean
}

function textClamp(text: string, symbols: number): string {
  let result = text

  if (typeof text === 'undefined') return ''

  if (result.length > symbols) {
    const words: string[] = text.split(/\s/g)
    result = ''
    if (words.length === 1 && words[0].length > symbols) {
      for (let i = 0; i < symbols; i += 1) {
        result += words[0][i]
      }
    } else {
      let i = 0
      while (result.length + words[i].length < symbols) {
        result += `${words[i]} `
        i += 1
      }
      result = result.trim()
    }
    result += '...'
  }
  return result
}

export default function Article({ article, isLarge }: Props) {
  const { user, error, isAuthority } = useAppSelector((state: RootState) => state.state)
  const navigate = useNavigate()

  const imageSrc = article.author.image
  const classeCard: string[] = []
  classeCard.push('article-card')

  let articleText = null

  const tagListClamp: string[] = []

  if (article.tagList.length > 0) {
    article.tagList.forEach((item) => {
      if (typeof item === 'string') {
        tagListClamp.push(textClamp(item, 20))
      }
    })
  }

  if (isLarge) {
    classeCard.push('article-card--large')
    articleText = (
      <section className="article-card__text">
        <Markdown className="article-card__text">{article.body}</Markdown>
      </section>
    )
  }

  if (error.from === 'deleteArticle') {
    message.error(error.status)
    ErrorClear()
  }

  const confirm: PopconfirmProps['onConfirm'] = () => {
    deleteArticle(article.slug, navigate, '/')
  }

  let editMenu: null | JSX.Element = null
  if (isLarge && user.username === article.author.username && isAuthority) {
    editMenu = (
      <div className="article-card__edit-menu">
        <Link to={`/articles/${article.slug}/edit`}>
          <button className="article-card__button article-card__button--edit" type="button">
            Edit
          </button>
        </Link>
        <Popconfirm
          title="Delete the article"
          description="Are you sure to delete this article?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
          placement="right"
        >
          <button className="article-card__button article-card__button--delete" type="button">
            Delete
          </button>
        </Popconfirm>
      </div>
    )
  }

  return (
    <section className={classeCard.join(' ')}>
      <div className="article-card__header">
        <section className="article-card__info">
          <div className="article-card__header-info">
            <Link className="article-card__link" to={`/article/${article.slug}`}>
              <h2 className="article-card__title">{textClamp(article.title, 100)}</h2>
            </Link>
            <Like isAuthority={isAuthority} isFavorited={article.favorited} slug={article.slug} />
            <span className="article-card__likes-number">{article.favoritesCount}</span>
          </div>
          <Tags tags={tagListClamp} />
          <p className="article-card__description">{textClamp(article.description, 100)}</p>
        </section>
        <section>
          <div className="article-card__author-info">
            <div className="article-card__author-header">
              <p className="article-card__author-name">{article.author.username}</p>
              <p className="article-card__author-date">{format(new Date(article.createdAt), 'MMMM d, yyyy')}</p>
            </div>
            <div
              className="article-card__author-avatar"
              style={{ backgroundImage: `url(${imageSrc}), url(${defaultAvatar})` }}
            />
          </div>
          {editMenu}
        </section>
      </div>
      {articleText}
    </section>
  )
}
