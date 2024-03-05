import React, { useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector';
import { Link } from 'vtex.render-runtime'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { PagesContext } from '../../context/Context'
import { CSS_HANDLES } from '../../utils/Constants'
import { ProductContextSummary } from '../../typings/ProductContextType'
export const CustomSummary = () => {
    const { isMobile } = useDevice();
    const { SummaryName, SummaryQuickView, SummaryHighlights, SummarySellingPrice, SummaryPromotion, SummaryQuantity, SummaryCondShelf } = useContext(PagesContext)
    const handles = useCssHandles(CSS_HANDLES)
    const { product, selectedItem }: ProductContextSummary = ProductSummaryContext.useProductSummary()

  return (
    <div className={handles.container__summary}>
    <Link className={handles.summary__link} to={`/${product.linkText}/p?skuId=${selectedItem.itemId}`}>
        <div className={handles.summary__content__img}>
            <div className={handles.summary__Highlights}>
                <SummaryHighlights/>
            </div>
            <div className={handles.summary__QuickView}>
                {!isMobile && <SummaryQuickView/>}
                
            </div>
            <img className={handles.summary__img} src={selectedItem.images[0].imageUrl} alt={selectedItem.name}/>
            <img className={handles.summary__imgTwo} src={selectedItem.images[1].imageUrl} alt={selectedItem.name}/>
        </div>
        <div className={handles.summary__name}>
            <SummaryName/>
        </div>
        <div className={handles.summary__price}>
            <SummarySellingPrice/>
        </div>
        <div className={handles.summary__promotion}>
            <SummaryPromotion/>
        </div>
        <div className={handles.summary__quantity}>
            <SummaryQuantity/>
        </div>
        <div className={handles.summary__condShelf}>
            <SummaryCondShelf/>
        </div>
    </Link>
    </div>
  )
}
