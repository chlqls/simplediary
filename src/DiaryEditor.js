import { useRef, useState } from "react";

const DiaryEditor = () => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
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
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    alert("저장 성공");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author" //한줄입력
          value={state.author}
          onChange={handleChangeState}
        />
      </div>

      <div>
        <textarea
          ref={contentInput}
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
