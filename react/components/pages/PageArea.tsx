import React, { useContext, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Pages, PagesContext } from '../../context/Context'
import { Button } from '../Atom/Button'
import { CSS_HANDLES } from '../../utils/Constants'
import { ButtonBack } from '../Atom/ButtonBack'
import { ButtonWithImg } from '../Atom/ButtonWithImg'
import { ButtonSelectData } from '../Atom/ButtonSelectData'

export const PageArea = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const { setPage, formData, area, setStateFormData } = useContext(PagesContext)
    const [validArea, setValidArea] = useState(false)
    const onSelectArea = (select:string) =>{
      setStateFormData({...formData, areaSelect: select})
    }
    useEffect(() => {
      if(formData.areaSelect !==""){
        setValidArea(true)
      }
      setStateFormData(formData, false)
    }, [formData])
    
  return (
    <div className={handles.card}>
        <ButtonBack onClickBtn={()=>setPage(Pages.PageType)}/>
      <div className={handles.content__text}>
      <p className={handles.text__p5}>
        <img width="70%" src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/dafd458c-e987-4495-b2ae-aabbcb7c0918___716e4ad27aa370613b341e31553d8546.png'/>
        </p> 

        {/* <p className={handles.text__p5}>¡Estamos cerca!</p>
        <p className={handles.text__p6}>Ahora, dinos,</p> */}


      </div>
      {/* <div className={handles.content__text}>
        <p className={handles.text__p3}>¿Qué tipo de superficie deseas transformar?</p>
      </div> */}
      <div className={handles.content__buttonWithImg}>
        {area.map((btn)=>{
          return <ButtonWithImg img={btn.urlImg} key={btn.__editorItemTitle}
                    text={btn.__editorItemTitle} active={formData.areaSelect === btn.__editorItemTitle}
                     onClickBtn={()=>onSelectArea(btn.__editorItemTitle)} />
        })}
      </div>
      <div className={handles.content__buttonSelect}>
        <ButtonSelectData text={`Tu ubicación: ${formData.department.label}, ${formData.city.label}`} textBtn='Cambiar' onClickBtn={()=>setPage(Pages.PageType)} />
      </div>
      <div className={handles.content__button}>
        <Button text='Cancelar' secondary onClickBtn={()=>setPage(Pages.PageStart)} />
        <Button text='Siguiente' onClickBtn={()=>setPage(Pages.PageSpace)} disabled={!validArea} />
      </div>
    </div>
  )
}
