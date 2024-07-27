import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Pages, PagesContext } from '../../context/Context'
import { Button } from '../Atom/Button'
import { CSS_HANDLES } from '../../utils/Constants'
import { ButtonBack } from '../Atom/ButtonBack'
import { ButtonSelectData } from '../Atom/ButtonSelectData'
import { ButtonWithImgTwo } from '../Atom/ButtonWithImgTwo'

export const PageLocation = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const { setPage, formData, transform, setStateFormData } = useContext(PagesContext)
    const [validLocation, setValidLocation] = useState(false)
    const [endPageF, setEndPageF] = useState(false)

    const onSelectArea = (select:string) =>{
      setStateFormData({...formData, locationSelect: select})
    }
    useEffect(() => {
      if(formData.locationSelect !==""){
        setValidLocation(true)
      }
      if(!endPageF) setStateFormData(formData, false)
    }, [formData])
    
  return (
    <div className={handles.card}>
    
        <ButtonBack onClickBtn={()=>setPage(Pages.PageSpace)}/>
      <div className={handles.content__text}>
        <p className={handles.text__p5}>
        <img width="15%" src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/c3df303f-ca07-4ba4-b53f-f2cee30c4a21___27cd657c4e2a33531c232560c5b7b275.png'/>
          </p>
          <p className={handles.text__p5}>
       
          Finalmente,</p>
      </div>
      
      <div className={handles.content__text}>
        <p className={handles.text__p3}>¿Cuál es la espacio de tu proyecto que deseas transformar?</p>
      </div>
      <div className={handles.content__buttonWithImgTwo}>
        {transform.map((btnTransf)=>{
          return (btnTransf.__editorItemTitle === formData.spaceSelect) ? 
          btnTransf.typeProject.map((typeBtn)=>{
            return <ButtonWithImgTwo img={typeBtn.urlImg} key={typeBtn.__editorItemTitle}
                      text={typeBtn.__editorItemTitle} onClickBtn={()=>onSelectArea(typeBtn.__editorItemTitle)} 
                      active={formData.locationSelect === typeBtn.__editorItemTitle} />
          }) : <Fragment></Fragment>
        })}
      </div>
      <div className={handles.content__buttonSelect}>
        <ButtonSelectData text={`Tu ubicación: ${formData.department.label}, ${formData.city.label}`} textBtn='Cambiar' onClickBtn={()=>setPage(Pages.PageType)} />
        <ButtonSelectData text={`Tipo de proyecto: ${formData.areaSelect}`} textBtn='Cambiar' onClickBtn={()=>setPage(Pages.PageArea)} />
        <ButtonSelectData text={`Producto: ${formData.spaceSelect}`} textBtn='Cambiar' onClickBtn={()=>setPage(Pages.PageSpace)} />
      </div>
      <div className={handles.content__button}>
        <Button text='Cancelar' secondary onClickBtn={()=>setPage(Pages.PageStart)} />
        <Button text='Siguiente' onClickBtn={()=>{
          setEndPageF(true)
          setStateFormData({...formData}, true)
          }} disabled={!validLocation} />
      </div>
    </div>
  )
}
