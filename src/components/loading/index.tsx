import { Spin } from 'antd'
import React from 'react'

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
