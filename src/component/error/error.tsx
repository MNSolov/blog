import React from 'react'

import './error.scss'

interface Props {
  message: string
}

export default function Error({ message }: Props) {
  return (
    <div className="error">
      <header className="error__header">Ошибка!</header>
      <p className="error_message">{message}</p>
    </div>
  )
}
