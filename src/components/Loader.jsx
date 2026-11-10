import Spinner from 'react-bootstrap/Spinner'

function Loader({ text = 'Loading...' }) {
  return (
    <div className="text-center my-5" role="status">
      <Spinner animation="border" aria-hidden="true" />
      <p className="text-muted mt-2 mb-0">{text}</p>
    </div>
  )
}

export default Loader