import React, { useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'
import { Button } from '../Atom/Button'
import { Pages, PagesContext } from '../../context/Context'

export const PageStart = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { setPage } = useContext(PagesContext)
  
  return (
    <div className={handles.card}>
      <h3 className={handles.text__h3}>¡Hola!</h3>
      <div className={handles.content__text}>
        <p className={handles.text__p}>Estamos felices de acompañarte en este emocionante viaje, de crear tu espacio como siempre lo soñaste, una inversión en tu bienestar en la que nos aseguraremos que tomes la mejor decisión...</p>
        <p className={handles.text__p}>Cuando estés listo haz clic en siguiente para empezar</p>
      </div>
      <div className={handles.content__button__init}>
        <Button text='Siguiente' onClickBtn={()=>setPage(Pages.PageUserData)} />
      </div>
    </div>
  )
}
