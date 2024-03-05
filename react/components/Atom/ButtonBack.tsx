import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CSS_HANDLES } from '../../utils/Constants'

interface Props {
  onClickBtn: () => void
}
export const ButtonBack = ({ onClickBtn }:Props) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <button onClick={onClickBtn}
      className={handles.button__back}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22.9058C5.97156 22.9058 1.09478 18.0252 1.09478 12C1.09478 5.97475 5.97867 1.0942 12 1.0942C18.0213 1.0942 22.9052 5.97475 22.9052 12C22.9052 18.0252 18.0213 22.9058 12 22.9058ZM12 0C5.3744 0 0 5.37008 0 12C0 18.6298 5.3744 24 12 24C18.6256 24 24 18.6298 24 12C24 5.37008 18.6256 0 12 0ZM14.1825 5.99638C14.1825 5.69404 13.9408 5.44928 13.6351 5.44928C13.4858 5.44928 13.3507 5.50684 13.2512 5.60762L7.79858 11.6041C7.69905 11.7049 7.63507 11.8417 7.63507 11.9928C7.63507 12.144 7.69905 12.2807 7.79858 12.3815L13.2512 18.378C13.3507 18.4787 13.4858 18.5363 13.6351 18.5363C13.9336 18.5363 14.1825 18.2916 14.1825 17.9892C14.1825 17.838 14.1185 17.7012 14.019 17.6005L8.91469 11.9856L14.019 6.37071C14.1185 6.26993 14.1825 6.13313 14.1825 5.98196" fill="currentColor"/>
        </svg>
    </button>
  )
}
