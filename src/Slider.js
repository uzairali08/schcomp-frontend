import Carousel from 'react-bootstrap/Carousel';
import image1 from "./images/slider-image-1.jpg";
import image2 from "./images/slider-image-2.jpg";
import image3 from "./images/slider-image-3.jpg";

function Slider() {
    return (
        <div>
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={"400px"}
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption>
          <h2 className="sliderText">وَمَا كَانَ هَذَا الْقُرْآنُ أَنْ يُفْتَرَى مِنْ دُونِ اللَّهِ وَلَكِنْ تَصْدِيقَ الَّذِي بَيْنَ يَدَيْهِ وَتَفْصِيلَ الْكِتَابِ لَا رَيْبَ فِيهِ مِنْ رَبِّ الْعَالَمِينَ</h2>
          <h3 className="sliderText">And it was not [possible] for this Qur'an to be produced by other than Allah, but [it is] a confirmation of what was before it and a detailed explanation of the [former] Scripture, about which there is no doubt, from the Lord of the worlds. ( Yunus, 37 )</h3>
          <br></br><br></br>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={"400px"}
            src={image2}
            alt="Second slide"
          />
  
          <Carousel.Caption>
          <h2 className="sliderText">يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُمْ مَوْعِظَةٌ مِنْ رَبِّكُمْ وَشِفَاءٌ لِمَا فِي الصُّدُورِ وَهُدًى وَرَحْمَةٌ لِلْمُؤْمِنِينَ</h2>
            <h3 className="sliderText">O mankind, there has come to you instruction from your Lord and healing for what is in the breasts and guidance and mercy for the believers. ( Yunus, 57 )</h3>
          <br></br><br></br>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height={"400px"}
            src={image3}
            alt="Third slide"
          />
  
          <Carousel.Caption>
          <h2 className="sliderText">“إِنَّ هَذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا”</h2>
            <h3 className="sliderText">
            Indeed, this Qur'an guides to that which is most suitable and gives good tidings to the believers who do righteous deeds that they will have a great reward. ( Bani-Israel, 9 )
            </h3>
            <br></br><br></br>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    );
  }
  
  export default Slider;