import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
//import OptimizeTest from "./OptimizeTest";

//https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]); //state 끌어올리기(단방향 데이터 흐름, 역방향 이벤트 흐름)

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    //console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      //0~19까지, 총 20개만 추출
      return {
        author: it.email, //api의 email -> 작성자
        content: it.body, //api의 body -> 본문
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData(); //Mount 시점에 getData() 호출
  }, []);

  //useCallback : 메모이제이션된 콜백을 반환
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]); //함수형 업데이트: 상태변화함수에 함수 전달
  }, []);

  const onRemove = useCallback((targetId) => {
    //    console.log(`${targetId}가 삭제되었습니다.`);
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  //memotization을 이용한 연산 과정 최적화 (동일한 계산은 실행하지 않고 기존의 데이터 반환)
  const getDiaryAnalysis = useMemo(() => {
    //    console.log("일기 분석 시작"); //처음 data 생성되고 한번, setData 해서 한번 더 실행됨

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); //data.length가 변할 때만 콜백함수 실행

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //useMemo 사용하면 더이상 getDiaryAnalysis는 함수가 아니고 콜백함수가 반환하는 값임

  return (
    <div className="App">
      {/* <Lifecycle /> 
      <OptimizeTest /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
