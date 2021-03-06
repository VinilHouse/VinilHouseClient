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

const userLocation = atom({
  key: 'userLocation',
  default: {
    lat: 0,
    lng: 0,
  },
})

const searchResultState = atom({
  key: 'searchResultState',
  default: false,
})

const isLogInState = atom({
  key: 'isLogInState',
  default: false,
})

const favoritesState = atom({
  key: 'favoritesState',
  default: false,
})

export {
  aptCodeState,
  modalLoginVisibleState as modalLoginVisibleState,
  modalRegistVisibleState as modalRegistVisibleState,
  userLocation,
  searchResultState,
  isLogInState,
  favoritesState,
}
