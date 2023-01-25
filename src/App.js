import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "최빈",
    content: "하이 1",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "최빈2",
    content: "하이 2",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "최빈3",
    content: "하이 3",
    emotion: 5,
    created_date: new Date().getTime(), //현재시간, 문자열로 다루기 쉽게 getTime
  },
];

const App = () => {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
};

export default App;
