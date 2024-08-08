import React, { useState, useEffect } from "react";

const Forum = () => {
  const [quesArray, setQuesArray] = useState([]);
  const [ques, setQuestion] = useState({ question: "" });
  const [replyArray, setReplyArray] = useState([]);
  const [reply, setReply] = useState({ reply: "" });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ques),
      });
      const data = await response.json();
      setQuesArray([...quesArray, data]); // Update the state with the newly added question
      setQuestion({ question: "" }); // Clear the input field
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const newReply = { questionId: currentQuestion._id, reply: reply.reply };
    try {
      const response = await fetch("http://localhost:3000/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReply),
      });
      const data = await response.json();
      setReplyArray([...replyArray, data]);
      setShowReplyModal(false);
      setReply({ reply: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/question");
      const data = await response.json();
      setQuesArray(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReplies = async (questionId) => {
    try {
      console.log(questionId);
      const response = await fetch(`http://localhost:3000/reply/${questionId}`);
      const data = await response.json();
      setReplyArray(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleReplyClick = (question) => {
    setCurrentQuestion(question);
    fetchReplies(question._id);
    setShowReplyModal(true);
  };
  return (
    <div className="mt-4 quicksand flex items-center flex-col justify-center p-8 ">
      <div className=" p-8 bg-[#003b59] rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center quicksand">
          SHIELDGEN COMMUNITY
        </h2>
        <p className="text-center text-[#cccccc]">
          Welcome to the BrandName Community Forum, a place where you can share
          experiences, seek advice, and connect with fellow users and experts
          dedicated to empowering women through personalized self-defense
          training. Join the conversation and enhance your safety skills today!{" "}
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="mt-4 flex flex-col items-center justify-center"
        >
          <label className="text-sm font-medium mb-2">
            Enter your Question
          </label>
          <div className="w-full flex lg:flex-row flex-col lg:p-4 items-center justify-center gap-2 ">
            <input
              type="text"
              name="age"
              className="p-2 w-full border outline-none border-gray-300 rounded text-black"
              placeholder="Enter Question"
              value={ques.question}
              onChange={(e) => setQuestion({ question: e.target.value })}
              required
            />
            <input
              type="submit"
              className="bg-blue-600 p-2 rounded w-full lg:w-1/4 cursor-pointer hover:bg-blue-700"
            />
          </div>
        </form>
      </div>

      <section className="bg-black text-white mt-8 rounded w-11/12 p-4">
        <h2 className="text-2xl font-semibold text-center quicksand mt-4 underline">
          Community Questions
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 w-full ">
          {quesArray.map((ques, index) => (
            <div
              key={index}
              className="p-4 bg-[#003b59] rounded-lg shadow-lg w-full max-w-4xl mt-4 flex flex-row justify-between items-center "
            >
              <h3 className="text-lg font-semibold text-left text-[#cccccc]">
                {ques.question}
              </h3>
              <button
                className="bg-white text-black rounded pl-4 pr-4 p-2"
                onClick={() => handleReplyClick(ques)}
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      </section>

      {showReplyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#00547f] p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Replies for: {currentQuestion.question}
            </h3>
            <form onSubmit={handleReplySubmit}>
              <input
                type="text"
                className="w-full p-2 border text-black border-gray-300 rounded mb-4"
                placeholder="Enter your reply"
                value={reply.reply}
                onChange={(e) => setReply({ reply: e.target.value })}
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded mr-2"
                  onClick={() => setShowReplyModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-4 ">
              {replyArray.map((item, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-200 rounded mb-2 text-black break-words"
                >
                  <p className="">{item.reply}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
