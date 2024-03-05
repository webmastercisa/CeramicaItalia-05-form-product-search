import React from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { InputCheckbox } from './InputCheckbox';
import { Facet } from '../../typings/types';
import { ShowFacetsAll } from './Filters';
import { ArrowFilter, CircleFilter } from '../img/SvgImages';

const CSS_HANDLES = [
    "ListFacets",
    "facetsItem",
    "ListFacetsTitle",
    "ListFacetsTitleSpan",
    "ListFacetsContent",
    "FacetsTitleSelects",
    "FacetsTitleSelectsSvg"
  ]
interface Props {
    facet: Facet
    showList: ShowFacetsAll
    changeShowFacetsAll: (data: ShowFacetsAll) => void
}
export const ListFacets = ({ facet, showList, changeShowFacetsAll }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)
  const selects = facet.values.filter((value)=>value.selected).length

  return (<ul className={handles.ListFacets}>
            <h4 className={handles.ListFacetsTitle} onClick={()=>changeShowFacetsAll(showList)}>
              {facet.name} {(selects > 0) && <span className={handles.FacetsTitleSelects}>
                  <span className={handles.FacetsTitleSelectsSvg}><CircleFilter/>
                  </span> {selects}</span>}
              <span className={applyModifiers(handles.ListFacetsTitleSpan, showList.show ? '' : 'hidden')}><ArrowFilter/></span>
            </h4>
            <div className={applyModifiers(handles.ListFacetsContent, showList.show ? '' : 'hidden')}>
              {facet.values.map((value)=>{
                return (<InputCheckbox value={value} key={`${value.id}-${value.value}-${value.key}`}/>)
              })}
            </div>
          </ul>)
}
