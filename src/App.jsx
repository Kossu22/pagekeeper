import { Routes, Route } from 'react-router'
import Container from 'react-bootstrap/Container'
import Footer from './components/Footer'
import Discover from './pages/Discover'
import BookDetails from './pages/BookDetails'
import MyShelves from './pages/MyShelves'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 py-4">
        <Container>
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/shelves" element={<MyShelves />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App