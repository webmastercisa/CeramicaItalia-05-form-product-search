import React, { ReactNode, useContext } from 'react'
//@ts-ignore
import { ProductContext } from 'vtex.product-context'
//@ts-ignore
import type { ProductTypes } from 'vtex.product-context'
//@ts-ignore
import { ProductSummaryProvider } from 'vtex.product-summary-context/ProductSummaryContext'
import type { ProductContextState } from '../../typings/ProductType'
interface Props {
  children: ReactNode
}

export const ContextProductSummary = ({ children }: Props) => {
  const product = useContext<ProductContextState>(ProductContext)
  return (
    <ProductSummaryProvider
      product={(product.product as unknown) as ProductTypes.Product}
      selectedItem={product.selectedItem}
    >
      {children}
    </ProductSummaryProvider>
  )
}
