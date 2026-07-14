import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Map,
  BedDouble,
  Car,
  Users,
  Plane,
  Headset,
  FileSpreadsheet,
  Landmark,
  ShieldCheck,
  Clock,
  Handshake,
  Layers,
  MoveRight,
} from "lucide-react";

export const metadata: Metadata = {
  // The root layout's title.template already appends "| Delft Tours" — don't
  // repeat the brand here or it renders twice in the <title>.
  title: "B2B Partnerships | Inbound Sri Lanka DMC",
  description:
    "Delft Tours is a Colombo-based inbound Sri Lanka DMC for overseas tour operators, travel agencies, OTAs, MICE organisers and wholesalers. Tailor-made itineraries, ground handling, net rates and 24/7 in-destination support.",
  keywords: [
    "Sri Lanka DMC",
    "inbound Sri Lanka tour operator",
    "B2B travel partnerships Sri Lanka",
    "Sri Lanka ground handling",
    "destination management company Sri Lanka",
    "net rates Sri Lanka",
  ],
  alternates: {
    canonical: "https://delfttours.com/b2b-partnerships",
  },
};

const services = [
  {
    icon: Map,
    title: "Tailor-Made Itinerary Design",
    description:
      "Programmes built to your brief and your margins — from 3-day city breaks to multi-week grand tours across the cultural triangle, hill country, wildlife parks and southern coast.",
  },
  {
    icon: Car,
    title: "Ground Handling & Transport",
    description:
      "Private luxury vehicles with vetted chauffeur-guides, airport meet-and-greet at BIA, and coordinated inter-city transfers for every party size.",
  },
  {
    icon: BedDouble,
    title: "Accommodation Contracting",
    description:
      "Boutique villas, tea-estate bungalows, safari camps and international resorts — sourced and blocked to match your client's positioning and budget.",
  },
  {
    icon: Users,
    title: "MICE & Group Movements",
    description:
      "Conferences, incentives and corporate retreats: venue sourcing, delegate logistics, themed gala evenings and on-site coordination throughout.",
  },
  {
    icon: Landmark,
    title: "Excursions & Experiences",
    description:
      "Sigiriya, the Temple of the Tooth, Yala and Udawalawe safaris, Madu River cruises, tea-factory visits and Galle Fort walks — permits and guiding handled.",
  },
  {
    icon: Plane,
    title: "Regional Multi-Country Add-Ons",
    description:
      "Extend Sri Lanka programmes into the Maldives, Dubai, Singapore, Malaysia, Vietnam, Indonesia and Cambodia under a single point of contact.",
  },
];

const strengths = [
  {
    icon: Headset,
    title: "24/7 In-Destination Support",
    description:
      "A local team on Sri Lanka time, reachable while your clients are on the ground and your office is closed.",
  },
  {
    icon: FileSpreadsheet,
    title: "Confidential Net Rates",
    description:
      "Clean net pricing you can mark up freely, with clear inclusions and no rate leakage to your end client.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Suppliers",
    description:
      "Every driver, guide and property in our network is selected and monitored against our own service standards.",
  },
  {
    icon: Clock,
    title: "Fast Quotation Turnaround",
    description:
      "Costed proposals returned promptly so you can respond to your client while the enquiry is still warm.",
  },
  {
    icon: Layers,
    title: "White-Label Documentation",
    description:
      "Itineraries and traveller documents presented under your brand — we stay invisible to your customer.",
  },
  {
    icon: Handshake,
    title: "One Accountable Contact",
    description:
      "A single Colombo-based coordinator owns your file end to end, from first quote to post-tour feedback.",
  },
];

const reasons = [
  {
    title: "We are principals, not resellers",
    description:
      "Delft Tours operates its own inbound programmes from Colombo. You deal directly with the people who contract the suppliers and run the tours — not an intermediary passing your file down the chain.",
  },
  {
    title: "Genuine local knowledge",
    description:
      "Our team is Sri Lankan. We know which tea-estate bungalow is worth the detour, when Kandy is impassable during Esala, and how to sequence Sigiriya and Yala so your clients are not spending their holiday in a vehicle.",
  },
  {
    title: "Built for trade requirements",
    description:
      "Net rates, white-label documents, structured itineraries and responsive coordination — we understand that your reputation travels with every file you send us.",
  },
  {
    title: "Flexible across segments",
    description:
      "FIT couples, families, honeymooners, small groups, incentive delegations and wholesale series departures are all handled by the same team, to the same standard.",
  },
];

