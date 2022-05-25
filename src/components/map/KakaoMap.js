/* eslint-disable */
import { useEffect, useState, useRef } from 'react'
import { MULTICAMPUS_COORD, MAP_LEVEL_THRESHOLD } from 'src/constants/map'
import { levelRange, priceToString, downLevel } from 'src/utils'
import mapSmt from 'src/utils/mapSmt'
import { useRecoilState, useRecoilValue } from 'recoil'
import { aptCodeState, userLocation } from 'src/store/states'
import http from 'src/api/http'

const KakaoMap = () => {
  const [kakaoMap, setKakaoMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [content, setContent] = useState([])
  const [markerPositions, setMarkerPositions] = useState([])
  const [_, setAptCodeState] = useRecoilState(aptCodeState)
  const userLoc = useRecoilValue(userLocation)

  useEffect(() => {
    if (!kakaoMap) return
    let newUserCenter = new kakao.maps.LatLng(userLoc.lat, userLoc.lng)
    kakaoMap.setCenter(newUserCenter)
    // let newLevel = downLevel(level)
  }, [userLoc])
  const container = useRef(null)
  const [selectedAptCode, setSelectedAptCode] = useState()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services,clusterer&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      kakao.maps.load(() => {
        const { lat, lng } = MULTICAMPUS_COORD
        const center = new kakao.maps.LatLng(lat, lng)
        const options = {
          center,
          level: 6,
        }
        const map = new kakao.maps.Map(container.current, options)

        container.current.style.width = `100%`
        container.current.style.height = `98vh`
        kakao.maps.event.addListener(map, 'idle', async () => {
          let bounds = map.getBounds()

          let level = map.getLevel()
          // console.log(level)
          // 영역정보의 남서쪽 정보를 얻어옵니다
          let swLatlng = bounds.getSouthWest()

          // 영역정보의 북동쪽 정보를 얻어옵니다
          let neLatlng = bounds.getNorthEast()

          let levelCategory = levelRange(level)

          let url =
            levelCategory == 'DETAIL'
              ? `/houses/info/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}`
              : `/location/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}&level=${levelCategory}`

          const result = await http.get(`${url}`)

          console.log('idle called')
          console.log(result)
          setContent(result.data.content)
        })

        // -------------------------------------------- right bottom comp begin
        //setKakaoMap(map)

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(map)
        var contentNode = document.createElement('div')
        var currCategory = ''
        var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 })

        // 지도에 idle 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', searchPlaces)

        // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
        contentNode.className = 'placeinfo_wrap'

        // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
        // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
        addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap)
        addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap)

        // 커스텀 오버레이 컨텐츠를 설정합니다
        placeOverlay.setContent(contentNode)

        // 각 카테고리에 클릭 이벤트를 등록합니다
        addCategoryClickEvent()

        // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
        function addEventHandle(target, type, callback) {
          if (target.addEventListener) {
            target.addEventListener(type, callback)
          } else {
            target.attachEvent('on' + type, callback)
          }
        }

        // 카테고리 검색을 요청하는 함수입니다
        function searchPlaces() {
          if (!currCategory) {
            return
          }

          // 커스텀 오버레이를 숨깁니다
          placeOverlay.setMap(null)

          // 지도에 표시되고 있는 마커를 제거합니다
          removeMarker()

          ps.categorySearch(currCategory, placesSearchCB, {
            useMapBounds: true,
          })
        }

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
            displayPlaces(data)
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
          } else if (status === kakao.maps.services.Status.ERROR) {
            // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
          }
        }

        // 지도에 마커를 표출하는 함수입니다
        function displayPlaces(places) {
          // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
          // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
          var order = document
            .getElementById(currCategory)
            .getAttribute('data-order')

          for (var i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = addMarker(
              new kakao.maps.LatLng(places[i].y, places[i].x),
              order,
            )

            // 마커와 검색결과 항목을 클릭 했을 때
            // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
            ;(function (marker, place) {
              kakao.maps.event.addListener(marker, 'click', function () {
                displayPlaceInfo(place)
              })
            })(marker, places[i])
          }
        }

        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, order) {
          var imageSrc =
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
            imgOptions = {
              spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
              spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imgOptions,
            ),
            marker = new kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage,
            })

          marker.setMap(map) // 지도 위에 마커를 표출합니다
          markers.push(marker) // 배열에 생성된 마커를 추가합니다

          return marker
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
          }
          markers = []
        }

        // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
        function displayPlaceInfo(place) {
          var content =
            '<div class="placeinfo">' +
            '   <a class="title" href="' +
            place.place_url +
            '" target="_blank" title="' +
            place.place_name +
            '">' +
            place.place_name +
            '</a>'

          if (place.road_address_name) {
            content +=
              '    <span title="' +
              place.road_address_name +
              '">' +
              place.road_address_name +
              '</span>' +
              '  <span class="jibun" title="' +
              place.address_name +
              '">(지번 : ' +
              place.address_name +
              ')</span>'
          } else {
            content +=
              '    <span title="' +
              place.address_name +
              '">' +
              place.address_name +
              '</span>'
          }

          content +=
            '    <span class="tel">' +
            place.phone +
            '</span>' +
            '</div>' +
            '<div class="after"></div>'

          contentNode.innerHTML = content
          placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x))
          placeOverlay.setMap(map)
        }

        // 각 카테고리에 클릭 이벤트를 등록합니다
        function addCategoryClickEvent() {
          console.log('addCategoryClickEvent')
          let category = document.querySelector('#category')
          // console.log(categoryHTML)
          // container.current.appendChild(category)

          let children = category.children

          console.log('children : ' + children)
          for (let i = 0; i < children.length; i++) {
            children[i].onclick = onClickCategory
          }
        }

        // 카테고리를 클릭했을 때 호출되는 함수입니다
        function onClickCategory() {
          var id = this.id,
            className = this.className

          placeOverlay.setMap(null)

          if (className === 'on') {
            currCategory = ''
            changeCategoryClass()
            removeMarker()
          } else {
            currCategory = id
            changeCategoryClass(this)
            searchPlaces()
          }
        }

        // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
        function changeCategoryClass(el) {
          var category = document.getElementById('category'),
            children = category.children,
            i

          for (i = 0; i < children.length; i++) {
            children[i].className = ''
          }

          if (el) {
            el.className = 'on'
          }
        }
        // -------------------------------------------- right bottom comp end
        setKakaoMap(map)
      })
    }
  }, [])

  useEffect(() => {
    const result = content.map((e) => {
      return [e.lat, e.lng]
    })
    setMarkerPositions(result)
  }, [content])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }
    // save center position
    const center = kakaoMap.getCenter()
    // relayout and...
    kakaoMap.relayout()
    // restore
    kakaoMap.setCenter(center)
  }, [kakaoMap])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }
    let level = kakaoMap.getLevel()
    const markerInforms = content.map((e) => {
      // eslint-disable-next-line no-use-before-define
      let $wrap = document.createElement('div')
      let backColor = '#2BC0E4'

      if (level < MAP_LEVEL_THRESHOLD.DETAIL && e.aptCode == selectedAptCode) {
        backColor = 'red'
      }
      $wrap.style.cssText = `
      width:90px; height:50px; background-color:${backColor}; text-align:center;
    `

      const zoomMap = async () => {
        let result = await mapSmt(kakaoMap)
        let newCenter = new kakao.maps.LatLng(e.lat, e.lng)
        let newLevel = downLevel(level)
        newLevel && kakaoMap.setLevel(newLevel)
        kakaoMap.setCenter(newCenter)

        setContent(result.data.content)
        if (level < MAP_LEVEL_THRESHOLD.DETAIL) {
          setSelectedAptCode(e.aptCode)
          setAptCodeState(e.aptCode)
        }
      }
      $wrap.addEventListener('click', zoomMap)

      // let $img = document.createElement('img')
      // $img.setAttribute('src', 'https://svgshare.com/i/hbw.svg')
      // $wrap.appendChild($img)

      let $name = document.createElement('div')
      $name.style.cssText = `color:#EAECC6`
      $name.innerText = e.name

      let $price = document.createElement('div')
      $price.innerText = priceToString(Math.floor(e.avgPrice))

      $wrap.appendChild($name)
      $wrap.appendChild($price)

      return {
        position: new kakao.maps.LatLng(e.lat, e.lng),
        inform: $wrap,
      }
    })

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null))

      return markerInforms.map((e) => {
        // console.log(e)
        let a = new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: e.position,
          content: e.inform,
        })
        return a
      })
    })
  }, [kakaoMap, content])

  return (
    <>
      <div id="container" ref={container} />
    </>
  )
}

export default KakaoMap
