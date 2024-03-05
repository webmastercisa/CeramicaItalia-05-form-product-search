import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'

interface Props {
    placeholder: string
    type: 'email' | 'text' | 'number'
    value: string
    onChangeValue: (data: string) => void
}
export const Input = ({ placeholder, type, value, onChangeValue }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <input className={handles.input} type={type} placeholder={placeholder} value={value} onChange={(e)=>onChangeValue(e.target.value)}/>
  )
}
