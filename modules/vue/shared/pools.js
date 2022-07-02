import { checkExpressionHasDate, checkFunctionHasArgs } from './utils';
import { vEvent } from './propTypes';

export const eventPool = new Map();
export const expPool = new Map();

/**
 * [
 *  {
 *   h1: {
 *      key: count,
 *      expression: key?
 *    }
 *  }
 * ]
 * [
 *  button: {
 *     type: click,
 *     handler: methods.plus.bind(vm, ...args)
 *   }
 * ]
 *
 */

const regExpr = /\{\{(.+?)\}\}/;

export default function (vm, methods) {
  const { $nodes, $data } = vm;
  const allNodes = $nodes.querySelectorAll('*');
  const { vClick } = vEvent;

  allNodes.forEach((node) => {
    const vExpression = node.textContent;
    const exprMatched = vExpression.match(regExpr);
    const vClickValue = node.getAttribute(`@${vClick}`);

    if (exprMatched) {
      const poolInfo = checkExpressionHasDate($data, exprMatched[1].trim());
      poolInfo && expPool.set(node, poolInfo);
    }

    if (vClickValue) {
      const fnInfo = checkFunctionHasArgs(vClickValue);
      const handler = fnInfo
        ? methods[fnInfo.methodName].bind(vm, ...fnInfo.args)
        : methods[vClickValue].bind(vm);

      eventPool.set(node, {
        type: vClick,
        handler,
      });
      node.removeAttribute(`@${vClick}`);
    }
  });
}
