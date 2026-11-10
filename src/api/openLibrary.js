const BASE_URL = 'https://openlibrary.org'
const COVERS_URL = 'https://covers.openlibrary.org/b/id'

export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    limit: '20',
    fields: 'key,title,author_name,first_publish_year,cover_i',
  })

  const response = await fetch(`${BASE_URL}/search.json?${params}`)

  if (!response.ok) {
    throw new Error(`Open Library search failed with status ${response.status}`)
  }

  const data = await response.json()

  return data.docs.map((doc) => ({
    id: doc.key.replace('/works/', ''),
    title: doc.title,
    author: doc.author_name?.[0] ?? 'Unknown author',
    year: doc.first_publish_year ?? null,
    coverId: doc.cover_i ?? null,
  }))
}

export function getCoverUrl(coverId, size = 'M') {
  if (!coverId) return null
  return `${COVERS_URL}/${coverId}-${size}.jpg`
}