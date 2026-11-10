import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function ErrorMessage({ message, onRetry }) {
  return (
    <Alert variant="danger" className="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <span>{message}</span>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Alert>
  )
}

export default ErrorMessage