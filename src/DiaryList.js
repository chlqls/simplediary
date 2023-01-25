import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = {
  //props가 undefined으로 전달되었을 떄를 대비
  diaryList: [], //빈 배열로 설정
};

export default DiaryList;
