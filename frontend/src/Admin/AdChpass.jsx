import React from 'react'
import Chpass from '../Component/Chpass'

export default function AdChpass() {
  return (
    <div>
        <h3>Admin</h3>
      <Chpass id={localStorage.getItem('admin')} role="admin" />
    </div>
  )
}
