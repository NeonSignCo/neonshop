import CustomLink from "../components/CustomLink";
import FollowSection from "../components/sections/FollowSection";
import NewsLetterSection from "../components/sections/NewsLetterSection";

const ShippingReturns = () => {
  return (
    <div className="pt-20">
      <h1 className="text-4xl sm:text-5xl text-center uppercase font-semibold mb-20">
        shipping & returns
      </h1>
      <div className="mb-20 grid gap-5 px-5 lg:px-20 max-w-4xl mx-auto text-lg">
        <section className="mb-20 grid gap-5">
          <h2 className="uppercase font-semibold text-2xl sm:text-3xl">
            ordering
          </h2>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            how long will my order take?
          </h3>
          <p>NeonShop Neon handcraft every item to order.</p>
          <p>
            Standard orders take 10-20 days, including delivery time from the
            date you approve your proof.
          </p>
          <p>
            We’re so committed to getting your sign to you in time for your big
            event, that we also offer a{" "}
            <span className="font-semibold">100% money back guarantee</span> in
            the (super rare!) event that your neon sign does not arrive on time!
            Plus, you’ll get to keep your neon. How good is that?
          </p>
          <p>
            ust remember to enter your event date (minimum 4 weeks away from
            your order date) at check-out, email us at{" "}
            <CustomLink
              text=" hello@neonshop.co"
              href="mailto:hello@neonshop.co"
              className="font-semibold"
            />{" "}
            or let us know when you get sent your proof to apply this guarantee
            to your order.{" "}
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            I NEED MY NEON SIGN SOONER!
          </h3>
          <p>
            Need it sooner than 10-20 days? Our team will do our absolute best
            to accommodate rush orders where possible. Contact us at
            hello@neonshop.co to see if we can help!
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            HOW CAN I CANCEL AN ORDER THAT I’VE PLACED?
          </h3>
          <p>
            To get your order to you as soon as possible, your order is sent
            straight to our production team. Unfortunately, this means that once
            an order has been placed it cannot be cancelled.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            CAN I MAKE ANY CHANGES TO MY ORDER?
          </h3>
          <p>
            We aim to process and create your order as fast as possible which
            means we're typically unable to make any changes once you've placed
            an order. If you have designed your own custom neon sign on our site
            and need to update a mis-spelt word, please get in touch with our
            team within 24 hours and they may be able to help. Email them at
            hello@neonshop.co including your order number and amendment/s.
          </p>
          <p>
            We understand that sometimes you may want to add more NeonShop
            goodies to your order, however once an order is submitted, we’re
            unable to add more items to that order – even if it’s still
            processing. If you’d like to purchase more items, we recommend
            placing a separate order.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            WHAT PAYMENT METHODS DO YOU ACCEPT?
          </h3>
          <p>
            We currently accept Credit Card, Paypal, Afterpay (USA and AUS only)
            and Gift Vouchers.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            I’M HAVING TROUBLES PLACING AN ORDER ONLINE, CAN YOU HELP?
          </h3>
          <p>
            On the rare occasion you may experience difficulties out of our
            control, we recommend the following tips:
          </p>
          <ul className="list-disc list-inside">
            <li>Clear your cache and any cookies from your browser.</li>
            <li>
              Try a different web browser - using Google Chrome or Mozilla
              Firefox are the easiest to browse and shop on most websites,
              including ours.
            </li>
            <li>
              If you have an account, log in/log out of your account again.
            </li>
            <li>
              Try using a different device (sometimes using a desktop may help).
            </li>
          </ul>
          <p>
            If you continue to experience any issues, please don’t hesitate to
            contact us at hello@neonshop.co and we will find an alternative
            solution to help you place your order online.
          </p>
        </section>
        <section className="mb-20 grid gap-5">
          <h2 className="uppercase font-semibold text-2xl sm:text-3xl">
            shipping & delivery
          </h2>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            DO YOU SHIP INTERNATIONALLY?
          </h3>
          <p>
            Yes, we ship world-wide! Check-out our Shipping Rates below for your
            region.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            SHIPPING RATES
          </h3>
          <p>
            We work with our courier partners to offer you the best shipping
            rates world-wide to give you free shipping!
          </p>

          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            HOW CAN I TRACK MY ORDER?
          </h3>
          <p>
            Once your order has been dispatched, you will receive a tracking
            number to follow from our door to yours. Please contact
            hello@neonshop.co if you have any trouble with this tracking.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            I HAVEN’T RECEIVED MY ORDER, WHAT DO I DO?
          </h3>
          <p>
            Your NeonShop order should arrive between 10-20 days (standard
            orders). If you are still waiting for your order or believe some of
            your order may be missing, please contact hello@neonshop.co with
            your query.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            WHY HAVE I ONLY RECEIVED PART OF MY ORDER?
          </h3>
          <p>
            If you purchased multiple items in your order, it may be delivered
            in separate deliveries over a couple of days depending on your
            courier. Please contact hello@neonshop.co if you believe some of
            your order may be missing.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            HOW MUCH WILL I BE CHARGED FOR CUSTOMS TAX?
          </h3>
          <p>
            Depending on the destination country, you may need to pay overseas
            customs duties, foreign taxes or other fees that may be imposed.
            Unless otherwise stated, it is the customer’s responsibility to pay
            any overseas customs duties, foreign taxes or other fees that may be
            imposed. For more information on taxes, duties and customs
            regulations please contact your local customs office directly.
            Orders returned to our warehouse due to unpaid customs
            duties/foreign taxes will be re-sent to the customer at their
            expense. Refunds and cancellations will not be made due to a
            customer’s non-payment of any relevant customs duties, foreign
            taxes, or other fees.
          </p>
          <p>
            If you decide not to pay for the customs fee, the parcel will
            eventually be returned to our factory. Please note, this will void
            your ‘100% money back’ on-time guarantee.{" "}
          </p>
        </section>
        <section className=" grid gap-5">
          <h2 className="uppercase font-semibold text-2xl sm:text-3xl">
            RETURNS & REFUNDS
          </h2>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            WHAT IS YOUR RETURNS POLICY?
          </h3>
          <p>
            Every NeonShop Neon sign is made from scratch, especially for you.
            Due to the highly custom nature of our product, we do not offer
            change of mind returns or exchanges.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            I PURCHASED A NEON FROM YOU A WEEK AGO AND NOW YOU HAVE A SALE, CAN
            I GET A DISCOUNT?
          </h3>
          <p>
            We get it, it's frustrating when this happens. If you happen to make
            a purchase with us 48 hours before a Sale begins and the Sale price
            is cheaper, we will offer you the difference as a Gift Card with a
            12 months expiry. Beyond this, all promotional discounts or sales
            are for future orders and cannot be used retroactively.
          </p>

          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            SOMETHING’S WRONG WITH MY NEON!
          </h3>
          <p>
            At NeonShop, we strive to produce pieces of the highest quality. Our
            items are quality checked before they are carefully packaged and
            sent to you. In the unlikely event that your item arrives damaged,
            or is not working as intended, please refrain from using the
            product. We kindly ask you to send images, a video and brief
            description of the fault to hello@neonshop.co within 24 hours of
            receiving the product. Please include your order number in the
            subject line. If you believe you have received the incorrect order,
            please contact our team at hello@neonshop.co with an image of the
            received item, and a brief description of the discrepancy within 24
            hours of receiving the item. Please include your order number in the
            subject line.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            DOES MY NEON COME WITH A WARRANTY?
          </h3>
          <p>
            NeonShop’s items are of the highest quality. We offer an amazing
            24-month manufacturer’s warranty – DOUBLE the industry standard!
            Please note, our manufacturer’s warranty covers all electrical
            components, when used appropriately indoors.
          </p>
          <p>
            Depending on the fault, NeonShop will either fix, replace or refund
            the product. NeonShop reserve the right to select the most
            appropriate actions to fulfil the warranty.
          </p>
          <p>Please contact hello@neonshop.co for all warranty queries.</p>
        </section>
      </div>
      <NewsLetterSection />
      <FollowSection />
    </div>
  );
};

export default ShippingReturns;
