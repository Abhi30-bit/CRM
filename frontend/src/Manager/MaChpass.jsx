import React from 'react'
import Chpass from '../Component/Chpass'

function MaChpass() {
  return (
    <div>
            <Chpass id={localStorage.getItem('Manager')} role="Manager" />
      
    </div>
  )
}

export default MaChpass
