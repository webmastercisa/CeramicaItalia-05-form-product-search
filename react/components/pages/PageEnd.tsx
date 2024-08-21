import React, { useContext, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector';
import { Pages, PagesContext, orderInitData } from '../../context/Context'
import { CSS_HANDLES } from '../../utils/Constants'
import { ButtonBack } from '../Atom/ButtonBack'
import { ButtonSelectData } from '../Atom/ButtonSelectData'
import { ProductById } from '../../utils/ContextProduct/ProductById'
import { CustomSummary } from '../CustomSummary/CustomSummary'
import { Filters } from '../Filters/Filters'
import { SelectFilter } from '../Atom/SelectFilter'
import { ImgArrowSelectDown } from '../img/SvgImages'
import { ButtonSelectDataMobile } from '../Atom/ButtonSelectDataMobile';
import { FiltersMobile } from '../Filters/FiltersMobile';

export const PageEnd = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice();
  const { setPage, productsSearch, filtersDataSelect, onSelectFiltersData, setShowMore, formData } = useContext(PagesContext)
  useEffect(() => {
    scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <div>
      <div className={handles.card__end}>
        <ButtonBack onClickBtn={() => setPage(Pages.PageLocation)} />
        <div className={handles.content__text}>
          <p className={handles.text__p7}>Tus preferencias</p>
        </div>
        <div className={handles.content__Items}>
          <img src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/7236f8c5-a849-438f-a662-6ef88313735c___e4a75ab68cdab5a053ba6621dd394581.jpg' />
        </div>
        {isMobile ?
          <>

            <div className={handles.content__buttonSelectEndMobile}>
              {/*<ButtonSelectDataMobile text={`${formData.department.label}, ${formData.city.label}`} onClickBtn={()=>setPage(Pages.PageType)} />*/}
              <ButtonSelectDataMobile text={`${formData.areaSelect}`} onClickBtn={() => setPage(Pages.PageArea)} />
            </div>
            <div className={handles.content__buttonSelectEndMobile}>
              <ButtonSelectDataMobile text={`${formData.spaceSelect}`} onClickBtn={() => setPage(Pages.PageSpace)} />
              <ButtonSelectDataMobile text={`${formData.locationSelect}`} onClickBtn={() => setPage(Pages.PageLocation)} />
            </div>
          </> :
          <div className={handles.content__buttonSelectEnd}>
            {/*<ButtonSelectData end text={`Tu ubicación: ${formData.department.label}, ${formData.city.label}`} textBtn='Cambiar' onClickBtn={() => setPage(Pages.PageType)} /> */}
            <ButtonSelectData end text={`Tipo de proyecto: ${formData.areaSelect}`} textBtn='Cambiar' onClickBtn={() => setPage(Pages.PageArea)} />
            <ButtonSelectData end text={`Producto: ${formData.spaceSelect}`} textBtn='Cambiar' onClickBtn={() => setPage(Pages.PageSpace)} />
            <ButtonSelectData end text={`Área remodelación: ${formData.locationSelect}`} textBtn='Cambiar' onClickBtn={() => setPage(Pages.PageLocation)} />
          </div>}
      </div>
      <div className={handles.content__flagEnd}>
        {/*formData.name*/} Estos son nuestros productos recomendados para tu proyecto
      </div>
      <div className={handles.content__Result}>
        {!isMobile && <div className={handles.content__Filters}>
          <Filters />
        </div>}
        <div className={handles.content__Items}>
          <div className={handles.items__header}>
            <div className={handles.items__order}>
              <SelectFilter dataList={orderInitData} itemSelect={filtersDataSelect} onSelectItem={onSelectFiltersData} />
            </div>
            <div className={handles.items__total}>
              {productsSearch && productsSearch.recordsFiltered} Items
            </div>
            {isMobile && <FiltersMobile />}
          </div>
          <div className={handles.grid__Items}>
            {productsSearch && productsSearch.products.map(({ productId, items }, i) => {
              const skuId = items[0].itemId
              return <ProductById sizeSpinner={10} id={productId} skuId={skuId} key={productId + i}>
                <CustomSummary />
              </ProductById>
            })}
          </div>
          <div className={handles.Items__bottom}>
            <button className={handles.button__more} onClick={setShowMore}>
              <ImgArrowSelectDown /> Ver más productos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
