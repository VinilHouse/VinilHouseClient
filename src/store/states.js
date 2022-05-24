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

const userLat = atom({
  key: 'userLat',
  default: 0,
})

const userLng = atom({
  key: 'userLng',
  default: 0,
})

export {
  aptCodeState,
  modalLoginVisibleState as modalLoginVisibleState,
  modalRegistVisibleState as modalRegistVisibleState,
  userLat,
  userLng,
}
