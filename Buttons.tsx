import * as React from 'react'

import Button, { DecimalButton, DigitButton, EqualsButton, OperatorButton } from './Button'

interface IButtonsProps {
  lastClicked: string
  onClickDecimal: () => void
  onClickDigit: (digit: string) => void
  onClickEquals: () => void
  onClickOperator: (operator: string) => void
  onClickSpecialOperator: (specialOperator: string) => void
}
export default (props: IButtonsProps): JSX.Element => {
  const { 
    lastClicked,
    onClickDigit, onClickDecimal, 
    onClickEquals, onClickOperator,
    onClickSpecialOperator
  } = props
  return (
    <div 
      style={{
        display: 'grid',
        gridGap: '8px',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        height: 'calc(100% - 100px)',
        padding: '8px',
        position: 'relative'
      }}
    >
      <Button text='DEL' onClick={onClickSpecialOperator}/>
      <Button text='+/-' onClick={onClickSpecialOperator}/>
      <Button text='%' onClick={onClickSpecialOperator}/>
      <OperatorButton text='/' 
        isCurrent={lastClicked === '/'} 
        onClick={onClickOperator}
      />

      <DigitButton text='7' onClick={onClickDigit} isLastClicked={lastClicked === '7'} />
      <DigitButton text='8' onClick={onClickDigit} isLastClicked={lastClicked === '8'} />
      <DigitButton text='9' onClick={onClickDigit} isLastClicked={lastClicked === '9'} />
      <OperatorButton text='x' 
        isCurrent={lastClicked === 'x'} 
        onClick={onClickOperator} 
      />

      <DigitButton text='4' onClick={onClickDigit} isLastClicked={lastClicked === '4'} />
      <DigitButton text='5' onClick={onClickDigit} isLastClicked={lastClicked === '5'} />
      <DigitButton text='6' onClick={onClickDigit} isLastClicked={lastClicked === '6'} />
      <OperatorButton text='+' 
        isCurrent={lastClicked === '+'} 
        onClick={onClickOperator} 
      />

      <DigitButton text='1' onClick={onClickDigit} isLastClicked={lastClicked === '1'} />
      <DigitButton text='2' onClick={onClickDigit} isLastClicked={lastClicked === '2'} />
      <DigitButton text='3' onClick={onClickDigit} isLastClicked={lastClicked === '3'} />
      <OperatorButton text='-' 
        isCurrent={lastClicked === '-'} 
        onClick={onClickOperator} 
      />

      <DigitButton text='0' long onClick={onClickDigit} />
      <DecimalButton onClick={onClickDecimal} />
      <EqualsButton onClick={onClickEquals} />
    </div>
  )
}