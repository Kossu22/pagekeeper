import { Link } from 'react-router'
import Card from 'react-bootstrap/Card'
import { getCoverUrl } from '../api/openLibrary'
import ShelfSelect from './ShelfSelect'

function BookCard({ book }) {
  const coverUrl = getCoverUrl(book.coverId)
  const detailsUrl = `/book/${book.id}`

  return (
    <Card className="h-100 shadow-sm">
      {/* Cover is a duplicate link, so it is hidden from keyboard and screen readers */}
      <Link to={detailsUrl} tabIndex={-1} aria-hidden="true">
        {coverUrl ? (
          <Card.Img variant="top" src={coverUrl} alt="" className="book-cover" loading="lazy" />
        ) : (
          <div className="book-cover book-cover-placeholder">No cover</div>
        )}
      </Link>
      <Card.Body>
        <Card.Footer className="bg-transparent border-0 p-0">
            <ShelfSelect book={book} />
        </Card.Footer>
        <Card.Title as="h2" className="h6 mb-1">
          <Link to={detailsUrl} className="text-reset text-decoration-none">
            {book.title}
          </Link>
        </Card.Title>
        <Card.Text className="text-muted small mb-0">
          {book.author}
          {book.year && ` · ${book.year}`}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default BookCard