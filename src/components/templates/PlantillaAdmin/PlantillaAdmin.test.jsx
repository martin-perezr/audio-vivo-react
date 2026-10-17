import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { PlantillaAdmin } from './PlantillaAdmin'

beforeEach(() => {
  localStorage.clear()
})

function renderizarPanel() {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/admin" element={<PlantillaAdmin><p>Contenido del panel</p></PlantillaAdmin>} />
        <Route path="/login" element={<p>Página de login</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('PlantillaAdmin', () => {
  it('sin sesión de administrador manda al login', () => {
    renderizarPanel()

    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido del panel')).not.toBeInTheDocument()
  })
})