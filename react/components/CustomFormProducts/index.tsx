import React from 'react'
import ContextProviderPages from '../../context/Context'
import { CustomFormProducts } from './CustomFormProducts'
import { AREA_DATA, CHECK_STRING_DATA, TRANSFORM_DATA } from '../../utils/Constants'
import { Area, Transform } from '../../typings/types'
interface Props {
  SummaryQuickView:() => JSX.Element
  SummaryHighlights:() => JSX.Element
  SummaryName:() => JSX.Element
  SummarySellingPrice:() => JSX.Element
  SummaryPromotion:() => JSX.Element
  SummaryQuantity:() => JSX.Element
  SummaryCondShelf:() => JSX.Element
  listFiltersShow: boolean
  checkString: string
  transform: Transform[]
  area: Area[];
}

const FormProducts = (
  { SummaryQuickView, SummaryHighlights, SummaryName, SummarySellingPrice, SummaryPromotion, SummaryQuantity, SummaryCondShelf, checkString = CHECK_STRING_DATA,
    listFiltersShow = true, transform = TRANSFORM_DATA, area = AREA_DATA
  }:Props
  ) => {
  return (
    <ContextProviderPages SummaryQuickView={SummaryQuickView}
      SummaryHighlights={SummaryHighlights}
      SummaryName={SummaryName}
      SummarySellingPrice={SummarySellingPrice}
      SummaryPromotion={SummaryPromotion}
      SummaryQuantity={SummaryQuantity}
      SummaryCondShelf={SummaryCondShelf}
      listFiltersShow={listFiltersShow}
      transform={transform}
      checkString={checkString}
      area={area}>
        <CustomFormProducts/>
    </ContextProviderPages>
  )
}

FormProducts.schema = {
  title: 'Formulario de productos',
  type: 'object',
  properties: {
    listFiltersShow:{
      title: "Desplegar filtros al inicio",
      type: 'boolean',
      default: true
    },
    checkString: {
        title: 'texto de check del formulario en html',
        type: 'string',
        description: "Acepto <a target='_blank' class='vtex-rich-text-0-x-link--formProducts' href='/terminos-legales'>He leído y acepto la política de tratamiento de datos personales</a>",
        default: CHECK_STRING_DATA
    },
    area: {
        title: "Superficie a transformar",
        type: 'array',
        items: {
          title: "nombre",
          type: "object",
          properties: {
            __editorItemTitle: {
                title: 'Nombre',
                type: 'string',
                description: "Piso",
                default: "Piso"
              },
              urlImg: {
                title: 'Imagen del icono del boton',
                description: 'Imagen del icono del boton',
                type: 'string',
                default: "https://ceramicaitalia.vtexassets.com/arquivos/piso.png",
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              filtersData: {
                title: "Filtros",
                type: 'array',
                description: "Grupos de filtros inicial",
                items: {
                  title: "Nombre del grupo",
                  type: "object",
                  properties: {
                      keyCategory: {
                          title: 'Key de la categoria',
                          type: 'string',
                          description: "Ejemplo: category-1",
                          default: "category-1"
                      },
                      __editorItemTitle: {
                        title: 'Valor de la categoria',
                        type: 'string',
                        description: "Ejemplo: pisos",
                        default: "pisos"
                      },
                    }
                },
            },
            }
        },
        default: AREA_DATA
    },
    transform: {
        title: "Tipo de transformacion a realizar",
        type: 'array',
        items: {
          title: "nombre",
          type: "object",
          properties: {
            __editorItemTitle: {
                title: 'Nombre',
                type: 'string',
                description: "COMERCIAL",
                default: "COMERCIAL"
              },
              urlImg: {
                title: 'Imagen del icono del boton',
                description: 'Imagen del icono del boton',
                type: 'string',
                default: "https://ceramicaitalia.vtexassets.com/arquivos/Comercial.png",
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              typeProject: {
                  title: "Tipo de proyecto a realizar",
                  type: 'array',
                  items: {
                    title: "nombre",
                    type: "object",
                    properties: {
                      __editorItemTitle: {
                          title: 'Nombre',
                          type: 'string',
                          description: "Cocina industrial",
                          default: "Cocina industrial"
                        },
                        urlImg: {
                          title: 'Imagen del icono del boton',
                          description: 'Imagen del icono del boton',
                          type: 'string',
                          default: "https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/06a6e786-30ad-4990-8394-6d4467711867___a896f1f1d620e95dec46cd6de7d2b83f.jpeg",
                          widget: {
                            'ui:widget': 'image-uploader',
                          },
                        },
                        filtersData: {
                          title: "Filtros",
                          type: 'array',
                          description: "Grupos de filtros inicial",
                          items: {
                            title: "Nombre del grupo",
                            type: "object",
                            properties: {
                                keyCategory: {
                                    title: 'Key de la categoria',
                                    type: 'string',
                                    description: "Ejemplo: clasificacion-ansi--interior-seco-interior-humedo- / pei",
                                    default: "clasificacion-ansi--interior-seco-interior-humedo-"
                                },
                                __editorItemTitle: {
                                  title: 'Valor de la categoria',
                                  type: 'string',
                                  description: "Ejemplo: interior-dry / 5",
                                  default: "interior-dry"
                                },
                              }
                          },
                        },
                      }
                  },
              },
            }
        },
        default: TRANSFORM_DATA
    },
  },
}
export default FormProducts
