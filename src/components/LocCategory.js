import styled from '@emotion/styled'

const LocCategory = () => {
  return (
    <StyleWrapper>
      <ul id="category">
        <li id="BK9" data-order="0">
          <span className="category_bg bank"></span>
          은행
        </li>
        <li id="MT1" data-order="1">
          <span className="category_bg mart"></span>
          마트
        </li>
        <li id="PM9" data-order="2">
          <span className="category_bg pharmacy"></span>
          약국
        </li>
        <li id="OL7" data-order="3">
          <span className="category_bg oil"></span>
          주유소
        </li>
        <li id="CE7" data-order="4">
          <span className="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5">
          <span className="category_bg store"></span>
          편의점
        </li>
      </ul>
    </StyleWrapper>
  )
}
export default LocCategory

const StyleWrapper = styled.div`
  #category {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 5px;
    border: 1px solid #909090;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
    background: #fff;
    overflow: hidden;
    z-index: 2;
    padding-left: 0px;

    li {
      float: left;
      list-style: none;
      width: 50px;
      border-right: 1px solid #acacac;
      padding: 6px 0;
      text-align: center;
      cursor: pointer;
      .on {
        background: #eee;
      }
      :hover {
        background: #ffe6e6;
        border-left: 1px solid #acacac;
        margin-left: -1px;
      }
      :last-child {
        margin-right: 0;
        border-right: 0;
      }

      span {
        display: block;
        margin: 0 auto 3px;
        width: 27px;
        height: 28px;
      }
    }
  }

  #category li .category_bg {
    background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
      no-repeat;
  }
  #category li .bank {
    background-position: -10px 0;
  }
  #category li .mart {
    background-position: -10px -36px;
  }
  #category li .pharmacy {
    background-position: -10px -72px;
  }
  #category li .oil {
    background-position: -10px -108px;
  }
  #category li .cafe {
    background-position: -10px -144px;
  }
  #category li .store {
    background-position: -10px -180px;
  }
  #category li.on .category_bg {
    background-position-x: -46px;
  }
`
