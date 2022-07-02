import { getFirstChild } from './shared/utils';
import reactive from './reactive';

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
    console.log(data);
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
