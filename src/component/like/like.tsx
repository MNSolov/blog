import React from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteLike, setLike } from '../../redux/actions'

import './like.scss'

interface LikeProps {
  isAuthority: boolean
  slug?: string
  isFavorited?: boolean
}

export default function Like({ isAuthority, slug, isFavorited }: LikeProps) {
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (isFavorited && typeof slug === 'string') {
      deleteLike(slug, navigate, '/')
    }
    if (isFavorited === false && typeof slug === 'string') {
      setLike(slug, navigate, '/')
    }
  }

  const classNamesLike: string[] = ['like--autorized']
  if (isFavorited) {
    classNamesLike.push('like--favorite')
  }

  const like = isAuthority ? (
    <button type="button" className={classNamesLike.join(' ')} aria-label="button" onClick={onClickHandler} />
  ) : (
    <div className="like" />
  )

  return like
}
