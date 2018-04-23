import { isDigit, isOperator } from './utils'

type Expression = string[]

const getLastIndex  = ( expression: Expression ): number => expression.length - 1

const getLastItem = ( expression: Expression ): string => expression[getLastIndex(expression)]

const getLastData = ( expression: Expression ): { lastItem: string, lastIndex: number } => {
  return {
    lastIndex: getLastIndex(expression),
    lastItem: getLastItem(expression)
  }
}

const getLastChar = ( expression: Expression ): string => {
  const lastItem = getLastItem(expression)
  return lastItem.charAt(lastItem.length - 1)
}

const hasResult = ( expression: Expression ): boolean => {
  return expression.length > 3 && expression[expression.length - 2] === '='
}

const handleDecimal = ( expression: Expression ): Expression => {
  const { lastIndex, lastItem } = getLastData(expression)
  if ( lastItem === '0' ) {
    return [
      ...expression.slice(0, lastIndex),
      '0.'
    ]
  } else if ( isOperator(lastItem) ) {
    return [
      ...expression,
      '0.'
    ]
  } else if ( hasResult(expression) ) {
    if ( lastItem.includes('.') ) {
      return [ lastItem ]
    } else {
      return [ lastItem + '.' ]
    }
  } else if ( !lastItem.includes('.') ) {
    return [
      ...expression.slice(0, lastIndex),
      lastItem + '.'
    ]
  } else {
    return expression
  }
}

const handleDelete = ( expression: Expression ): Expression => {
  if ( hasResult( expression ) ) {
    return [ '0' ]
  }

  const { lastIndex, lastItem } = getLastData(expression)
  if ( isOperator(lastItem) ) {
    return expression.slice(0, lastIndex)
  }

  const trimmed = lastItem.slice(0, lastItem.length - 1)
  if ( trimmed === '-' ) {
    if ( expression.length === 1 ) { 
      return ['0']
    } else {
      return expression.slice(0, lastIndex)
    }
  } else if ( trimmed.length === 0 ) {
    if ( expression.length === 1 ) {
      return ['0']
    } else {
      return expression.slice(0, lastIndex)
    }
  } else {
    return [
      ...expression.slice(0, lastIndex),
      trimmed
    ]
  }
}

const handleDigit = ( expression: Expression, digit: string ): Expression => {
  if ( hasResult(expression) ) {
    return [ digit ]
  }

  const { lastIndex, lastItem } = getLastData(expression)
  if ( lastItem === '0' ) {
    return [
      ...expression.slice(0, lastIndex),
      digit
    ]
  }

  const lastChar = getLastChar(expression)
  if ( isDigit(lastChar) || lastChar === '.' ) {
    return [
      ...expression.slice(0, lastIndex),
      lastItem + digit
    ]
  } else if ( isOperator(lastChar) ) {
    return [
      ...expression,
      digit
    ]
  } else {
    return expression
  }
}

const handleOperator = ( expression: Expression, operator: string ): Expression => {
  const { lastIndex, lastItem } = getLastData(expression)
  if ( hasResult(expression) ) {
    return [
      lastItem, operator
    ]
  } else if ( isOperator(lastItem) ) {
    return [
      ...expression.slice(0, lastIndex),
      operator
    ]
  } else {
    return [
      ...expression, operator
    ]
  }
}

const makePercentage = ( item: string ): string => {
  return `${parseFloat(item) / 100}`
}
const handlePercentage = ( expression: Expression ): Expression => {
  const { lastIndex, lastItem } = getLastData(expression)
  if ( isOperator(lastItem) || lastItem === '0' || lastItem === '0.' ) {
    return expression
  } else if ( hasResult(expression) ) {
    return [makePercentage(lastItem)]
  } else {
    return [
      ...expression.slice(0, lastIndex),
      makePercentage(lastItem)
    ]
  }
}

const togglePlusMinus = (item: string): string => {
  return item.charAt(0) === '-'
    ? item.slice(1) : '-' + item
}

const handlePlusMinus = ( expression: Expression ): Expression => {
  const { lastItem, lastIndex } = getLastData(expression)

  if ( isOperator(lastItem) || lastItem === '0' ) {
    return expression
  } else if ( hasResult(expression) ) {
    return [ togglePlusMinus(lastItem) ]
  } else {
    const sliced = expression.slice(0, lastIndex)
    return [ ...sliced, togglePlusMinus(lastItem) ]
  }
}

const parse = ( expression: Expression ): string => {
  const { lastIndex, lastItem } = getLastData(expression)
  if ( isOperator(lastItem) ) {
    return parse(expression.slice(0, lastIndex))
  } else {
    const result = expression.map<string | number>(item => {
      return isNaN(parseFloat(item)) ? item : parseFloat(item)
    }).reduce<Array<string | number>>(
      (acc, curr, idx, arr) => {
        if ( idx === 0 ) {
          return [curr]
        } else if ( curr === '+' || curr === '-' ) {
          return [ ...acc, curr ]
        } else if ( curr === 'x' || curr === '/' ) {
          const op1 = acc[acc.length - 1] as number
          const op2 = arr[idx + 1] as number
          const val = curr === 'x' 
            ? op1 * op2 : op1 / op2
          return [ ...acc.slice(0, acc.length - 1), val ]
        } else if ( idx === arr.length - 1 && acc[acc.length - 1] === '+' || acc[acc.length - 1] === '-') {
          return [ ...acc, curr ]
        }
        return [ ...acc ]
    },[ ]).reduce<number>(
      (acc, curr, idx, arr) => { 
        if ( idx === 0 ) {
          return curr as number
        } else if ( curr === '+' || curr === '-' ) {
          const op = arr[idx + 1] as number
          if ( curr === '+' ) {
            return acc + op
          } else if ( curr === '-' ) {
            return acc - op
          }
        }
        return acc
    }, 0)
    return `${result}`
  }
}

const handleEquals = ( expression: Expression ): Expression => {
  const lastItem = getLastItem(expression)
  if ( hasResult(expression) ) {
    return [lastItem]
  } else if ( expression.length === 1 ) {
    return expression
  } else {
    return [
      ...expression,
      '=',
      parse(expression)
    ]
  }
}

const nextExpression = ( expression: Expression, input: string ): Expression => {
  if ( isDigit(input) ) {
    return handleDigit(expression, input)
  } else if ( isOperator(input) ) {
    return handleOperator(expression, input)
  } else if ( input === '.' ) {
    return handleDecimal(expression)
  } else if ( input === 'DEL' ) {
    return handleDelete(expression)
  } else if ( input === '%' ) {
    return handlePercentage(expression)
  } else if ( input === '+/-' ) {
    return handlePlusMinus(expression)
  } else if ( input === '=' ) {
    return handleEquals(expression)
  } else {
    return ['ERROR']
  }
}

export default class Logic {
  private currentExpression: Expression = ['0']
  constructor() {
    this.currentExpression = ['0']
  }

  public get expression(): Expression {
    return this.currentExpression
  }

  public update(input: string): Expression  {
    return this.currentExpression = nextExpression(this.currentExpression, input)
  }
}