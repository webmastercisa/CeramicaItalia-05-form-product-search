import React, { useContext, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Pages, PagesContext } from '../../context/Context'
import { Button } from '../Atom/Button'
import { CSS_HANDLES, DATA_LOCATION } from '../../utils/Constants'
import { ButtonBack } from '../Atom/ButtonBack'
//import { Select } from '../Atom/Select'
import Select from 'react-select';

interface SelectData {
  id: string;
  label: string;
}
const dataDepartment = () => {
  return DATA_LOCATION.map((data) => {
    return {
      id: data.department,
      label: data.department
    }
  })
}
const dataCity = (department: string) => {
  const res = DATA_LOCATION.map((data) => {
    return data.department === department ?
      data.cities.map((city) => {
        return {
          id: city,
          label: city
        }
      }) : null
  })
  return res.find((item) => item !== null)
}
export const PageType = () => {
  const initDepartment = dataDepartment()
  const handles = useCssHandles(CSS_HANDLES)
  const { setPage, setStateFormData, formData } = useContext(PagesContext)
  const [selectedOptionDepartment, setSelectedOptionDepartment] = useState<any>();
  const [optionCity, setOptionCity] = useState<SelectData[]>([]);
  const [selectedOptionCity, setSelectedOptionCity] = useState<any>();
  const [validLocation, setValidLocation] = useState(false)

  useEffect(() => {
    if (formData.department.id !== "") {
      if (DATA_LOCATION.some(({ department }) => department === formData.department.id)) {
        setSelectedOptionDepartment(formData.department)
        if (formData.city.id !== "") {
          setSelectedOptionCity(formData.city)
        }
      } else {
        setStateFormData({ ...formData, department: { id: "", label: "" }, city: { id: "", label: "" } }, false);
        return
      }
    }
    if (formData.department.id !== "" && formData.city.id !== "") {
      setValidLocation(true)
    } else {
      setValidLocation(false)
    }
    setStateFormData(formData, false)
  }, [formData])

  const setFormAwait = () => {
    setStateFormData({ ...formData, department: selectedOptionDepartment, city: { id: "", label: "" } });
  }

  useEffect(() => {
    if (selectedOptionDepartment) {
      const dataCitySelect = dataCity(selectedOptionDepartment.id)
      if (dataCitySelect) {
        setFormAwait()
        setSelectedOptionCity(null)
        setOptionCity(dataCitySelect)
      }
    }
  }, [selectedOptionDepartment])

  useEffect(() => {
    if (selectedOptionCity) {
      setStateFormData({ ...formData, city: selectedOptionCity });
    }
  }, [selectedOptionCity])


  return (
    <div className={handles.card}>
      <ButtonBack onClickBtn={() => setPage(Pages.PageUserData)} />
      <div className={handles.content__text}>

        <h4 className={handles.text__h4}>
          <img width="10%" src='https://ceramicaitalia.vtexassets.com/assets/vtex.file-manager-graphql/images/2b19ffbe-fc4f-469b-b1c8-518a869f89b3___28cfb949cb058b25a9aad40e350b0faa.png' />
          ¡Es un placer <strong className={handles.text__h4s}>{formData.name}</strong>!
        </h4>
        <h4 className={handles.text__h4}>Juntos vamos a encontrar el producto ideal para tu proyecto, ¿estás listo?</h4>
      </div>
      <div className={handles.content__text}>
        <p className={handles.text__p3}>¿En que ciudad se realizarás tu proyecto?</p>
      </div>
      <div className={handles.content__type__select}>
        <Select
          isSearchable
          placeholder={<>Seleccionar...</>}
          name="departament"
          onChange={setSelectedOptionDepartment}
          value={selectedOptionDepartment}
          options={initDepartment}
          getOptionValue={(option) => `${option['id']}`}
        />
      </div>
      {optionCity?.length > 0 &&
        <div className={handles.content__type__select}>
          <Select
            isSearchable
            placeholder={<>Seleccionar...</>}
            name="city"
            onChange={setSelectedOptionCity}
            value={selectedOptionCity}
            options={optionCity}
            getOptionValue={(option) => `${option['id']}`}
          />
        </div>}
      <div className={handles.content__button}>
        <Button text='Cancelar' secondary onClickBtn={() => setPage(Pages.PageStart)} />
        <Button text='Siguiente' onClickBtn={() => setPage(Pages.PageArea)} disabled={!validLocation} />
      </div>
    </div>
  )
}
