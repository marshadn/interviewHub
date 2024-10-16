import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";  // Import useParams
"use client";
import { db } from "../../../../../utils/db";
import { userAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { index } from "drizzle-orm/mysql-core";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../components/ui/button";


function Feedback() {
  const { interviewId } = useParams();  // Get interviewId from the URL parameters
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (interviewId) {  // Make sure interviewId is defined before fetching feedback
      const GetFeedback = async () => {
        const result = await db.select().from(userAnswer)
          .where(eq(userAnswer.mockIdRef, interviewId))
          .orderBy(userAnswer.id);

        console.log(result);
        setFeedbackList(result);
      };

      GetFeedback();
    }
  }, [interviewId]);  // Dependency on interviewId

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg my-3">Your overall interview rating: <strong>7/10</strong></h2>
      <h2 className="text-sm text-gray-500">Find below interview questions with correct answers, your answers, and feedback for improvement</h2>
      {/* You can map through feedbackList here to display individual feedback items */}
      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className="mt-7">
          <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
            {item.question} <ChevronsUpDown className="h-5 w-5"/></CollapsibleTrigger>
  <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating : </strong>{item.rating}</h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer : </strong>{item.userAns}</h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer : </strong>{item.correctAns}</h2>
              <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900"><strong>Feedback : </strong>{item.feedback}</h2>
    </div>
  </CollapsibleContent>
</Collapsible>

      ))}
      <Link to={'/dashboard'}>
        <Button>Go Home</Button>
        </Link>
    </div>
  );
}

export default Feedback;




// import { useEffect } from "react";
// "use client"
// import { db } from "../../../../../utils/db";
// import { userAnswer } from "../../../../../utils/schema";
// import { eq } from "drizzle-orm";


// function Feedback({ params }) {
//   const [feedbackList, setFeedbackList] = useState([]);
//   useEffect(() => {
//     GetFeedback();

//   }, [])
  
//   const GetFeedback = async () => {
//     const result = (await db.select().from(userAnswer).where(eq(userAnswer.mockIdRef, params.interviewId))).
//       orderBy(userAnswer.id);
    
//     console.log(result);
//     setFeedbackList(result);
//   }
//   return (
//     <div className="p-10 ">
//       <h2 className="text-3xl font-bold text-green-500">Congragulations!</h2>
//       <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
//       <h2 className="text-primary text-lg  my-3">Your overall interview rating : <strong>7/10</strong></h2>
//       <h2 className="text-sm text-gray-500 ">Find below interview question with correct answer,Your answer and feedback for improvement</h2>
//     </div>
//   )
// }

// export default Feedback