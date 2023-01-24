import { useState } from "react";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "최빈",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state, //순서주의, 스프레드 연산자가 가장 위로
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장 성공");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author" //한줄입력
          value={state.author}
          onChange={handleChangeState}
        />
      </div>

      <div>
        <textarea
          name="content" //여러줄 입력
          value={state.content}
          onChange={handleChangeState}
        />
      </div>

      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion" //감정 숫자 선택
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>{" "}
      </div>
    </div>
  );
};
export default DiaryEditor;
