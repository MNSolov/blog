import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import Markdown from 'react-markdown'
import { format } from 'date-fns'

import Tags from '../tag'

import defaultAvatar from './assets/Avatar.svg'

import './article.scss'

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
  tagList: Array<string>
  title: string
  updatedAt: string
}

interface Props {
  article: ArticleProps
  isLarge: boolean
}

export default function Article({ article, isLarge }: Props) {
  const imageSrc = article.author.image
  const classeCard: string[] = []
  classeCard.push('article-card')

  let articleText = null

  if (isLarge) {
    classeCard.push('article-card--large')
    articleText = (
      <section className="article-card__text">
        <Markdown className="article-card__text">{article.body}</Markdown>
      </section>
    )
  }

  return (
    <section className={classeCard.join(' ')}>
      <div className="article-card__header">
        <section className="article-card__info">
          <div className="article-card__header-info">
            <Link className="article-card__link" to={`/article/${article.slug}`}>
              <h2 className="article-card__title">{article.title}</h2>
            </Link>
            <HeartOutlined className="article-card__like" />
            <span className="article-card__likes-number">{article.favorited}</span>
          </div>
          <Tags tags={article.tagList} />
          <p className="article-card__description">{article.description}</p>
        </section>
        <section className="article-card__author-info">
          <div className="article-card__author-header">
            <p className="article-card__author-name">{article.author.username}</p>
            <p className="article-card__author-date">{format(new Date(article.createdAt), 'MMMM d, yyyy')}</p>
          </div>
          {/* <img className="article-card__author-avatar" src={imageSrc} alt="Аватар автора" /> */}
          <div
            className="article-card__author-avatar"
            style={{ backgroundImage: `url(${imageSrc}), url(${defaultAvatar})` }}
          />
        </section>
      </div>
      {articleText}
    </section>
  )
}
