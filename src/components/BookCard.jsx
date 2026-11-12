import { Link } from 'react-router'
import Card from 'react-bootstrap/Card'
import { getCoverUrl } from '../api/openLibrary'
import ShelfSelect from './ShelfSelect'

function BookCard({ book }) {
  const coverUrl = getCoverUrl(book.coverId)

  return (
    <Card className="h-100 shadow-sm">
      <Link to={`/book/${book.id}`} className="text-reset text-decoration-none flex-grow-1">
        {coverUrl ? (
          <Card.Img variant="top" src={coverUrl} alt="" className="book-cover" loading="lazy" />
        ) : (
          <div className="book-cover book-cover-placeholder" aria-hidden="true">
            No cover
          </div>
        )}
        <Card.Body>
          <Card.Title as="h2" className="h6 mb-1">
            {book.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-0">
            {book.author}
            {book.year && ` · ${book.year}`}
          </Card.Text>
        </Card.Body>
      </Link>

      <Card.Footer className="bg-transparent border-0 pt-0">
        <ShelfSelect book={book} />
      </Card.Footer>
    </Card>
  )
}

export default BookCard