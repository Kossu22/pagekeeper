import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { Search } from 'react-bootstrap-icons'
import { searchBooks } from '../api/openLibrary'
import BookCard from '../components/BookCard'

function Discover() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)

    try {
      const results = await searchBooks(trimmed)
      setBooks(results)
    } catch (err) {
      console.error(err)
      setBooks([])
      setError('Could not reach Open Library. Check your connection and try again.')
    } finally {
      setLoading(false)
      setHasSearched(true)
    }
  }

  return (
    <>
      <h1>Discover</h1>
      <p className="text-muted">Search for books and add them to your shelves.</p>

      <Form onSubmit={handleSubmit} className="mb-4" role="search">
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Search by title or author"
            aria-label="Search books"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button type="submit" disabled={loading}>
            <Search aria-hidden="true" className="me-1" /> Search
          </Button>
        </InputGroup>
      </Form>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && hasSearched && books.length === 0 && (
        <p className="text-muted">No books found. Try a different search.</p>
      )}

      {!loading && books.length > 0 && (
        <Row xs={2} sm={3} md={4} lg={5} className="g-3">
          {books.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Discover