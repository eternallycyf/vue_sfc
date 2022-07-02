import { expPool } from './shared/pools';
export function render(vm) {
  expPool.forEach((info, node) => {
    _render(vm, node, info);
  });
}

export function update(vm, key) {
  if (vm.$data.hasOwnProperty(key)) {
    expPool.forEach((info, node) => {
      if (info.key === key) {
        _render(vm, node, info);
      }
    });
  }
}

function _render(vm, node, info) {
  const { expression } = info;
  const r = new Function(
    'vm',
    'node',
    `with(vm){
      node.textContent = ${expression};
    }
  `,
  );
  r(vm, node);
}
