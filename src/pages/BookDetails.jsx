import { useParams } from 'react-router'

function BookDetails() {
  const { id } = useParams()

  return (
    <>
      <h1>Book Details</h1>
      <p className="text-muted">Book ID: {id}</p>
    </>
  )
}

export default BookDetails