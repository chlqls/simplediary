import React, { useState, useEffect } from "react";

//React.memo : 함수형 컴포넌트에 업데이트 조건 걸기
// //React.memo : 해당 props가 바뀔 때만 리렌더링 되도록

// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`Update :: Text : ${text}`);
//   });
//   return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`Update :: Count : ${count}`);
//   });
//   return <div>{count}</div>;
// });

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count : ${count}`);
  });

  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});

const areEqual = (pervProps, nextProps) => {
  if (pervProps.obj.count === nextProps.obj.count) {
    return true; //이전 프룹스와 현재 프룹스가 같다 -> 리렌더링을 일으키지 않는다.
  }
  return false; //이전과 현재가 다르다 -> 리렌더링 발생
  //return pervProps.obj.count === nextProps.obj.count //위의 세줄과 같은 의미
};

const MemoizedCounterB = React.memo(CounterB, areEqual); //CounterB는 areEqual의 결과에 따라 리렌더링이 결정되는 컴포넌트

const OptimizeTest = () => {
  //   const [count, setCount] = useState(1);
  //   const [text, setText] = useState("");

  const [count, setCount] = useState(1); //count가 같은 값이면 리렌더링 안됨
  const [obj, setObj] = useState({
    //CounterB처럼 React.memo로 감싸면 객체끼리 비교하기 때문에 count가 같은 값이어도 리렌더링 됨
    //얕은 비교(객체의 주소에 의한 비교)를 하기 때문 -> areEqual 함수 사용(MemoizedCounterB)
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>

      {/* <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
    </div>
  );
};

export default OptimizeTest;
