import React, { useState, useEffect, useRef } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'
import { ImgArrowSelectDown } from '../img/SvgImages'

export const useOutsideClick = (
  ref: React.MutableRefObject<HTMLDivElement>,
  callback: Function
) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
interface Props{
  dataList: DataListSelect[]
  onSelectItem: (data: DataListSelect) => void
  itemSelect: DataListSelect | undefined
  disabled?:boolean
}
interface DataListSelect {
    id: string
    text: string
}

export const Select = ({dataList, onSelectItem, itemSelect, disabled}:Props) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [show, setShow] = useState(false)
  const refOutside: React.MutableRefObject<HTMLDivElement> = useRef(
    {} as HTMLDivElement
  )
  useOutsideClick(refOutside, () => {
    setShow(false)
  })
  const onSelect = (data: DataListSelect) => {
    onSelectItem(data)
    setShow(false)
  }
  return (
    <div ref={refOutside} className={handles.selectContent}>
      <button className={handles.selectBtn} onClick={() => setShow(!show)} disabled={disabled}>
        {disabled ? <div></div> :itemSelect?.text} <ImgArrowSelectDown />
      </button>
      <div
        className={applyModifiers(
          handles.selectContentList,
          show ? 'show' : ''
        )}
      >
        <ul className={handles.selectListUl}>
          {dataList.map((dataSelect)=>{
            return <li key={dataSelect.id} className={handles.selectListLi} onClick={() => onSelect(dataSelect)}>
                        {dataSelect.text}
                    </li>
          })}
        </ul>
      </div>
    </div>
  )
}
