"use client";
import { useEffect, useState } from "react"; // Import useState
import { useParams } from "react-router-dom"; // Import useParams to get interviewId
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./components/QuestionsSection";
import RecordAnswerSection from "./components/RecordAnswerSection";

function Start() {
  const { interviewId } = useParams(); // Get interviewId from the URL
  const [interviewData, setInterviewData] = useState(); // State to store interview data
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(); // State to store interview data
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // Function to fetch interview details by mockId/interviewId
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId)); // Correctly passing interviewId
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  // Fetch interview details when the component mounts
  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails(); // Fetch details only if interviewId is available
    }
  }, [interviewId]); // Add interviewId as a dependency

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Audio Recording */}
        <RecordAnswerSection/>
      </div>
    </div>
  );
}

export default Start;
