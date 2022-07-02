const regStringFn = /(.+?)\((.+?)\)/;
const regString = /\'(.+?)\'/;

export function getFirstChild(node) {
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType === 1) {
      return childNodes[i];
    }
  }
}

export function checkExpressionHasDate(data, expression) {
  for (let key in data) {
    if (expression.includes(key) && expression !== key) {
      return {
        key,
        expression,
      };
    } else if (expression === kye) {
      return {
        key,
        expression: key,
      };
    } else {
      return null;
    }
  }
}

export function checkFunctionHasArgs(str) {
  const matched = str.match(regStringFn);

  if (matched) {
    const argArr = matched[2].split(',');
    const args = checkIsString(matched[2])
      ? matched[2].split(',') // ['1']
      : argArr.map((item) => Number(item));
    return {
      methodName: matched[1],
      args,
    };
  }
}

export function checkIsString(str) {
  return str.match(regString);
}
