import AptDetail from '../apt/AptDetail'
import SearchResult from '../searchMenu/SearchResult'

const LeftSideContent = ({ data }) => {
  return (
    <div>
      {data.mode == 'aptDetail' ? (
        <AptDetail data={data.data} />
      ) : (
        <SearchResult data={data.data} />
      )}
    </div>
  )
}
export default LeftSideContent
