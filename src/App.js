import "./App.css";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuranicSubjects from "./QuranicSubjects";
import Homepage from "./Homepage";
import Footer from "./Footer";
import SubjectContent from "./SubjectContent";
import Subjects from "./Subjects";
import OfferedSubjects from "./OfferedSubjects";
import EditSubject from "./EditSubject";
import InteractiveLearning from "./InteractiveLearning";
import RegisteredLearners from "./RegisteredLearners";
import LearnerRegistration from "./LearnerRegistration";
import ScholarRegistration from "./ScholarRegistration";
import LearnerLogin from "./LearnerLogin";
import Quizz from "./Quizz";
import ScholarLogin from "./ScholarLogin";
import AdminRegistration from "./AdminRegistration";
import AdminLogin from "./AdminLogin";
import RegisteredCoursesList from "./RegisteredCoursesList";
import Protected from "./Protected";
import InteractiveLearningSession from "./InteractiveLearningSession";
import LoginProfile from "./LoginProfile";
import RegisterProfile from "./RegisterProfile";
import AddCourse from "./AddCourse";
import AddObjectiveTest from "./AddObjectiveTest";
import AddSubjectiveTest from "./AddSubjectiveTest";
import RegisteredScholars from "./RegisteredScholars";
import RegisteredCourses from "./RegisteredCourses";
import CourseMenu from "./CourseMenu";
import PeerReviewAssessment from "./PeerReviewAssessment";
import PracticeTest from "./PracticeTest";
import ReviewPeersWork from "./ReviewPeersWork";
import Visualization from "./Visualization";
import Result from "./Result";
import StatisticsCharts from "./StatisticsCharts";
import CustomAlert from "./CustomAlert";





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<Homepage/>} />
          <Route path="/LoginProfile" element={<LoginProfile/>} />
          <Route path="/RegisterProfile" element={<RegisterProfile/>} />
          <Route path="/RegisteredCourses" element={<RegisteredCourses/>} />
          <Route path="/PeerReviewAssessment/:id" element={<PeerReviewAssessment/>} />
          <Route path="/ReviewPeersWork/:id" element={<ReviewPeersWork/>} />
          <Route path="/Visualization/" element={<Visualization/>} />
          <Route path="/Result/:id" element={<Result/>} />


          <Route path="CourseMenu/:coursesId" element={<CourseMenu/>} />
          {/* <Route path="InteractiveLearningSession/:id" element={<InteractiveLearningSession/>} /> */}

          {/* <Route path="/AddCourse" element={<AddCourse/>} /> */}




          {/* Admin Routes */}
          <Route path="/AdminRegistration" element={<AdminRegistration/>} />
          <Route path="/AdminLogin" element={<AdminLogin />} />

          <Route path="/Subjects" element={<Protected Component={Subjects} />} />
          <Route path="/EditSubject/:id" element={<Protected Component={EditSubject} />} />
          <Route path="/RegisteredLearners" element={<Protected Component={RegisteredLearners} />} />
          <Route path="/RegisteredScholars" element={<Protected Component={RegisteredScholars} />} />
          <Route path="/RegisteredCoursesList" element={<Protected Component={RegisteredCoursesList} />} />
          


          {/* Learner Routes */}
          <Route path="/LearnerRegistration" element={<LearnerRegistration />} />
          <Route path="/LearnerLogin" element={<LearnerLogin />} />
          
          <Route path="/OfferedSubjects" element={<Protected Component={OfferedSubjects} />} />
          <Route path="/QuranicSubjects" element={<Protected Component={QuranicSubjects} />} />
          <Route path="/QuranicSubjects/Content/:id" element={<Protected Component={SubjectContent} />} />
          {/* <Route path="/InteractiveLearning" element={<Protected Component={InteractiveLearning} />} /> */}
          <Route path="/InteractiveLearningSession/:id" element={<Protected Component={InteractiveLearningSession}/>} />
          <Route path="/Quizz/:id" element={<Protected Component={Quizz} />} />
          <Route path="/PracticeTest/:id" element={<Protected Component={PracticeTest} />} />




          


          {/* Scholar Routes */}
          <Route path="/ScholarRegistration" element={<ScholarRegistration/>} />
          <Route path="/ScholarLogin" element={<ScholarLogin/>} />

          <Route path="/AddCourse" element={<Protected Component={AddCourse} />} />
          <Route path="/AddObjectiveTest" element={<Protected Component={AddObjectiveTest}/>} />
          <Route path="/AddSubjectiveTest" element={<Protected Component={AddSubjectiveTest}/>} />

          <Route path="/StatisticsCharts" element={<StatisticsCharts/>} />

          <Route path="/CustomAlert" element={<CustomAlert/>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
