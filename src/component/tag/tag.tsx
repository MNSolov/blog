import React from 'react'

import './tag.scss'

interface Props {
  tags: Array<string>
}

function tagFacture(tagText: string) {
  const tagWords = tagText.split(/\s/g)

  return (
    <li key={Math.random()} className="tag">
      <span>{tagWords.join(' ')}</span>
    </li>
  )
}

export default function Tags({ tags }: Props) {
  const tagList = tags.map((item: string) => {
    const tag = item ? tagFacture(item) : null
    return tag
  })
  return <ul className="tag-list">{tagList}</ul>
}
