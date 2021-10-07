import React, { Fragment, useRef, useState, useEffect } from "react";
import "./App.css";
// import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const App = () => {
  const [answers, setAnswers] = useState();
  const [model, setModel] = useState(null);
  const passageRef = useRef(null);
  const questionRef = useRef(null);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model Loaded");
  };

  useEffect(() => {
    loadModel();
  }, []);

  const answerQuestion = async (e) => {
    // 13 - key for enter
    if (e.which === 13 && model !== null) {
      const passage = passageRef.current.value;
      const question = questionRef.current.value;

      const answers = await model.findAnswers(question, passage);
      setAnswers(answers);
      console.log(answers);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Gawain</h1>
        {model == null ? (
          <div>
            <div>Loading Model...</div>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <Fragment>
            Passage:
            <textarea
              name="
          "
              ref={passageRef}
              cols="100"
              rows="30"
            ></textarea>
            Ask a Question
            <input
              type="text"
              ref={questionRef}
              onKeyPress={answerQuestion}
              size="80"
            />
            Answers:
            {answers
              ? answers.map((answer, idx) => (
                  <div key={Math.random() + idx + 1}>
                    <b>Answer {idx + 1}</b> -{" "}
                    <b>
                      {answer.text} | {Math.floor(Number(answer.score))}
                    </b>
                  </div>
                ))
              : ""}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
