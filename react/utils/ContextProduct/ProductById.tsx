import React, { ReactChild } from 'react'
import { Spinner } from 'vtex.styleguide'
import { ContextProduct } from './ContextProduct'
import { useQuery } from 'react-apollo'
import GET_PRODUCT_BY_ID from '../../graphql/getProductById.graphql'

interface Props {
    id:string
    skuId:string
    sizeSpinner:number
    children:ReactChild
}

export const ProductById = ({id, skuId, sizeSpinner, children}:Props) => {

  const { loading, data: productData, error } = useQuery(GET_PRODUCT_BY_ID, {
      variables: {
        id
      }
  });
  
  return (
    <>
        {!loading && productData?.product &&
        <ContextProduct product={productData?.product} skuId={skuId}>
            {children}
        </ContextProduct> }
        {loading && <div><Spinner color="#b3b3b3" size={sizeSpinner} /></div>}
        {error && <>Ocurrio un error al realizar la consulta</> }
    </>
  )
}
