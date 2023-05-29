import "./App.css";
import Slider from "./Slider";
import HomepageCard from "./HomepageCards";
import Header from "./Header";
import HomepageVQS from "./HomepageVQS";
import HomepageSSL from "./HomepageSSL";
import HomepageCBT from "./HomepageCBT";
import HomepageILS from "./HomepageILS";
import HomepageCounter from "./HomepageCounter";

function Homepage() {
  return (
    <div>
      {/* <Header /> */}
      <div>
        <Slider />
        <HomepageCounter />
        
        <div style={{ backgroundColor: "#fff" }}>
          <HomepageCard />
        </div>

        <div id="vqs">
        <HomepageVQS />
        </div>

        <div id="ssl">
        <HomepageSSL />
        </div>

        <div id="cbt">
        <HomepageCBT />
        </div>

        <div id="ils">
        <HomepageILS />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
