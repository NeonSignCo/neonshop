import { FaEnvelope, FaEnvelopeOpen, FaEnvelopeSquare } from "react-icons/fa";

const NewsLetterForm = () => {
    const subscribe = (e) => {
        e.preventDefault();
    }
    return (
      <div>
        <form onSubmit={subscribe} className="flex flex-col md:flex-row gap-10 md:gap-0 relative">
          <input type="text" placeholder="Email" className="text-black pr-5 pl-8 h-12" required/>
          <button
            className="h-12 w-52 flex items-center justify-center bg-gray-900 text-white border border-black uppercase font-semibold transition"
                >
                    sign me up
          </button>
          <FaEnvelope className="absolute text-black top-4 left-2"/>
        </form>
      </div>
    );
}

export default NewsLetterForm
