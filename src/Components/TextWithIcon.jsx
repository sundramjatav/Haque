import React from 'react'

const TextWithIcon = (icon,title) => {
  return (
    <div className='flex items-center gap-2'>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
  )
}

export default TextWithIcon