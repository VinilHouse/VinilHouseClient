import { atom } from 'recoil';

const aptCodeState = atom({
  key: 'aptCodeState',
  default: false,
});

const modalVisibleState = atom({
  key: 'modalVisibleState',
  default: false,
});

export { aptCodeState, modalVisibleState };
