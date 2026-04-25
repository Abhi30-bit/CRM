import React from 'react'
import Chpass from '../Component/Chpass'

function CoChpass() {
  return (
    <div>
      <Chpass id={localStorage.getItem('Counselor')} role="Counselor" />
    </div>
  )
}

export default CoChpass
