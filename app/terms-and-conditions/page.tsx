import { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing bookings, payments, travel documents, liability and cancellations with Delft Tours & Travels (Pvt) Ltd, Sri Lanka.",
  alternates: {
    canonical: "https://delfttours.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      lastUpdated="March 2026"
      intro="These terms apply to every booking made with Delft Tours & Travels (Pvt) Ltd. By confirming a booking, you agree to the conditions set out below."
    >
      <section>
        <h2>1. Booking Confirmation</h2>
        <p>
          A booking is confirmed only upon receipt of payment (bank transfer or
          via the payment link provided). A booking confirmation email will be
          sent to the email address provided during checkout.
        </p>
      </section>

      <section>
        <h2>2. Pricing &amp; Payment</h2>
        <p>
          All prices listed on our website are per person and are subject to
          change without prior notice until the booking is confirmed. Payments
          must be made in full before the travel date unless otherwise agreed in
          writing by Delft Tours.
        </p>
      </section>

      <section>
        <h2>3. Travel Documents</h2>
        <p>
          It is the responsibility of the traveler to ensure they have a valid
          passport and any required visas for entry into Sri Lanka. Delft Tours
          is not liable for any denied entry due to incorrect or expired travel
          documents.
        </p>
      </section>

      <section>
        <h2>4. Itinerary Changes</h2>
        <p>
          While Delft Tours endeavors to operate all tours as described, we
          reserve the right to modify any itinerary due to unforeseen
          circumstances such as weather conditions, road closures, or government
          regulations. Any such changes will be communicated promptly.
        </p>
      </section>

      <section>
        <h2>5. Liability</h2>
        <p>
          Delft Tours acts as an intermediary between travelers and
          accommodation providers, transport companies, and other service
          suppliers. We are not liable for any injury, loss, damage, accident,
          delay, or irregularity that may occur during the tour through the
          actions or omissions of third-party service providers.
        </p>
      </section>

      <section>
        <h2>6. Travel Insurance</h2>
        <p>
          We strongly recommend that all travelers purchase comprehensive travel
          insurance covering trip cancellation, medical expenses, personal
          belongings, and any other potential losses before departure.
        </p>
      </section>

      <section>
        <h2>7. Cancellations &amp; Refunds</h2>
        <p>
          Cancellations, refunds and no-shows are governed by our{" "}
          <a href="/cancellation-policy">Cancellation Policy</a>, which forms
          part of these Terms &amp; Conditions.
        </p>
      </section>

      <section>
        <h2>8. Privacy &amp; Data</h2>
        <p>
          Personal information collected during the booking process is used
          solely for the purpose of arranging your tour and will not be shared
          with third parties except as necessary for service fulfillment. Your
          data is stored securely. For full details, see our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </section>

      <section>
        <h2>9. Governing Law</h2>
        <p>
          These terms and conditions are governed by the laws of Sri Lanka. Any
          disputes arising from these terms shall be subject to the exclusive
          jurisdiction of the courts of Sri Lanka.
        </p>
      </section>
    </LegalLayout>
  );
}
