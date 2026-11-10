import Container from 'react-bootstrap/Container'
import Footer from './components/Footer'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 py-4">
        <Container>
          <h1>Pagekeeper</h1>
          <p className="text-muted">Your personal reading tracker.</p>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App