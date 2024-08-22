import React, { useContext, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Pages, PagesContext } from '../../context/Context'
import { Button } from '../Atom/Button'
import { CSS_HANDLES } from '../../utils/Constants'
{/*import { ButtonBack } from '../Atom/ButtonBack'*/ }
import { ButtonWithImg } from '../Atom/ButtonWithImg'
{/*
import { ButtonSelectData } from '../Atom/ButtonSelectData'
*/
}

export const PageArea = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { setPage, formData, area, setStateFormData } = useContext(PagesContext)
  const [validArea, setValidArea] = useState(false)
  const onSelectArea = (select: string) => {
    setStateFormData({ ...formData, areaSelect: select })
  }
  useEffect(() => {

    /**
     * Se tiene una variable localstorage, que puede ser null o tener valor. Si tiene
     * valor, se entiende que viene del perfilador. Por eso se asigna el valor a la variable
     * formDataFilters, y se envía a la última página.
     *
     */
    let VarTmp = null
    VarTmp = localStorage.getItem("perfilamiento");
    if (VarTmp != null) {
      localStorage.removeItem("perfilamiento");
      localStorage.setItem("formDataFilters", '' + VarTmp);
      //setEndPageF(true)
      setPage(Pages.PageEnd)
    }
    else {
      if (formData.areaSelect !== "") {
        setValidArea(true)
      }

      setStateFormData(formData, false)
    }

  }, [formData])

  return (
    <div className={handles.card}>
      {/* <ButtonBack onClickBtn={()=>setPage(Pages.PageType)}/>  */}
      {/*<ButtonBack onClickBtn={() => setPage(Pages.PageStart)} />*/}
      <div className={handles.content__text}>
        <p className={handles.text__p5}>
          <img width="70%" src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/9feb86e9-9838-49c5-8a87-3707bfb51933___511bc6bd6e35427e5722446e254a9970.png' />
        </p>

        {/* <p className={handles.text__p5}>¡Estamos cerca!</p>
        <p className={handles.text__p6}>Ahora, dinos,</p> */}


      </div>
      {/* <div className={handles.content__text}>
        <p className={handles.text__p3}>¿Qué tipo de superficie deseas transformar?</p>
      </div> */}
      <div className={handles.content__buttonWithImg}>
        {area.map((btn) => {
          return <ButtonWithImg img={btn.urlImg} key={btn.__editorItemTitle}
            text={btn.__editorItemTitle} active={formData.areaSelect === btn.__editorItemTitle}
            onClickBtn={() => onSelectArea(btn.__editorItemTitle)} />
        })}
      </div>
      {/*
      <div className={handles.content__buttonSelect}>
        <ButtonSelectData text={`Tu ubicación: ${formData.department.label}, ${formData.city.label}`} textBtn='Cambiar' onClickBtn={() => setPage(Pages.PageType)} />
      </div>

      */ }
      <div className={handles.content__button}>
        {/*<Button text='Cancelar' secondary onClickBtn={() => setPage(Pages.PageStart)} /> */}
        <Button text='Siguiente' onClickBtn={() => setPage(Pages.PageSpace)} disabled={!validArea} />
      </div>
    </div>
  )
}
