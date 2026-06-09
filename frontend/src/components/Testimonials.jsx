// Import images
import UmerFayyazImg from "../assets/reviews/umer-fayyaz.png";
import AneebRyanImg from "../assets/reviews/aneeb-ryan.png";
import ZainabTariqImg from "../assets/reviews/zainab-tariq.png";
import MoinUmarImg from "../assets/reviews/moin-umar.png";
import RiffatAfzaalImg from "../assets/reviews/riffat-afzaal.png";
import React, { useRef, useState, useEffect } from "react";
import "./Testemonial.css";

// Import your images here
// import UmerFayyazImg from '../assets/images/umer-fayyaz.jpg';
// import AneebRyanImg from '../assets/images/aneeb-ryan.jpg';
// import ZainabTariqImg from '../assets/images/zainab-tariq.jpg';
// import MoinUmarImg from '../assets/images/moin-umar.jpg';
// import RiffatAfzaalImg from '../assets/images/riffat-afzaal.jpg';

const reviews = [
  {
    name: "Umer Fayyaz",
    text: "Great platform, very efficient and works really well on both phone and web. I think this is the most easiest way of booking appointments in Pakistan as it has made the whole process much more efficient.",
    image: UmerFayyazImg, // Replace with UmerFayyazImg
    date: "March 2025",
  },
  {
    name: "Aneeb Ryan",
    text: "A very helpful app for booking appointments and searching for the required doctors. Has made my life a lot easy. I would strongly recommend this to all.",
    image: AneebRyanImg,
    date: "February 2025",
  },
  {
    name: "Zainab Tariq",
    text: "Literally the best website to book the appointments online for Doctors. The service is great, helpline guys are very cooperative and understanding. And I don't have to hassle through different hospitals anymore now.",
    image: ZainabTariqImg,
    date: "January 2025",
  },
  {
    name: "Moin Umar",
    text: "The only good healthcare website in Pakistan. The suggested doctors are good and the doctors on the forum are very responsive too.",
    image: MoinUmarImg,
    date: "December 2025",
  },
  {
    name: "Riffat Afzaal",
    text: "Very helpful staff. Helped me book appointment with my gastroenterologist. I do all my scheduling through HEALR now. Thanks a bunch.",
    image: RiffatAfzaalImg,
    date: "November 2025",
  },
];

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // -10 for buffer
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Check initial scroll position
      handleScroll();
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollTo = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 3; // Scroll by one card width
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h2>What Our Users Say</h2>
        {/* <p>
          Explore the experiences of our users as they enjoy the convenience of
          booking appointments on HEALR.
        </p> */}
      </div>

      <div className="testimonial-wrapper">
        {showLeftArrow && (
          <button className="scroll-arrow left" onClick={() => scrollTo('left')}>
            ←
          </button>
        )}
        {showRightArrow && (
          <button className="scroll-arrow right" onClick={() => scrollTo('right')}>
            →
          </button>
        )}

        <div 
          className="testimonial-cards"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {reviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <div className="user-info">
                <img
                  src={review.image}
                  alt={`${review.name} profile`}
                  className="profile-image"
                />
                <div className="user-details">
                  <h5 className="user-name">{review.name}</h5>
                  <p className="review-date">{review.date}</p>
                </div>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
