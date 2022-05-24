import { atom } from 'recoil'

const aptCodeState = atom({
  key: 'aptCodeState',
  default: false,
})

const modalLoginVisibleState = atom({
  key: 'modalLoginVisibleState',
  default: false,
})

const modalRegistVisibleState = atom({
  key: 'modalRegistVisibleState',
  default: false,
})

export {
  aptCodeState,
  modalLoginVisibleState as modalLoginVisibleState,
  modalRegistVisibleState as modalRegistVisibleState,
}
