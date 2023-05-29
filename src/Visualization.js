import './App.css';
import Navbar from './components/Navbar';

function Visualization() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#ddf7e3" }}>
        <h2 className='text-center p-3' style={{color:"#286029", fontWeight:"bold"}}>Visualization of Quranic Subjects (Ontology)</h2>
                <div>
                <iframe 
                    src="http://127.0.0.1:5000/" 
                    width="100%" 
                    height="550" 
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    </>
  );
}
export default Visualization;
