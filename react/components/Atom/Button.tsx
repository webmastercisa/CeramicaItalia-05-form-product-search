import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'

interface Props {
  text: string
  onClickBtn: () => void
  secondary?:boolean
  disabled?:boolean
}
export const Button = ({ text, onClickBtn, secondary = false, disabled = false }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button onClick={onClickBtn} disabled={disabled}
      className={`${handles.button} ${secondary && handles.button__secondary}`}>
      {text}
    </button>
  )
}
