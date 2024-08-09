import React, { useContext, useEffect, useRef, useState } from 'react'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useRenderSession } from 'vtex.session-client' 
import { Pages, PagesContext } from '../../context/Context'
import { Button } from '../Atom/Button'
import { CSS_HANDLES } from '../../utils/Constants'
import { Input } from '../Atom/Input'
import { ButtonBack } from '../Atom/ButtonBack'
import { UseRenderSession } from '../../typings/types'

export const PageUserData = () => {
    const handles = useCssHandles(CSS_HANDLES)
    const spanRef = useRef<HTMLSpanElement>(null);
    const { setPage, formData, setStateFormData, checkString } = useContext(PagesContext)
    const [nameIsValid, setNameIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [checkIsValid, setCheckIsValid] = useState(false)
    const { loading, session }: UseRenderSession = useRenderSession()
    
    useEffect(() => {
      if (spanRef.current) {
        spanRef.current.innerHTML = checkString;
      }
    }, []);
    useEffect(() => {
      if(!loading && session){
        let isUpdate = false;
        let emailUpdate = ""
        if (session.namespaces.profile?.isAuthenticated?.value === "true") {
          if(session.namespaces.profile?.email?.value && session.namespaces.profile?.email?.value !== "" 
              && formData.email ===""){

                isUpdate = true;
                emailUpdate = session.namespaces.profile?.email?.value;
          }
        }
        if(isUpdate){
          setStateFormData({...formData, email: emailUpdate}, false)
        }else{
          setStateFormData(formData, false)
        }
      }
    }, [loading, session])
    
  useEffect(() => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(formData.name.length > 3){
      setNameIsValid(true)
    }else{
      setNameIsValid(false)
    }
    if(regex.test(formData.email)){
      setEmailIsValid(true)
    }else{
      setEmailIsValid(false)
    }
    if(formData.checkTerm){
      setCheckIsValid(true)
    }else{
      setCheckIsValid(false)
    }
  }, [formData])
  
    const changeName = (value:string) =>{
      const regex = /^(?:[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?:\s|$))+$/u;
      if(regex.test(value) && (value.length < 60))
        setStateFormData({...formData, name: value})
    }
    const changeEmail = (value:string) =>{
      setStateFormData({...formData, email: value})
    }
    const changeCheckbox = () =>{
      setStateFormData({...formData, checkTerm: !formData.checkTerm})
    }

  return (
    <div className={handles.card}>
        <ButtonBack onClickBtn={()=>setPage(Pages.PageStart)}/>
      {/* <h3 className={handles.text__h3}>¡Queremos conocerte!</h3>
      <div className={handles.content__text}>
        <p className={handles.text__p2}>Ingresa la siguiente información</p>
      </div> */}
      <div className={handles.content__Items}>
        <img src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/5cf372c0-609e-4e24-a687-4bb612da9859___38a25ec2b4dc9bb2332781a0bb91c853.png'/>

      </div>
      <Input placeholder='Tu nombre' type='text' value={formData.name} onChangeValue={changeName} />
      <Input placeholder='Tu correo electrónico' type='email' value={formData.email} onChangeValue={changeEmail} />

      <div className={handles.card__checkbox}>
        <label className={handles.itemLabel}>
              <input onChange={changeCheckbox} className={`${applyModifiers(handles.itemInput, formData.checkTerm ? 'checked' : '')}`}
              type="checkbox" checked={formData.checkTerm} />
              <span className={handles.checkTermSpan} ref={spanRef}/>
          </label>
      </div>
      <div className={handles.content__button}>
        <Button text='Cancelar' secondary onClickBtn={()=>setPage(Pages.PageStart)} />
        <Button text='Siguiente' onClickBtn={()=>setPage(Pages.PageType)} disabled={!(nameIsValid && emailIsValid && checkIsValid)} />
      </div>
    </div>
  )
}
