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

const modalSlideVisibleState = atom({
  key: 'modalSlideVisibleState',
  default: false,
})

const userLocation = atom({
  key: 'userLocation',
  default: {
    lat: 0,
    lng: 0,
  },
})

export {
  aptCodeState,
  modalLoginVisibleState as modalLoginVisibleState,
  modalRegistVisibleState as modalRegistVisibleState,
  userLocation,
  modalSlideVisibleState,
}
