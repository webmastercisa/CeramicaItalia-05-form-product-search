import React, { ReactNode } from 'react'
//@ts-ignore
import { ProductContextProvider } from 'vtex.product-context'
//@ts-ignore
import type { ProductTypes } from 'vtex.product-context'
import { ContextProductSummary } from './ContextProductSummary'
import { Product } from '../../typings/ProductType'
interface Props {
  product: Product
  children: ReactNode
  skuId?: string
}

export const ContextProduct = ({
  product,
  skuId = product?.items[0]?.itemId,
  children,
}: Props) => {
  return (
    <ProductContextProvider
      product={(product as unknown) as ProductTypes.Product}
      query={{ skuId }}
    >
      <ContextProductSummary children={children} />
    </ProductContextProvider>
  )
}
