import Card from 'react-bootstrap/Card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { SHELVES } from '../data/shelves'

function ShelfStats({ books }) {
  const data = SHELVES.map((shelf) => ({
    name: shelf.label,
    books: books.filter((book) => book.shelf === shelf.id).length,
  }))

  const currentYear = new Date().getFullYear()
  const finishedThisYear = books.filter((book) =>
    book.finishedAt?.startsWith(String(currentYear)),
  ).length

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title as="h2" className="h5">Library overview</Card.Title>
        <p className="text-muted small">
          {finishedThisYear} {finishedThisYear === 1 ? 'book' : 'books'} finished in {currentYear}
        </p>
        <div style={{ width: '100%', height: 220 }} aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} accessibilityLayer={false}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 13 }} />
              <Tooltip />
              <Bar dataKey="books" fill="#0d6efd" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ShelfStats