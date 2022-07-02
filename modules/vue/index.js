import { getFirstChild } from './shared/utils';
import reactive from './reactive';
import pools, { eventPool, expPool } from './shared/pools';

const Vue = {
  createApp,
};

function createApp(component) {
  const vm = {};
  const { template, methods, data } = component;

  vm.mount = mount;
  vm.$nodes = createNode(template);

  const init = () => {
    reactive(vm, data);
    pools(vm, methods);
    console.log(eventPool, expPool);
  };

  init();

  return vm;
}

function createNode(template) {
  const _tempNode = document.createElement('div');
  _tempNode.innerHTML = template;
  return getFirstChild(_tempNode);
}

function mount(el) {
  console.log(el, this);
}

export { createApp };

export default Vue;
