export const isDigit = (input?: string): boolean => {
  return input !== undefined 
    && input.length === 1 
    && parseInt(input, 10) >= 0
}

export const isOperator = (input?: string) => {
  return input !== undefined && input.length === 1 && 
  ['+', '-', 'x', '/'].find(op => op === input) !== undefined
}