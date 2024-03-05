import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'
import { ImgCopyMobile } from '../img/SvgImages'

interface Props {
  text: string
  onClickBtn: () => void
}
export const ButtonSelectDataMobile = ({ text, onClickBtn }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
      <button onClick={onClickBtn}
        className={handles.button__selectDataMobile}>
        {text} <ImgCopyMobile/>
      </button>
  )
}
