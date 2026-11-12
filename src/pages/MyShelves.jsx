import { Link, useSearchParams } from 'react-router'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import { SHELVES } from '../data/shelves'
import { useShelves } from '../hooks/useShelves'
import BookCard from '../components/BookCard'

function MyShelves() {
  const { library } = useShelves()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedShelf = searchParams.get('shelf')
  const activeShelf = SHELVES.some((shelf) => shelf.id === requestedShelf)
    ? requestedShelf
    : SHELVES[0].id

  const books = Object.values(library)
  const countFor = (shelfId) => books.filter((book) => book.shelf === shelfId).length
  const shelfBooks = books
    .filter((book) => book.shelf === activeShelf)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))

  return (
    <>
      <h1>My Shelves</h1>

      {books.length === 0 ? (
        <p className="text-muted">
          Your library is empty. <Link to="/">Search for books</Link> to start building your shelves.
        </p>
      ) : (
        <>
          <p className="text-muted">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your library
          </p>

          <Nav
            variant="pills"
            activeKey={activeShelf}
            onSelect={(key) => setSearchParams({ shelf: key }, { replace: true })}
            className="mb-4 flex-nowrap overflow-auto pb-1"
          >
            {SHELVES.map((shelf) => (
              <Nav.Item key={shelf.id}>
                <Nav.Link eventKey={shelf.id} className="text-nowrap">
                  {shelf.label}{' '}
                  <Badge bg="secondary" pill>
                    {countFor(shelf.id)}
                  </Badge>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {shelfBooks.length === 0 ? (
            <p className="text-muted">
              No books on this shelf yet. <Link to="/">Find books to add</Link>.
            </p>
          ) : (
            <Row xs={2} sm={3} md={4} lg={5} className="g-3">
              {shelfBooks.map((book) => (
                <Col key={book.id}>
                  <BookCard book={book} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default MyShelves