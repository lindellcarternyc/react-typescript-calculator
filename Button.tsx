import * as React from 'react'

const DARK_GREY = '#2e3438'
const LIGHT_GREY = '#41464a'
const DARK_RED = '#c73e1d'
const LIGHT_ORANGE = '#c59849'

const stx = (args: { backgroundColor?: string, color?: string, long?: boolean }) => {
  return {
    backgroundColor: args.backgroundColor,
    border: '0',
    color: args.color,
    fontSize: '1.5rem',
    gridColumnEnd: args.long ? 'span 2' : undefined,
    lineHeight: '2rem',
    outline: 'none',
  }
}

interface IButtonProps {
  backgroundColor?: string
  color?: string
  text: string
  long?: boolean
  onClick: (text: string) => void
}
const Button = (props: IButtonProps) => {
  const { backgroundColor, color, long, text } = props
  const onClick = () => {
    props.onClick(props.text)
  }
  return (
    <button
      style={stx({backgroundColor, color, long})}
      onClick={onClick}
    >{text}</button>
  )
}

interface IDigitButtonProps extends IButtonProps {
  isLastClicked?: boolean
}
export const DigitButton = (props: IDigitButtonProps): JSX.Element => {
  const buttonProps = {
    ...props,
    backgroundColor: props.isLastClicked ? LIGHT_GREY : DARK_GREY,
    color: 'white'
  }
  return <Button { ...buttonProps }/>
}

export const DecimalButton = (props: { onClick: () => void }) => {
  const buttonProps: IButtonProps = {
    ...props,
    backgroundColor: DARK_GREY,
    color: 'white',
    text: '.'
  }
  return <Button { ...buttonProps } />
}

interface IOperatorButtonProps extends IButtonProps {
  isCurrent?: boolean
}
export const OperatorButton = (props: IOperatorButtonProps): JSX.Element => {

  const buttonProps = {
    ...props,
    backgroundColor: props.isCurrent ? LIGHT_ORANGE : DARK_RED,
    color: 'white'
  }
  return <Button { ...buttonProps }/>
}

export const EqualsButton = (props: { onClick: () =>  void }): JSX.Element => {
  return <OperatorButton text='=' onClick={props.onClick} />
}

export default Button