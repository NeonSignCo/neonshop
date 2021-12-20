import CustomLink from "../components/CustomLink";
import FollowSection from "../components/sections/FollowSection";
import NewsLetterSection from "../components/sections/NewsLetterSection";

const RefundPolicy = () => {
  return (
    <div className="pt-20">
      <h1 className="text-4xl sm:text-5xl text-center uppercase font-semibold mb-20">
        Refund Policy
      </h1>
      <div className="mb-20 grid gap-5 px-5 lg:px-20 max-w-4xl mx-auto text-lg">
        <section className="mb-20 grid gap-5">
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
            NeonShop Neon strives to produce pieces of the highest quality. Our
            items are quality checked before they are carefully packaged and
            sent to you. In the unlikely event that your item arrives damaged,
            or is not working as intended, please refrain from using the
            product. We kindly ask you to send images and brief description of
            the fault to hello@neonshop.co within 24 hours of receiving the
            product. Please include your order number in the subject line.
          </p>
          <p>
            If you believe you have received the incorrect order, please contact
            our team at hello@neonshop.co with an image of the received item,
            and a brief description of the discrepancy within 24 hours of
            receiving the item. Please include your order number in the subject
            line.
          </p>
          <h3 className="mt-5 uppercase font-semibold text-xl sm:text-2xl">
            DOES MY NEON COME WITH A WARRANTY?
          </h3>
          <p>
            NeonShop Neon signs and neon lights are of the highest quality. We
            offer an amazing 24-month manufacturer’s warranty – DOUBLE the
            industry standard! Please note, our manufacturer’s warranty covers
            all electrical components, when used appropriately indoors.
          </p>
          <p>
            For all signage used outdoors (i.e. when purchased with a waterproof
            box), we offer a 3-month manufacturer’s warranty when used
            appropriately. Please note, waterproof boxes are designed for
            permanent fixture and not designed to be moved regularly.
          </p>
          <p>
            Depending on the fault, NeonShop will either fix, replace or refund
            the product. NeonShop reserve the right to select the most
            appropriate actions to fulfil the warranty.
          </p>

          <p>
            Please contact <CustomLink href="mailto:hello@neonshop.com" text="hello@neonshop.com" className="font-semibold"/> for all warranty queries.
          </p>
        </section>
      </div>
      <NewsLetterSection />
      <FollowSection />
    </div>
  );
};

export default RefundPolicy;