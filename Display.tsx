import * as React from 'react'

interface IDisplayProps {
  value: string
  maxLength: number
}

const formatValue = (value: string, maxLength: number): string => {
  if ( value.length <= maxLength ) {
    return value
  }
  return value.slice(0, maxLength - 2) + '...'
}

export default (props: IDisplayProps): JSX.Element => {
  return (
    <div>
      <p
        style={{
          fontSize: '40px',
          fontWeight: 100,
          paddingBottom: '8px',
          paddingRight: '8px',
          paddingTop: '24px',
          textAlign: 'right'
        }}
      >{formatValue(props.value, props.maxLength)}</p>
    </div>
  )
}