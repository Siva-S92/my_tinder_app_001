import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function HomePage() {
  const { logout } = useAuthStore();
  return (
    <div>
      HomePage
      <button onClick={logout} type="button">logout</button>
    </div>
  )
}

export default HomePage