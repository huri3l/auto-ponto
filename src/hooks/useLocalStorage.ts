import { useState, useCallback } from 'react'

const useLocalStorage = (key: any) => {
  const storageValue =
    typeof window !== 'undefined' ? localStorage.getItem(key) : null
  const initValue = storageValue ? JSON.parse(storageValue) : null

  const [value, setValue] = useState(initValue)

  const updatingValue = useCallback(
    newValue => {
      localStorage.setItem(key, JSON.stringify(newValue))
      return setValue(newValue)
    },
    [key]
  )

  const removingValue = useCallback(() => {
    localStorage.removeItem(key)
    return setValue(null)
  }, [key])

  return [
    value,
    (valueToUp: any) => updatingValue(valueToUp),
    () => removingValue()
  ]
}

export default useLocalStorage
