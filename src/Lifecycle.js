import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      //Unmount 시점에 실행되게 됨
      console.log("Unmount!"); //Unmount : 화면에서 사라짐
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  //   const [count, setCount] = useState(0);
  //   const [text, setText] = useState("");

  //   useEffect(() => {
  //     console.log("Mount!"); //Mount: 화면에 나타나는 것
  //   }, []);

  //   useEffect(() => {
  //     console.log("Update!"); //Update : 업데이트 (리렌더)
  //   }); //dependency array 없음

  //   useEffect(() => {
  //     console.log(`count is update : ${count}`); //callback 함수
  //     if (count > 5) {
  //       alert("count가 5를 넘었습니다 따라서 1로 초기화합니다.");
  //       setCount(1);
  //     }
  //   }, [count]); //dependency array(의존성 배열) -> 이 배열 내에 들어있는 값이 변화하면 콜백함수가 수행됨

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      {/*isVisible이 true일 때 truthy인 UnmountTest 실행*/}

      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)}></input>
      </div> */}
    </div>
  );
};

export default Lifecycle;
