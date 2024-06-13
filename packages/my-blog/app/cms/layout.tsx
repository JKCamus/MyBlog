import React from 'react'
import Sidebar from './_component/Sidebar'

const CMSLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default CMSLayout
