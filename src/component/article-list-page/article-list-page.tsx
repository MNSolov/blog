import React, { useEffect } from 'react'
import { Pagination } from 'antd'

import Article from '../article'
import { ArticleProps } from '../../redux/reducer'
import { getArticles, ErrorClear } from '../../redux/actions'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import './article-list-page.scss'
import Loader from '../loader'

export default function ArticleListPage() {
  const { articles, isLoading, error, limitArticleOnPage } = useAppSelector((state: RootState) => state.state)
  const { currentPage } = useAppSelector((state: RootState) => state.state.articles)

  useEffect(() => {
    if (articles.articlesCount === 0 && isLoading === false && error.from !== 'getArticles') {
      ErrorClear()
      getArticles(currentPage, limitArticleOnPage)
    }
  })
  let articleList = null

  let result: null | JSX.Element = isLoading ? <Loader /> : null

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

  if (articleList !== null) {
    result = (
      <>
        {articleList}
        <Pagination
          className="pagination"
          current={currentPage + 1}
          pageSize={limitArticleOnPage}
          total={articles.articlesCount}
          showSizeChanger={false}
          onChange={(event) => paginationChange(event)}
        />
      </>
    )
  }

  return result
}
