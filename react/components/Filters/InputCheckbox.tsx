import React, { useContext, useEffect, useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { Value } from '../../typings/types'
import { PagesContext } from '../../context/Context'

const CSS_HANDLES = [
    "facetsItem",
    "itemLabel",
    "itemInput"
  ]
interface Props {
    value: Value
}
export const InputCheckbox = ({value}:Props) => {
    const handles = useCssHandles(CSS_HANDLES)
    const { setFacets, facetsLoading } = useContext(PagesContext)
    const [inputCheck, setInputCheck] = useState<boolean>(value.selected)
    useEffect(() => {
      setInputCheck(value.selected)
    }, [value])

    const changeInput = () =>{
      if(!facetsLoading){
        const valueSend = value.value ? value.value : value.id ? value.id : ""
          setFacets([{
              key: value.key,
              value: valueSend,
              select:!inputCheck
          }])
        setInputCheck(!inputCheck)
      }
    }
  return (
    <li className={handles.facetsItem}>
        <label className={applyModifiers(handles.itemLabel, facetsLoading ? 'disable' : '')}> {value.name}
            <input onChange={changeInput} className={`${applyModifiers(handles.itemInput, inputCheck ? 'checked' : '')} ${applyModifiers(handles.itemInput, facetsLoading ? 'disable' : '')} `}
            type="checkbox" checked={inputCheck} />
        </label>
    </li>
  )
}
