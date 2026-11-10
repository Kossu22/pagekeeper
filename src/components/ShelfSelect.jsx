import Dropdown from 'react-bootstrap/Dropdown'
import { SHELVES } from '../data/shelves'
import { useShelves } from '../hooks/useShelves'

function ShelfSelect({ book, size = 'sm' }) {
  const { getShelf, setShelf, removeBook } = useShelves()
  const currentShelf = getShelf(book.id)
  const currentLabel = SHELVES.find((shelf) => shelf.id === currentShelf)?.label

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
            onClick={() => setShelf(book, shelf.id)}
          >
            {shelf.label}
          </Dropdown.Item>
        ))}

        {currentShelf && (
          <>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger" onClick={() => removeBook(book.id)}>
              Remove from library
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ShelfSelect