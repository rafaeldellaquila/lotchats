import { useState, useCallback } from 'react'

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle: () => void = useCallback(() => {
    setValue(v => !v)
  }, [])

  return [value, toggle]
}
