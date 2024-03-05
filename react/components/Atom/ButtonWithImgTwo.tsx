import React from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'

interface Props {
  text: string
  img: string
  active?: boolean
  onClickBtn: () => void
}
export const ButtonWithImgTwo = ({ text, img, onClickBtn, active = false }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button onClick={onClickBtn}
    className={applyModifiers(
      handles.button__withImgTwo,
      active ? 'active' : ''
    )}>
        <img className={handles.button__withImgImgTwo} src={img} alt='img btn' />
        {text}
    </button>
  )
}
