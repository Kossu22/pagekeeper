import { useContext } from 'react'
import { ShelfContext } from '../context/ShelfContext'

export function useShelves() {
  const context = useContext(ShelfContext)
  if (!context) {
    throw new Error('useShelves must be used inside ShelfProvider')
  }
  return context
}