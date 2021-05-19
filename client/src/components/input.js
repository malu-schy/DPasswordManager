import * as React from 'react'

export function Input(props) {
  const { onChange, label, type = 'text' } = props

  return (
    <div className="InputBox">
      <label>{label}</label>
      <input type={type} className="Input" onChange={onChange}></input>
    </div>
  )
}
