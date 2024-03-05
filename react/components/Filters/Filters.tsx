import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { PagesContext } from '../../context/Context'
import { CSS_HANDLES } from '../../utils/Constants'
import { ListFacets } from './ListFacets'

export interface ShowFacetsAll {
    name: string
    show: boolean
  }
export const Filters = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const { facetsItems, listFiltersShow } = useContext(PagesContext)
    const [showFacetsAll, setShowFacetsAll] = useState<ShowFacetsAll[]>([])
    useEffect(() => {
      const showFacets:ShowFacetsAll[] = []
      if(facetsItems){
          facetsItems.facets.map((facet)=>{
            if(!showFacetsAll?.some((fac)=>fac.name===facet.name)){
              showFacets.push({
                name:facet.name,
                show: listFiltersShow
              })
            }
        })
      }
      setShowFacetsAll([...showFacetsAll, ...showFacets])
    }, [facetsItems])
    const changeShowFacetsAll = (data: ShowFacetsAll) =>{
      const dataChange = showFacetsAll.map((fac)=>{
        if(fac.name ===data.name){
          return { name: fac.name, show: !fac.show }
        }
        return fac
      })
        setShowFacetsAll(dataChange)
    }
    
  return ( facetsItems ? 
    <div className={handles.filterList}>
      {facetsItems.facets.map((facet, i)=>{
        const showListFind = showFacetsAll.find((fact)=>fact.name===facet.name)
        const showList:ShowFacetsAll =  showListFind ? showListFind : { name: "", show: listFiltersShow }
        return ((facet.name === 'Formato') || (facet.name === 'Diseño')) &&
                (facet.values.length > 1 || facet.values.some((value)=>value.selected)) ?
        (<>
        <ListFacets  key={facet.name + i} facet={facet} showList={showList} changeShowFacetsAll={changeShowFacetsAll}/>
        <div className={handles.filterTitleSeparator}/>
        </>): <React.Fragment key={facet.name + i}></React.Fragment>
      })}
    </div>:
    <div className={handles.FilterLoading}>
      <Spinner color="#b3b3b3" size={40} />
    </div>
  )
}
