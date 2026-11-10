import { Link } from 'react-router'

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Back to Discover</Link>
    </>
  )
}

export default NotFound