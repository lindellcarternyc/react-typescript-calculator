import * as React from 'react'

import CalculatorLogic from './logic'

import Buttons from './Buttons'
import Display from './Display'
import OperationDisplay from './OperationDisplay'

interface ICalculatorState {
  logic: CalculatorLogic
  lastClicked: string
}
export default class Calculator extends React.Component<{}, ICalculatorState> {
  private readonly MAX_VALUE_LENGTH = 12

  constructor(props: {}) {
    super(props)

    this.state = {
      lastClicked: '',
      logic: new CalculatorLogic()
    }
  }

  
  public render() {
    const { logic, lastClicked } = this.state
    const expression = logic.expression
    return (
      <div
        style={{
          background: 'black',
          color: 'white',
          height: '100vh',
          margin: '0 auto',
          maxHeight: '500px',
          maxWidth: '300px',
          padding: '8px',
          width: '100vw'
        }}
      >
        <OperationDisplay expression={expression}/>
        <Display value={expression[expression.length - 1]} maxLength={this.MAX_VALUE_LENGTH} />
        <Buttons 
          lastClicked={lastClicked}
          onClickDecimal={this.onClickDecimal}
          onClickDigit={this.onClickDigit}
          onClickEquals={this.onClickEquals}
          onClickOperator={this.onClickOperator}
          onClickSpecialOperator={this.onClickSpecialOperator}
        />
      </div>
    )
  }

  private onClickDigit = (digit: string) => {
    return this.setState(({ lastClicked, logic }) => {
      logic.update(digit)
      return {
        lastClicked: digit,
        logic
      }
    })
  }

  private onClickDecimal = () => {
    return this.setState(({ lastClicked, logic }) => {
      logic.update('.')
      return {
        lastClicked: '',
        logic
      }
    })
  }

  private onClickEquals = () => {
    return this.setState(({ logic }) => {
      logic.update('=')
      return { logic }
    })
  }

  private onClickOperator = (operator: string) => {
    return this.setState(({ lastClicked, logic }) => {
      logic.update(operator)
      return {
        lastClicked: operator,
        logic
      }
    })
  }

  private onClickSpecialOperator = (specialOperator: string) => {
    this.setState(({ lastClicked, logic }) => {
      logic.update(specialOperator)
      return { lastClicked: '', logic }
    })
  }
}