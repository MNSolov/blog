import React from 'react'
import { Pagination } from 'antd'

import Article from '../article'
import { ArticleProps } from '../../redux/reducer'
import getArticles from '../../redux/actions'

import './article-list-page.scss'

interface Props {
  articles: {
    articlesArray: Array<ArticleProps>
    articlesCount: number
  }
  limitArticleOnPage: number
}

export default function ArticleListPage({ articles, limitArticleOnPage }: Props) {
  let articleList = null

  if (articles.articlesArray.length > 0) {
    articleList = articles.articlesArray.map((item: ArticleProps) => (
      <Article key={Math.random()} article={item} isLarge={false} />
    ))
  } else {
    articleList = null
  }

  const paginationChange = (event: number) => {
    articleList = null
    getArticles(event - 1, limitArticleOnPage)
  }

  return (
    <>
      {articleList}
      <Pagination
        className="pagination"
        pageSize={limitArticleOnPage}
        total={articles.articlesCount}
        showSizeChanger={false}
        onChange={(event) => paginationChange(event)}
      />
    </>
  )
}