export default function B2BPartnershipsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[460px] flex items-center justify-center bg-brand-900 border-b border-white/5">
          <Image
            src="/hero2.webp"
            alt="Sri Lanka landscape — Delft Tours inbound destination management"
            fill
            className="object-cover opacity-45"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/70 to-brand-900/30" />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
            <div className="inline-flex items-center gap-3 mb-6 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#FFC947]">
              <span className="w-8 h-0.5 bg-[#FFC947] block rounded-full" />
              B2B Partnerships
              <span className="w-8 h-0.5 bg-[#FFC947] block rounded-full" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Your Inbound DMC in Sri Lanka
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Delft Tours is a Colombo-based destination management company
              handling the ground for overseas tour operators, travel agencies,
              OTAs, MICE organisers and wholesalers. You sell the destination —
              we run it.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="w-full bg-white py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-slate-200 shadow-[0_20px_80px_rgba(11,62,99,0.12)] lg:rounded-[48px]">
              <Image
                src="/sigiriya.webp"
                alt="Sigiriya Rock Fortress, a cornerstone of Sri Lanka itineraries"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                Partnership Overview
              </span>
              <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                One partner for everything that happens on the ground
              </h2>
              <div className="space-y-4 text-base text-slate-600 sm:text-lg">
                <p>
                  Selling Sri Lanka from abroad means trusting someone else with
                  the part your client actually experiences. Delft Tours exists
                  to make that part predictable. We design the itinerary, contract
                  the hotels, put the right chauffeur-guide in the right vehicle,
                  and stay reachable from the moment your traveller lands at
                  Bandaranaike International until they fly home.
                </p>
                <p>
                  We work exclusively on net rates with our trade partners, so
                  your commercial model stays yours. Documentation can be issued
                  under your brand, and your client never needs to know our name.
                </p>
                <p>
                  Whether you send us one honeymoon file a month or a series of
                  group departures each season, the same Colombo team handles it —
                  and the same standard applies.
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                {["Net rates", "White-label", "24/7 local team", "FIT & groups"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-600"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Key Services */}
        <section className="w-full bg-neutral-50 py-20 lg:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                Key Services
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                What we handle for your clients
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                A full ground product for Sri Lanka, delivered to trade standards
                and adaptable to the way your business already works.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="w-full bg-white py-20 lg:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
              <div className="w-full space-y-6 lg:w-1/3">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                  Our Strengths
                </span>
                <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                  Built around
                  <br />
                  trade priorities
                </h2>
                <p className="text-lg text-slate-600">
                  The things that decide whether a DMC is worth keeping: pricing
                  you can work with, answers when you need them, and no surprises
                  in resort.
                </p>
              </div>

              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
                  {strengths.map((strength) => {
                    const Icon = strength.icon;
                    return (
                      <div key={strength.title} className="flex items-start gap-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600/10 text-green-600">
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-slate-900">
                            {strength.title}
                          </h3>
                          <p className="text-[15px] leading-relaxed text-slate-600">
                            {strength.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="w-full bg-brand-600 py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFC947]">
                Why Delft Tours
              </span>
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Why operators partner with us
              </h2>
              <p className="text-lg leading-relaxed text-white/70">
                You are not short of options for a Sri Lanka DMC. Here is what
                makes the difference once files start moving.
              </p>

              <div className="mt-4 space-y-8">
                {reasons.map((reason, index) => (
                  <div key={reason.title} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FFC947]/40 bg-[#FFC947]/10 text-sm font-black text-[#FFC947]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">
                        {reason.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-white/70">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-brand-700 shadow-2xl sm:rounded-[32px]">
                <Image
                  src="/kandy.webp"
                  alt="Kandy, cultural capital of Sri Lanka"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 280px"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-brand-700 shadow-2xl sm:rounded-[32px]">
                <Image
                  src="/nuwaraeliya.webp"
                  alt="Nuwara Eliya tea country in Sri Lanka's hill country"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 280px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partner With Us CTA */}
        <section className="mx-auto w-full max-w-[1440px] content-center px-4 py-20 sm:px-6 lg:py-[120px]">
          <div className="relative w-full overflow-hidden rounded-[32px] bg-brand-900 px-6 py-16 text-center md:rounded-[48px] md:px-16 md:py-24">
            <Image
              src="/hero4.webp"
              alt=""
              fill
              aria-hidden="true"
              className="object-cover opacity-20"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-900/85 to-brand-900/60" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] rounded-full bg-[#FFC947]/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-[22rem] w-[22rem] rounded-full bg-green-600/15 blur-[100px]" />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-8">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Partner With Us
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Send us a brief, a sample itinerary or a live enquiry and we will
                come back with a costed proposal on net rates. We are happy to
                start with a single file — most of our trade relationships did.
              </p>

              <div className="flex w-full flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:gap-6">
                <Link
                  href="/contact-us"
                  className="btn-pulse inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FFC947] px-8 py-4 text-base font-bold text-[#0b3e63] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#ffbf29] sm:w-auto"
                >
                  <span>Become a Partner</span>
                  <MoveRight className="h-5 w-5" />
                </Link>
              </div>

              <p className="pt-2 text-sm text-white/50">
                Trade enquiries are handled by our Colombo office.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
