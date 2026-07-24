import { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Delft Tours & Travels (Pvt) Ltd collects, uses, stores and protects the personal information you share when enquiring about or booking a tour in Sri Lanka.",
  alternates: {
    canonical: "https://delfttours.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="March 2026"
      intro="Delft Tours & Travels (Pvt) Ltd respects your privacy. This policy explains what personal information we collect, how we use it, and the choices you have."
    >
      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We collect the information you provide when you request a quote, make a
          booking, or contact us. This typically includes your name, email
          address, phone number, country of residence, and travel details such
          as dates, party size and preferences. When you make a booking, we also
          collect the information needed to arrange and confirm your tour.
        </p>
        <p>
          We do not collect or store full card or bank details on this website.
          Payments are made by bank transfer or through a secure payment link.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>Your information is used solely to:</p>
        <ul>
          <li>Prepare quotations and respond to your enquiries;</li>
          <li>Arrange, confirm and deliver your tour;</li>
          <li>
            Communicate with you about your booking, including confirmations and
            important updates;
          </li>
          <li>
            Meet our legal, accounting and regulatory obligations in Sri Lanka.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Sharing &amp; Disclosure</h2>
        <p>
          We do not sell your personal information. We share it only with the
          suppliers necessary to fulfil your tour — for example hotels,
          transport providers and chauffeur-guides — and only to the extent
          needed to deliver the services you have booked. We may also disclose
          information where required by law.
        </p>
      </section>

      <section>
        <h2>4. Data Retention &amp; Security</h2>
        <p>
          Your data is stored securely and kept only for as long as necessary to
          provide our services and to meet our legal and accounting obligations.
          We apply reasonable technical and organisational measures to protect it
          against unauthorised access, loss or misuse.
        </p>
      </section>

      <section>
        <h2>5. Cookies &amp; Analytics</h2>
        <p>
          Our website uses cookies and similar technologies to keep the site
          working correctly, to remember your preferences (such as your selected
          currency), and to understand how visitors use the site. We may also use
          third-party analytics and advertising tools, including the Meta
          (Facebook) Pixel, to measure and improve our marketing. You can control
          or disable cookies through your browser settings; some features may not
          work as intended if cookies are disabled.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of the personal
          information we hold about you, subject to any legal obligations that
          require us to retain it. To make a request, please contact us using the
          details below.
        </p>
      </section>

      <section>
        <h2>7. Third-Party Links</h2>
        <p>
          Our website may link to external sites, including our social media
          profiles and payment providers. We are not responsible for the privacy
          practices of those third parties, and we encourage you to review their
          policies.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be
          posted on this page with a revised “last updated” date.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          For any questions about this policy or your personal information, email
          us at{" "}
          <a href="mailto:support@delfttours.com">support@delfttours.com</a> or
          write to Delft Tours &amp; Travels (Pvt) Ltd, No 29/5 Jayasinghe Road,
          Kirullapone, Colombo 06, Sri Lanka.
        </p>
      </section>
    </LegalLayout>
  );
}
