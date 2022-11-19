import React from 'react'
import { ClipLoader } from 'react-spinners'

function Loader() {

  return (
    <div className="loader">
      <ClipLoader color="#5d5d5d" size={50} />
    </div>
  )
}

export default Loader