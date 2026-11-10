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

async function getAuthorName(key, signal) {
  const response = await fetch(`${BASE_URL}${key}.json`, { signal })
  if (!response.ok) return 'Unknown author'
  const data = await response.json()
  return data.name ?? 'Unknown author'
}

export async function getBookDetails(id, signal) {
  const response = await fetch(`${BASE_URL}/works/${id}.json`, { signal })

  if (response.status === 404) {
    throw new Error('NOT_FOUND')
  }
  if (!response.ok) {
    throw new Error(`Open Library request failed with status ${response.status}`)
  }

  const data = await response.json()

  const authorKeys = (data.authors ?? [])
    .slice(0, 3)
    .map((entry) => entry.author?.key)
    .filter(Boolean)
  const authors = await Promise.all(authorKeys.map((key) => getAuthorName(key, signal)))

  const description =
    typeof data.description === 'string' ? data.description : (data.description?.value ?? null)
  const yearMatch = data.first_publish_date?.match(/\d{4}/)

  return {
    id,
    title: data.title,
    author: authors[0] ?? 'Unknown author',
    authors,
    year: yearMatch ? Number(yearMatch[0]) : null,
    coverId: data.covers?.find((cover) => cover > 0) ?? null,
    description,
    subjects: (data.subjects ?? []).slice(0, 8),
  }
}