import React from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { InputCheckbox } from './InputCheckbox';
import { Facet } from '../../typings/types';
import { ShowFacetsAll } from './Filters';
import { CircleFilter, ImgFilterArrowRight } from '../img/SvgImages';
import { CSS_HANDLES } from '../../utils/Constants';

interface Props {
    facet: Facet
    showList: ShowFacetsAll
    showFacetsAll: ShowFacetsAll[]
    changeShowFacetsAll: (data: ShowFacetsAll) => void
}
export const ListFacetsMobile = ({ facet, showList, changeShowFacetsAll, showFacetsAll }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)
  const selects = facet.values.filter((value)=>value.selected).length

  return (<ul className={handles.ListFacetsMobile}>
            <h4 className={applyModifiers(handles.ListFacetsTitleMobile, showFacetsAll.some((fact)=>fact.show===true) ? 'hidden' : '')} onClick={()=>changeShowFacetsAll(showList)}>
              <span>{facet.name} {(selects > 0) && <span className={handles.FacetsTitleSelectsMobile}>
                  <span className={handles.FacetsTitleSelectsSvgMobile}><CircleFilter/>
                  </span> <span className={handles.FacetsTitleSelectsSvgTextMobile}>{selects}</span></span>}</span>
              <span className={applyModifiers(handles.ListFacetsTitleSpanMobile, showList.show ? '' : 'hidden')}><ImgFilterArrowRight/></span>
            </h4>
            <div className={applyModifiers(handles.ListFacetsContentMobile, showList.show ? '' : 'hidden')}>
              {facet.values.map((value)=>{
                return (<InputCheckbox value={value} key={`${value.id}-${value.value}-${value.key}`}/>)
              })}
            </div>
            
            
          </ul>)
}
