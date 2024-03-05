import React, { useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { PageStart } from '../pages/PageStart'
import { PageUserData } from '../pages/PageUserData'
import { PageType } from '../pages/PageType'
import { PageArea } from '../pages/PageArea'
import { PageSpace } from '../pages/PageSpace'
import { PageEnd } from '../pages/PageEnd'
import { Pages, PagesContext } from '../../context/Context'
import { CSS_HANDLES } from '../../utils/Constants'
import { PageLocation } from '../pages/PageLocation'


export const CustomFormProducts = () => {
  
  const handles = useCssHandles(CSS_HANDLES)
  const { pageSelect } = useContext(PagesContext)

  return (
      <div className={handles.container}>
        {pageSelect === Pages.PageStart ?
          <PageStart/>:
        pageSelect === Pages.PageUserData ?
          <PageUserData/>:
        pageSelect === Pages.PageType ?
          <PageType/>:
        pageSelect === Pages.PageArea ?
          <PageArea/>:
        pageSelect === Pages.PageSpace ?
          <PageSpace/>:
        pageSelect === Pages.PageLocation ?
          <PageLocation/>:
        pageSelect === Pages.PageEnd ?
          <PageEnd/>:
        <></>}
      </div>
  )
}
