import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Area, FacetsAwaitSelect, FacetsData, FacetsSelect, FiltersData, FormDataI, PagesContextData, ProductsSearch, Transform } from "../typings/types";
import { useLazyQuery, useMutation } from "react-apollo";
import GET_FACETS from '../graphql/getFacets.graphql'
import GET_PRODUCT_SEARCH from '../graphql/getProductSearch.graphql';
import CREATE_DOCUMENT from '../graphql/createDocument.graphql'
import { useLocalStorageFormDataFilters } from "../hook/useLocalStore";

export enum Pages {
    PageStart = 0,
    PageUserData = 1,
    PageType = 2,
    PageArea = 3,
    PageSpace = 4,
    PageLocation = 5,
    PageEnd = 6
  }
  
export const orderInitData = [
  {
    id: "OrderByScoreDESC",
    text: "Relevancia"
  },
  {
    id: "OrderByPriceDESC",
    text: "Precios más alto"
  },
  {
    id: "OrderByPriceASC",
    text: "Precios más bajo"
  },
  {
    id: "OrderByNameASC",
    text: "Nombre, creciente"
  },
  {
    id: "OrderByNameDESC",
    text: "Nombre, decreciente"
  }
]
export const formDataInit = {
  name: "",
  email: "",
  department: {
    id:"",
    label:""
  },
  city: {
    id:"",
    label:""
  },
  checkTerm: false,
  areaSelect: "",
  spaceSelect: "",
  locationSelect: "",
  endPage: false
}
export const initialStateContext: PagesContextData = {
    pageSelect: Pages.PageStart,
    facetsItems: undefined,
    productsSearch: undefined,
    checkString:"",
    facetsLoading: true,
    area: [],
    transform: [],
    formData: formDataInit,
    listFiltersShow: true,
    filtersDataSelect: orderInitData[0],
    setFacets: () => {},
    setPage: () => {},
    getDataResult: () => {},
    setStateFormData: () => {},
    setShowMore: () => {},
    onSelectFiltersData: () => {},
    SummaryQuickView: () => <></>,
    SummaryHighlights: () => <></>,
    SummaryName: () => <></>,
    SummarySellingPrice: () => <></>,
    SummaryPromotion: () => <></>,
    SummaryQuantity: () => <></>,
    SummaryCondShelf: () => <></>,
}
export const PagesContext = createContext<PagesContextData>(initialStateContext);

