import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { LogOut } from '../../redux/actions'

import defaultAvatar from './assets/Avatar.svg'

function NotAuthorityMenu() {
  return (
    <div className="header__menu">
      <Link to="/sign-in">
        <button className="header-button__sing-in" type="button">
          Sing In
        </button>
      </Link>
      <Link to="/sign-up">
        <button className="header-button__sing-up" type="button">
          Sing Up
        </button>
      </Link>
    </div>
  )
}

function AuthorityMenu() {
  const { image, username } = useAppSelector((state: RootState) => state.state.user)
  const authorName = username !== '' ? username : 'Имя Автора'

  const onClickHandler = () => {
    LogOut()
  }

  return (
    <div className="header__menu">
      <Link to="/create-article">
        <button className="header-button__create-article" type="button">
          Create article
        </button>
      </Link>
      <Link to="/profile" className="header__link">
        <p className="header__author-name">{authorName}</p>
        <div className="header__author-avatar" style={{ backgroundImage: ` url(${image}), url(${defaultAvatar})` }} />
      </Link>
      <Link to="/">
        <button className="header-button__log-out" type="button" onClick={onClickHandler}>
          Log Out
        </button>
      </Link>
    </div>
  )
}

export default function Header() {
  const { isAuthority } = useAppSelector((state: RootState) => state.state)

  const headerMenu = isAuthority ? <AuthorityMenu /> : <NotAuthorityMenu />

  return (
    <header className="header">
      <Link className="header__link" to="/">
        <p className="header__title">Realworld Blog</p>
      </Link>
      {headerMenu}
    </header>
  )
}
