import * as React from 'react'

export default (props: { expression: string[] }): JSX.Element => {
  return (
    <div
      style={{
        color: 'white',
        textAlign: 'right'
      }}
    >{props.expression.join(' ')}</div>
  )
}