interface Props{
    children: ReactNode
    SummaryQuickView:() => JSX.Element
    SummaryHighlights:() => JSX.Element
    SummaryName:() => JSX.Element
    SummarySellingPrice:() => JSX.Element
    SummaryPromotion:() => JSX.Element
    SummaryQuantity:() => JSX.Element
    SummaryCondShelf:() => JSX.Element
    area: Area[]
    checkString: string
    transform: Transform[]
    listFiltersShow:boolean
}
const ContextProviderPages = ({ children, SummaryQuickView, SummaryHighlights, 
        SummaryName, SummarySellingPrice, SummaryPromotion, SummaryQuantity, SummaryCondShelf,
        area, transform, listFiltersShow, checkString
      }:Props
        ) => {
    const [pageSelect, setPageSelect] = useState<Pages>(Pages.PageStart)
    const { formDataFilters: formData, saveFormDataFilters: setFormData } = useLocalStorageFormDataFilters("formDataFilters", formDataInit)
    const [facetsItems, setFacetsItems] = useState<FacetsData | undefined>()
    const [reload, setReload] = useState(false)
    const [filtersDataSelect, setFiltersDataSelect] = useState<FiltersData>(orderInitData[0])
    const [pageState, setPageState] = useState({
      from: 0,
      to: 11
    })
    const [facetsSelects, setFacetsSelects] = useState<FacetsSelect[]>([])
    const [productsSearch, setProductsSearch] = useState<ProductsSearch | undefined>()

    const onSelectFiltersData = (item: FiltersData) =>{
      setReload(true)
      setFiltersDataSelect(item)
      setPageState({
        from: 0,
        to: 11
      })
      getProductSearch({
        variables: {
          selectedFacets: facetsSelects,
          orderBy: item.id,
          from: 0,
          to: 11
        },
      })
  }
    const setPage = (page:Pages) =>{
        setPageSelect(page)
    }
    const setShowMore = () => {
      setReload(false)
      setPageState({
        from: pageState.to + 1,
        to: pageState.to + 12
      })
      getProductSearch({
        variables: {
          selectedFacets: facetsSelects,
          orderBy: filtersDataSelect.id,
          from: pageState.to + 1,
          to: pageState.to + 12
        },
      })
    }
    const setStateFormData = (data: FormDataI, endPage = false) =>{
      setFormData({...data, endPage})
    }
    const [getFacets, { data: facetsData, loading: facetsLoading }] = useLazyQuery(GET_FACETS)
    const [getProductSearch, { data: ProductSearchData, loading: ProductSearchLoading }] = useLazyQuery(GET_PRODUCT_SEARCH)
    const [createDocument] = useMutation(CREATE_DOCUMENT);

    const createDocumentFP = async () => {
      try {
        await createDocument({
          variables: {
            acronym: "FP",
            document: {
              fields:[
                {
                  key: "name",
                  value: formData.name
                },
                {
                  key: "email",
                  value: formData.email
                },
                {
                  key:"department",
                  value: formData.department.id
                },
                {
                  key:"city",
                  value: formData.city.id
                },
                {
                  key:"areaSelect",
                  value: formData.areaSelect
                },
                {
                  key:"spaceSelect",
                  value: formData.spaceSelect
                },
                {
                  key:"locationSelect",
                  value: formData.locationSelect
                },
                {
                  key:"checkTerm",
                  value: formData.checkTerm
                }
              ]
            }
          },
        })
      } catch (e) {
        console.error('error al crear', e);
      }
    }
    useEffect(() => {
      if(!facetsLoading && facetsData){
        setFacetsItems(facetsData.facets)
      }
    }, [facetsData, facetsLoading])

    useEffect(() => {
      if(!ProductSearchLoading && ProductSearchData){
        if (productsSearch && !reload) {
          setReload(true)
          setProductsSearch({...ProductSearchData.productSearch, products:[...productsSearch.products,...ProductSearchData.productSearch.products]})
        } else {
          setProductsSearch(ProductSearchData.productSearch)
        }
      }
    }, [ProductSearchData, ProductSearchLoading])
    
    const getDataResult = () =>{
      const { locationSelect, spaceSelect, areaSelect } = formData;
      const filtersFacets:FacetsSelect[] = []
      const areaFilter = area.find((areaF)=>areaF.__editorItemTitle === areaSelect)
      if(areaFilter){
        areaFilter.filtersData.map(({keyCategory, __editorItemTitle})=>{
          filtersFacets.push({
            key: keyCategory,
            value: __editorItemTitle
          })
        })
      }
      const transformFilter = transform.find((transfF)=>transfF.__editorItemTitle === spaceSelect)
      if(transformFilter){
        const transformFilterSelect = transformFilter.typeProject.find((transfF)=>transfF.__editorItemTitle === locationSelect)
        if(transformFilterSelect){
          transformFilterSelect.filtersData.map(({keyCategory, __editorItemTitle})=>{
            filtersFacets.push({
              key: keyCategory,
              value: __editorItemTitle
            })
          })
        }
      }
      setFacetsSelects(filtersFacets)
      getFacets({
        variables: {
          selectedFacets: filtersFacets
        },
      })
      getProductSearch({
        variables: {
          selectedFacets: filtersFacets,
          orderBy: filtersDataSelect.id,
          from: pageState.from,
          to: pageState.to
        },
      })
    }
    useEffect(() => {
      if(formData.endPage){
        getDataResult()
        setPage(Pages.PageEnd)
        createDocumentFP()
      }
    }, [formData])
    
    const setFacets = (AllFacets: FacetsAwaitSelect[]) =>{
      let newFacets:FacetsSelect[] = facetsSelects
      let deleteFacets:FacetsSelect[] = []
      AllFacets.map((facets)=>{
        const findF = facetsSelects.find((fact)=>(fact.key===facets.key && fact.value===facets.value));
          if(facets.select){
            if(findF){
              newFacets = facetsSelects.map((fact)=>{
                if(fact.key===facets.key && fact.value===facets.value){
                  return {
                    key: facets.key,
                    value: facets.value
                  }
                }
                return fact
              })
            }else{
              newFacets = facetsSelects
              newFacets.push({ key:facets.key, value:facets.value })
            }
          }else{
            if(findF){
              deleteFacets.push({ key:facets.key, value:facets.value })
            }
          }
        })
        newFacets = facetsSelects.filter((fact)=>!deleteFacets.some((facetsD)=>(fact.key===facetsD.key && fact.value===facetsD.value)))
        setReload(true)
        setFacetsSelects(newFacets)
        setPageState({
          from: 0,
          to: 11
        })
        getFacets({
          variables: {
            selectedFacets: newFacets
          },
        })
        getProductSearch({
          variables: {
            selectedFacets: newFacets,
            orderBy: filtersDataSelect.id,
            from: 0,
            to: 11
          },
        })
      }
    
    const contextValue: PagesContextData = {
        pageSelect,
        facetsItems,
        facetsLoading,
        productsSearch,
        setStateFormData,
        formData,
        checkString,
        onSelectFiltersData,
        filtersDataSelect,
        setShowMore,
        setFacets,
        getDataResult,
        setPage,
        SummaryQuickView,
        SummaryHighlights,
        SummaryName,
        SummarySellingPrice,
        SummaryPromotion,
        SummaryQuantity,
        SummaryCondShelf,
        area,
        transform,
        listFiltersShow,
    }

  return (
    <PagesContext.Provider value={contextValue}>
      {children}
    </PagesContext.Provider>
  );
}
export default ContextProviderPages;