import { useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";

// variables
export const USD = 'USD';
export const EURO = 'EURO';
export const POUND = 'POUND';


const CurrencyConverter = () => {
    const [state, setState] = useGlobalContext();
    const ref = useRef();
    const currencies = [
      { currency: USD, text: "US Dollar" },
      { currency: EURO, text: "Euro" },
      { currency: POUND, text: "Pound" }
    ];

    const changeCurrency = e => {
        const target = ref.current;
        target.classList.remove('hidden');
        target.options[0].value = e.target.value;
        target.options[0].text = e.target.options[e.target.selectedIndex].text;
        target.value = e.target.value
        e.target.style.width = target.offsetWidth + 'px';
        target.classList.add('hidden');
        localStorage.setItem('currency', e.target.value); 
        setState(state => ({ ...state, currency: e.target.value }));
    }

    return (
      <div>
        <select
          onChange={changeCurrency}
          value={state.currency}
          className="bg-white text-black font-semibold p-1"
        >
          {currencies.map((item, i) => (
            <option key={i} value={item.currency}>
              {item.text}
            </option>
          ))}
        </select>
        <select ref={ref} className="border p-1 hidden bg-black">
          <option></option>
        </select>
      </div>
    );
}

export default CurrencyConverter
