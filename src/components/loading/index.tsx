import React from 'react'
import { Spin } from 'antd'

const loadingStyle = {
  position: 'absolute',
  left: '50%',
  top: '30%'
} as React.CSSProperties

export default function Loading() {
  return (
    <>
      <div style={loadingStyle}>
        <Spin size="large" tip="Loading..." />
      </div>
    </>
  )
}
