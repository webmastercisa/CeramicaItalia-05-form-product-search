import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'

interface Props {
  text: string
  textBtn: string
  end?: boolean
  onClickBtn: () => void
}
export const ButtonSelectData = ({ text, textBtn, onClickBtn, end = false }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${end ? handles.content__button__selectDataEnd : handles.content__button__selectData}`}>
    <span className={handles.content__text__selectData}>{text}</span>
      <button onClick={onClickBtn}
        className={handles.button__selectData}>
        {textBtn}
      </button>
    </div>
  )
}
