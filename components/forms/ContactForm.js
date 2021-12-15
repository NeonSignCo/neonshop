import { useState } from "react";
import {
  FaCalendarAlt,
  FaCommentDots,
  FaEarlybirds,
  FaEnvelope,
  FaFlag,
  FaPhone,
  FaQuestionCircle,
  FaTextHeight,
  FaUserAlt,
} from "react-icons/fa";
import countries from "../../utils/countries";

const ContactForm = ({ productInfo}) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    enquiryType: "",
    expectedDeliveryTime: "",
    size: "",
    comment: "",
    image: "",
    heardFrom: "",
    joinNewsLetter: true,
    productInfo
  });

  const sendMail = (e) => {
    try {
      e.preventDefault();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const inputChange = (e) =>
    setData((data) => ({
      ...data,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  return (
    <form
      className=" max-w-4xl p-10 bg-gray-900 mx-auto text-white"
      onSubmit={sendMail}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-1 relative">
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={inputChange}
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            placeholder="First Name"
            required
          />
          <FaUserAlt className="absolute top-4" />
        </div>
        <div className="md:col-span-1 relative">
          <input
            type="text"
            name="lastName"
            vlaue={data.lastName}
            onChange={inputChange}
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            placeholder="Last Name"
            required
          />
          <FaUserAlt className="absolute top-4" />
        </div>
        <div className="md:col-span-1 relative">
          <input
            type="emal"
            name="email"
            value={data.email}
            onChange={inputChange}
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            placeholder="Email"
            required
          />
          <FaEnvelope className="absolute top-4" />
        </div>
        <div className="md:col-span-1 relative">
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={inputChange}
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            placeholder="Phone Number"
            required
          />
          <FaPhone className="absolute top-4" />
        </div>
        <div className="md:col-span-2 relative">
          <select
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            name="country"
            value={data.country}
            onChange={inputChange}
            required
          >
            <option value="" className="bg-gray-800">
              country
            </option>
            {countries.map((item) => (
              <option key={item.alpha2Code} value={item.country} className="bg-gray-800">
                {item.country}
              </option>
            ))}
          </select>
          <FaFlag className="absolute top-4" />
        </div>

        <div className="md:col-span-2 relative">
          <select
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            name="enquiryType"
            value={data.enquiryType}
            onChange={inputChange}
            required
          >
            <option value="" className="bg-gray-800">
              Enquiry Type
            </option>
            <option value="Wedding/Engagement" className="bg-gray-800">
              Wedding/Engagement
            </option>
            <option value="Business/entrepreneur" className="bg-gray-800">
              Business/entrepreneur
            </option>
            <option value="Birthday" className="bg-gray-800">
              Birthday
            </option>
            <option value="Engagement" className="bg-gray-800">
              Engagement
            </option>
            <option value="Agency/Stylist" className="bg-gray-800">
              Agency/Stylist
            </option>
            <option value="Home Decor" className="bg-gray-800">
              Home Decor
            </option>
            <option value="Kid's Room" className="bg-gray-800">
              Kid's Room
            </option>
            <option value="Other" className="bg-gray-800">
              Other
            </option>
          </select>
          <FaQuestionCircle className="absolute top-4" />
        </div>
        <div className="md:col-span-2 relative">
          <select
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            name="expectedDeliveryTime"
            value={data.expectedDeliveryTime}
            onChange={inputChange}
          >
            <option value="" className="bg-gray-800">
              How quickly do you require your items?
            </option>
            <option value="2-3 weeeks" className="bg-gray-800">
              2-3 Weeks (Rush Fees Apply)
            </option>
            <option value="4-6 weeks" className="bg-gray-800">
              4-6 Weeks
            </option>
            <option value="6+ weeks" className="bg-gray-800">
              6+ Weeks
            </option>
          </select>
          <FaCalendarAlt className="absolute top-4" />
        </div>
        <div className="md:col-span-2 relative">
          <input
            type="text"
            name="size"
            value={data.siz}
            onChange={inputChange}
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            placeholder="Did you have a size in mind for your neon sign? (Enter approx. size in inches or cm)"
          />
          <FaTextHeight className="absolute top-4" />
        </div>
        <div className="md:col-span-2 relative">
          <select
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            name="heardFrom"
            value={data.heardFrom}
            onChange={inputChange}
          >
            <option value="" className="bg-gray-800">
              Where did you hear about us?
            </option>
            <option
              value="Your social media (Instagram, Facebook)"
              className="bg-gray-800"
            >
              Your social media (Instagram, Facebook)
            </option>
            <option
              value="Someone else’s social media post (bloggers, stylists, other brands)"
              className="bg-gray-800"
            >
              Someone else’s social media post (bloggers, stylists, other
              brands)
            </option>
            <option
              value="Search engine (Google, Bing)"
              className="bg-gray-800"
            >
              Search engine (Google, Bing)
            </option>
            <option value="Word of mouth" className="bg-gray-800">
              Word of mouth
            </option>
            <option value="Ad on another website" className="bg-gray-800">
              Ad on another website
            </option>
          </select>
          <FaEarlybirds className="absolute top-4" />
        </div>
        <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-2">
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={inputChange}
            className="w-full sm:w-auto"
          />
          <label htmlFor="image">Upload your logo/inspirational images</label>
        </div>
        <div className="md:col-span-2 relative">
          <textarea
            rows="3"
            name="comment"
            value={data.comment}
            onChange={inputChange}
            className="w-full p-3 pl-7 bg-transparent border-b outline-none transition focus:border-b-white"
            placeholder="Your comments / query"
            required
          ></textarea>
          <FaCommentDots className="absolute top-4" />
        </div>

        <div className="md:col-span-2 relative flex items-center gap-2">
          <input
            type="checkbox"
            name="joinNewsLetter"
            checked={data.joinNewsLetter}
            onChange={inputChange}
            id="joinNewsLetter"
          />
          <label htmlFor="joinNewsLetter">
            I'd like to join the club - exclusive discounts and news emailed to
            you!
          </label>
        </div>
        <button className="uppercase p-2 bg-gray-800">submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
