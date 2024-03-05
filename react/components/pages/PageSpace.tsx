import React, { useContext, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Pages, PagesContext } from '../../context/Context'
import { Button } from '../Atom/Button'
import { CSS_HANDLES } from '../../utils/Constants'
import { ButtonBack } from '../Atom/ButtonBack'
import { ButtonWithImg } from '../Atom/ButtonWithImg'
import { ButtonSelectData } from '../Atom/ButtonSelectData'

export const PageSpace = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const { setPage, formData, transform, setStateFormData } = useContext(PagesContext)
    const [validSpace, setValidSpace] = useState(false)
    const onSelectSpace = async (select:string) =>{
      setStateFormData({...formData, spaceSelect: select, locationSelect: ""})
    }
    useEffect(() => {
      if(formData.spaceSelect !==""){
        setValidSpace(true)
      }
      setStateFormData(formData, false)
    }, [formData])
    
  return (
    <div className={handles.card}>
        <ButtonBack onClickBtn={()=>setPage(Pages.PageArea)}/>
      <div className={handles.content__text}>
        <p className={handles.text__p5}>Seguro será un gran proyecto</p>
      </div>
      <div className={handles.content__text}>
        <p className={handles.text__p3}>¿Qué tipo de transformación desea realizar?</p>
      </div>
      <div className={handles.content__buttonWithImg}>
        {transform.map((btnTrans)=>{
          return <ButtonWithImg img={btnTrans.urlImg} key={btnTrans.__editorItemTitle}
                  text={btnTrans.__editorItemTitle} onClickBtn={()=>onSelectSpace(btnTrans.__editorItemTitle)} 
                  active={formData.spaceSelect === btnTrans.__editorItemTitle}/>
        })}
      </div>
      <div className={handles.content__buttonSelect}>
        <ButtonSelectData text={`Tu ubicación: ${formData.department.label}, ${formData.city.label}`} textBtn='Cambiar' onClickBtn={()=>setPage(Pages.PageType)} />
        <ButtonSelectData text={`Tipo de proyecto: ${formData.areaSelect}`} textBtn='Cambiar' onClickBtn={()=>setPage(Pages.PageArea)} />
      </div>
      <div className={handles.content__button}>
        <Button text='Cancelar' secondary onClickBtn={()=>setPage(Pages.PageStart)} />
        <Button text='Siguiente' onClickBtn={()=>setPage(Pages.PageLocation)} disabled={!validSpace} />
      </div>
    </div>
  )
}
