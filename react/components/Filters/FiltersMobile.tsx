import React, { useContext, useEffect, useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'
import { Overlay } from "vtex.react-portal";
import { CSS_HANDLES } from '../../utils/Constants'
import { ImgFilterArrowLeft, ImgFilterClose, ImgFilterMobile } from '../img/SvgImages'
import { PagesContext } from '../../context/Context';
import { ShowFacetsAll } from './Filters';
import { ListFacetsMobile } from './ListFacetsMobile';
import { Button } from '../Atom/Button';

export const FiltersMobile = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const { facetsItems, getDataResult } = useContext(PagesContext)
    const [showFacetsAll, setShowFacetsAll] = useState<ShowFacetsAll[]>([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        const showFacets:ShowFacetsAll[] = []
        if(facetsItems){
            facetsItems.facets.map((facet)=>{
              if(!showFacetsAll?.some((fac)=>fac.name===facet.name)){
                showFacets.push({
                  name:facet.name,
                  show: false
                })
              }
          })
        }
        setShowFacetsAll([...showFacetsAll, ...showFacets])
      }, [facetsItems])
    const changeShowFacetsAll = (data: ShowFacetsAll) =>{
      const dataChange = showFacetsAll.map((fac)=>{
        if(fac.name === data.name){
          return { name: fac.name, show: true }
        }
        return { name: fac.name, show: false }
      })
        setShowFacetsAll(dataChange)
    }
    const changeHideFacetsAll = () =>{
      const dataChange = showFacetsAll.map((fac)=>{
        return { name: fac.name, show: false }
      })
        setShowFacetsAll(dataChange)
    }
    const deleteAllInAtFacet = () =>{
      getDataResult()
      setShow(false)
    }
  return (
    <div className={handles.filtersMobile}>
        <button className={handles.filtersMobileBtn} onClick={()=>setShow(true)}>
           <ImgFilterMobile/> Filtros
        </button>
        <Overlay>
            <div
        className={applyModifiers(
                    handles.filtersMobileContentModal,
                    show ? 'show' : ''
                    )}>
                <div className={applyModifiers(
                    handles.filtersMobileModal,
                    show ? 'show' : ''
                    )}>
                    <div>
                        <div className={handles.filtersModalHeader}>
                            <button className={handles.filtersModalHeaderClose} onClick={()=>{
                                showFacetsAll.some((fact)=>fact.show===true) ?
                                changeHideFacetsAll() :
                                setShow(false) 
                            }}>
                            {showFacetsAll.some((fact)=>fact.show===true) ? <ImgFilterArrowLeft/> : <ImgFilterClose/>} 
                            </button>
                            <div className={handles.filtersModalHeaderFilter}>
                                <ImgFilterMobile/> Filtros
                            </div>
                        </div>
                        { facetsItems ? 
                            <div className={handles.filterListMobile}>
                            {facetsItems.facets.map((facet, i)=>{
                                const showListFind = showFacetsAll.find((fact)=>fact.name===facet.name)
                                const showList:ShowFacetsAll =  showListFind ? showListFind : { name: "", show: false }
                                return ((facet.name === 'Formato') || (facet.name === 'Diseño')) &&
                                        (facet.values.length > 1 || facet.values.some((value)=>value.selected)) ?
                                (<>
                                <ListFacetsMobile  key={facet.name + i} facet={facet} showList={showList} changeShowFacetsAll={changeShowFacetsAll} showFacetsAll={showFacetsAll} />
                                <div className={handles.filterTitleSeparatorMobile}/>
                                </>): <React.Fragment key={facet.name + i}></React.Fragment>
                            })}
                        </div>:
                        <div className={handles.FilterLoadingMobile}>
                            <Spinner color="#b3b3b3" size={40} />
                        </div>}
                    </div>
                        <div className={applyModifiers(handles.ListFacetsBottomMobile, showFacetsAll.some((fact)=>fact.show===true) ? 'hidden' : '')}>
                            <Button onClickBtn={deleteAllInAtFacet} text='Borrar todo' secondary />
                        </div>
                </div>
            </div>
        </Overlay>
    </div>
  )
}
