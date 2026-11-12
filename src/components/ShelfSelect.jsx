import Dropdown from 'react-bootstrap/Dropdown'
import toast from 'react-hot-toast'
import { SHELVES } from '../data/shelves'
import { useShelves } from '../hooks/useShelves'

function ShelfSelect({ book, size = 'sm' }) {
  const { getShelf, setShelf, removeBook } = useShelves()
  const currentShelf = getShelf(book.id)
  const currentLabel = SHELVES.find((shelf) => shelf.id === currentShelf)?.label

  function handleSelect(shelf) {
    if (shelf.id === currentShelf) return
    setShelf(book, shelf.id)
    toast.success(
      currentShelf
        ? `Moved "${book.title}" to ${shelf.label}`
        : `Added "${book.title}" to ${shelf.label}`,
    )
  }

  function handleRemove() {
    removeBook(book.id)
    toast(`Removed "${book.title}" from your library`)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        size={size}
        variant={currentShelf ? 'success' : 'outline-primary'}
        className="w-100"
      >
        {currentLabel ?? 'Add to shelf'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {SHELVES.map((shelf) => (
          <Dropdown.Item
            key={shelf.id}
            active={shelf.id === currentShelf}
            onClick={() => handleSelect(shelf)}
          >
            {shelf.label}
          </Dropdown.Item>
        ))}

        {currentShelf && (
          <>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger" onClick={handleRemove}>
              Remove from library
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ShelfSelect