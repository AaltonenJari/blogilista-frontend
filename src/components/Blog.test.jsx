import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'
import { test } from 'vitest'

test('blogin tiedot sekä tykkäysten määrä näytetään kirjautumattomalle käyttäjälle, nappeja ei näytetä', () => {
  const blog = {
    id: '123',
    title: 'Testiblogi',
    author: 'Testikirjoittaja',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: '456',
      name: 'Testikäyttäjä'
    }
  }

  render(
    <MemoryRouter>
      <Blog blog={blog} />
    </MemoryRouter>
  )

  expect(screen.getByText('Testikirjoittaja: Testiblogi')).toBeInTheDocument()
  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText('likes 5')).toBeInTheDocument()
  expect(screen.getByText('Added by Testikäyttäjä')).toBeInTheDocument()

  const likeButton = screen.queryByRole('button', { name: /like/i })
  expect(likeButton).not.toBeInTheDocument()

  const removeButton = screen.queryByRole('button', { name: /remove/i })
  expect(removeButton).not.toBeInTheDocument()
})

test('kirjautuneelle käyttäjälle, joka ei ole blogin luoja näytetään ainoastaan tykkäysnappi', () => {
  const blog = {
    id: '123',
    title: 'Testiblogi',
    author: 'Testikirjoittaja',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: '456',
      name: 'Testikäyttäjä'
    }
  }

  render(
    <MemoryRouter>
      <Blog blog={blog} userid="999" />
    </MemoryRouter>
  )

  expect(screen.getByText('Testikirjoittaja: Testiblogi')).toBeInTheDocument()
  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText('likes 5')).toBeInTheDocument()
  expect(screen.getByText('Added by Testikäyttäjä')).toBeInTheDocument()

  const likeButton = screen.getByRole('button', { name: /like/i })
  expect(likeButton).toBeVisible()

  const removeButton = screen.queryByRole('button', { name: /remove/i })
  expect(removeButton).not.toBeInTheDocument()
})

test('blogin luojalle näytetään sekä tykkäys- että poistonappi', () => {
  const blog = {
    id: '123',
    title: 'Testiblogi',
    author: 'Testikirjoittaja',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: '456',
      name: 'Testikäyttäjä'
    }
  }

  render(
    <MemoryRouter>
      <Blog blog={blog} userid="456" />
    </MemoryRouter>
  )

  expect(screen.getByText('Testikirjoittaja: Testiblogi')).toBeInTheDocument()
  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText('likes 5')).toBeInTheDocument()
  expect(screen.getByText('Added by Testikäyttäjä')).toBeInTheDocument()

  const likeButton = screen.getByRole('button', { name: /like/i })
  expect(likeButton).toBeVisible()

  const removeButton = screen.getByRole('button', { name: /remove/i })
  expect(removeButton).toBeVisible()
})