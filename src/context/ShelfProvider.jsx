import { useEffect, useReducer } from 'react'
import { ShelfContext } from './ShelfContext'

const STORAGE_KEY = 'pagekeeper-library'

function loadLibrary() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function libraryReducer(library, action) {
  switch (action.type) {
    case 'setShelf': {
      const { book, shelf } = action
      const existing = library[book.id]
      const now = new Date().toISOString()

      return {
        ...library,
        [book.id]: {
          ...book,
          shelf,
          addedAt: existing?.addedAt ?? now,
          finishedAt: shelf === 'finished' ? (existing?.finishedAt ?? now) : null,
        },
      }
    }
    case 'remove': {
      const next = { ...library }
      delete next[action.id]
      return next
    }
    default:
      return library
  }
}

function ShelfProvider({ children }) {
  const [library, dispatch] = useReducer(libraryReducer, undefined, loadLibrary)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(library))
    } catch (err) {
      console.error('Could not save library', err)
    }
  }, [library])

  const value = {
    library,
    getShelf: (id) => library[id]?.shelf ?? null,
    setShelf: (book, shelf) => dispatch({ type: 'setShelf', book, shelf }),
    removeBook: (id) => dispatch({ type: 'remove', id }),
  }

  return <ShelfContext.Provider value={value}>{children}</ShelfContext.Provider>
}

export default ShelfProvider