import { useState, useEffect } from 'react';
import { FormDataI } from '../typings/types';
import { formDataInit } from '../context/Context';
export const useLocalStorageFormDataFilters = (itemName = 'formDataFilters', initialValue = formDataInit) => {
    
  const [formDataFilters, setFormDataFilters] = useState<FormDataI>(initialValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    const localStorageItems = localStorage.getItem(itemName);
    if(localStorageItems){
        const items:FormDataI = JSON.parse(localStorageItems)
        setFormDataFilters(items)
    }else{
        localStorage.setItem(itemName, JSON.stringify(initialValue));
    }
  }, [])
  useEffect(() => {
    function check(storeItems:any) {
      if (storeItems.key === itemName) {
          const items:FormDataI = JSON.parse(storeItems.newValue)
          setFormDataFilters(items)
      }
    }
    window.addEventListener('storage', check);
    return () => {
      window.removeEventListener('storage', check);
    }
  }, [])
  
  
  const saveFormDataFilters = (fromData:FormDataI) => {
    
    try {
        setFormDataFilters(fromData)
        const stringifiedItem = JSON.stringify(fromData);
        localStorage.setItem(itemName, stringifiedItem);
    } catch(error) {
      setError(error);
    }
  };
  return {
    saveFormDataFilters,
    formDataFilters,
    error
  }
}
