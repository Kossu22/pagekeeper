import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { ArrowLeft } from 'react-bootstrap-icons'
import { getBookDetails, getCoverUrl } from '../api/openLibrary'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import ShelfSelect from '../components/ShelfSelect'

function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState({ id: null, book: null, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getBookDetails(id, controller.signal)
      .then((book) => setResult({ id, book, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        console.error(err)
        setResult({ id, book: null, error: err.message === 'NOT_FOUND' ? 'notFound' : 'network' })
      })

    return () => controller.abort()
  }, [id, reloadKey])

  function handleRetry() {
    setResult({ id: null, book: null, error: null })
    setReloadKey((key) => key + 1)
  }

  const loading = result.id !== id
  const { book, error } = result

  return (
    <>
      <Button
        variant="link"
        className="px-0 mb-3 d-inline-flex align-items-center gap-1"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft aria-hidden="true" /> Back
      </Button>

      {loading && <Loader text="Loading book details..." />}

      {!loading && error === 'notFound' && (
        <ErrorMessage message="We couldn't find this book." />
      )}

      {!loading && error === 'network' && (
        <ErrorMessage
          message="Could not load book details. Check your connection and try again."
          onRetry={handleRetry}
        />
      )}

      {!loading && book && (
        <Row className="g-4">
          <Col xs={8} sm={5} md={4} lg={3} className="mx-auto mx-sm-0">
            {book.coverId ? (
              <img
                src={getCoverUrl(book.coverId, 'L')}
                alt={`Cover of ${book.title}`}
                className="book-cover rounded shadow-sm"
              />
            ) : (
              <div className="book-cover book-cover-placeholder rounded">No cover</div>
            )}
          </Col>

          <Col sm={7} md={8} lg={9}>
            <h1 className="mb-1">{book.title}</h1>
            <p className="lead text-muted mb-1">{book.authors.join(', ') || 'Unknown author'}</p>
            {book.year && <p className="text-muted small">First published {book.year}</p>}

            <div className="mb-4" style={{ maxWidth: 260 }}>
              <ShelfSelect
                book={{
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  year: book.year,
                  coverId: book.coverId,
                }}
                size="lg"
              />
            </div>

            <h2 className="h5">Description</h2>
            <p className="book-description">{book.description ?? 'No description available.'}</p>

            {book.subjects.length > 0 && (
              <>
                <h2 className="h5">Subjects</h2>
                <div className="d-flex flex-wrap gap-2">
                  {book.subjects.map((subject) => (
                    <Badge key={subject} bg="secondary" className="fw-normal">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookDetails