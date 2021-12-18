import { FaExclamationCircle } from "react-icons/fa";
import countries from "../../utils/countries";
import { useCheckoutContext } from "../../context/CheckoutContext";

const BillingAddressForm = () => {
  const [state, setState] = useCheckoutContext();

  const inputChange = (e) =>
    setState((state) => {
      const errors = { ...state.billing.errors };
      if (Object.keys(errors).find((key) => key === e.target.name)) {
        errors[e.target.name] = e.target.value
          ? ""
          : `${e.target.name} is required`;
      }
      return {
        ...state,
        billing: {
          ...state.billing,
          [e.target.name]: e.target.value,
          errors,
        },
      };
    });

  return (
    <div className="grid gap-3">
      <h2 className="font-semibold capitalize">billing address</h2>
      <div className="grid gap-1">
        <label htmlFor="country">
          {" "}
          {state.billing.errors.country ? (
            <span className="text-red-500">
              {state.billing.errors.country}
            </span>
          ) : (
            "Country"
          )}
        </label>
        <select
          name="country"
          id="country"
          value={state.billing.country}
          onChange={inputChange}
          className="w-full border border-gray-400 rounded p-2"
          required
        >
          <option value="">Country/Region</option>
          {countries.map((item, i) => (
            <option value={item.country} key={i}>
              {item.country}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="grid gap-1">
          <label htmlFor="firstName">
            {" "}
            {state.billing.errors.firstName ? (
              <span className="text-red-500">
                {state.billing.errors.firstName}
              </span>
            ) : (
              "First Name"
            )}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={state.billing.firstName}
            onChange={inputChange}
            className="border border-gray-400 rounded p-2 "
            required
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="lastName">
            {" "}
            {state.billing.errors.lastName ? (
              <span className="text-red-500">
                {state.billing.errors.lastName}
              </span>
            ) : (
              "Last Name "
            )}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={state.billing.lastName}
            onChange={inputChange}
            className="border border-gray-400 rounded p-2 "
            required
          />
        </div>
      </div>
      <div className="grid gap-1">
        <label htmlFor="company">
          {" "}
          {state.billing.errors.company ? (
            <span className="text-red-500">
              {state.billing.errors.company}
            </span>
          ) : (
            "company "
          )}
        </label>
        <input
          type="text"
          name="company"
          id="company"
          placeholder="Company"
          value={state.billing.company}
          onChange={inputChange}
          className="border border-gray-400 rounded p-2 "
          required
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="addressLine1">
          {" "}
          {state.billing.errors.addressLine1 ? (
            <span className="text-red-500">
              {state.billing.errors.addressLine1}
            </span>
          ) : (
            "Street or House "
          )}
        </label>
        <input
          type="text"
          name="addressLine1"
          id="addressLine1"
          placeholder="Street and house number"
          value={state.billing.addressLine1}
          onChange={inputChange}
          className="border border-gray-400 rounded p-2 "
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <FaExclamationCircle />
        <p>Add a house number if you have one</p>
      </div>
      <div className="grid gap-1">
        <label htmlFor="addressLine2">
          {state.billing.errors.addressLine2 ? (
            <span className="text-red-500">
              {state.billing.errors.addressLine2}
            </span>
          ) : (
            "Apartment, suit, etc (optional) "
          )}
        </label>
        <input
          type="text"
          name="addressLine2"
          id="addressLine2"
          placeholder="Apartment, suit, etc (optional)"
          value={state.billing.addressLine2}
          onChange={inputChange}
          className="border border-gray-400 rounded p-2 "
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="grid gap-1">
          <label htmlFor="city">
            {state.billing.errors.city ? (
              <span className="text-red-500">{state.billing.errors.city}</span>
            ) : (
              "city "
            )}
          </label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={state.billing.city}
            onChange={inputChange}
            className="border border-gray-400 rounded p-2 "
            required
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="stateOrProvince">
            {state.billing.errors.stateOrProvince ? (
              <span className="text-red-500">
                {state.billing.errors.stateOrProvince}
              </span>
            ) : (
              "State / Province "
            )}
          </label>
          <select
            name="stateOrProvince"
            id="stateOrProvince"
            value={state.billing.stateOrProvince}
            onChange={inputChange}
            className="w-full border border-gray-400 rounded p-2"
            required
          >
            <option value="">State/Province</option>
            {state.billing.country &&
              countries[
                countries.findIndex((i) => i.country === state.billing.country)
              ]?.states.map((item, i) => (
                <option value={item} className="" key={i}>
                  {item}
                </option>
              ))}
          </select>
        </div>

        <div className="grid gap-1">
          <label htmlFor="zip">
            {state.billing.errors.zip ? (
              <span className="text-red-500">{state.billing.errors.zip}</span>
            ) : (
              "Zip Code"
            )}
          </label>
          <input
            type="number"
            name="zip"
            id="zip"
            placeholder="Zip Code"
            value={state.billing.zip}
            onChange={inputChange}
            className="border border-gray-400 rounded p-2 w-full"
            required
          />
        </div>
      </div>
      <div className="grid gap-1">
        <label htmlFor="phone">
          {state.billing.errors.phone ? (
            <span className="text-red-500">{state.billing.errors.phone}</span>
          ) : (
            "phone"
          )}
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="phone"
          value={state.billing.phone}
          onChange={inputChange}
          className="border border-gray-400 rounded p-2 "
          min={0}
          minLength={8}
          maxLength={15}
        />
      </div>
    </div>
  );
};

export default BillingAddressForm;
