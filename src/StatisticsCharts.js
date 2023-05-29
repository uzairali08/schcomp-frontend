import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Navbar from "./components/Navbar";


function StatisticsCharts() {

  return (
    <>
    <Navbar />
    <div className="pt-5 pb-5" style={{ backgroundColor: "#ddf7e3" }}>
    <div className="row">
        <div className="col-1"></div>
        <div className="col-5 p-3">
          <h2>Total Number of Scholars, Courses, & Learners</h2>
        </div>
        <div className="col-5 my-auto p-3">
        <h2>Total Number of Scholars, Courses, & Learners in each year</h2>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-5 p-3">
          <PieChart />
        </div>
        <div className="col-5 my-auto p-3">
            <BarChart />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
    </>
  );
}

export default StatisticsCharts;
