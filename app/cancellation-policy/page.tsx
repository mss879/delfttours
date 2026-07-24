import { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Delft Tours cancellation and refund policy — refund schedule by notice period, cancellations by Delft Tours, no-show policy and how to request a refund.",
  alternates: {
    canonical: "https://delfttours.com/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
  return (
    <LegalLayout
      title="Cancellation Policy"
      lastUpdated="March 2026"
      intro="This policy explains how cancellations and refunds are handled. It forms part of our Terms & Conditions and applies to every booking made with Delft Tours."
    >
      <section>
        <h2>Cancellation by Traveler</h2>
        <p>
          Cancellations must be submitted in writing via email. The following
          refund schedule applies based on the notice period before the
          scheduled travel date:
        </p>
        <ul>
          <li>
            <strong>30+ days before travel:</strong> Full refund minus a 5%
            administrative fee
          </li>
          <li>
            <strong>15–29 days before travel:</strong> 50% refund
          </li>
          <li>
            <strong>7–14 days before travel:</strong> 25% refund
          </li>
          <li>
            <strong>Less than 7 days before travel:</strong> No refund
          </li>
        </ul>
      </section>

      <section>
        <h2>Cancellation by Delft Tours</h2>
        <p>
          In the unlikely event that Delft Tours cancels a tour due to force
          majeure (natural disasters, political unrest, pandemics, etc.) or
          insufficient bookings, travelers will receive a full refund or the
          option to reschedule at no extra cost.
        </p>
      </section>

      <section>
        <h2>No-Show Policy</h2>
        <p>
          If a traveler fails to appear on the scheduled tour date without prior
          written notice, no refund will be issued.
        </p>
      </section>

      <section>
        <h2>Partial Tour Usage</h2>
        <p>
          No refund will be provided for any unused portion of a tour, including
          but not limited to missed accommodations, meals, transport, or
          activities, unless it is due to a fault by Delft Tours.
        </p>
      </section>

      <section>
        <h2>Refund Processing</h2>
        <p>
          Approved refunds will be processed within 10–15 business days via the
          original payment method. Bank transfer fees, if any, will be deducted
          from the refund amount.
        </p>
      </section>

      <section>
        <h2>How to Request a Refund</h2>
        <p>
          To request a refund, please email us at{" "}
          <a href="mailto:support@delfttours.com">support@delfttours.com</a>{" "}
          with your booking reference number and the reason for cancellation.
        </p>
      </section>
    </LegalLayout>
  );
}
