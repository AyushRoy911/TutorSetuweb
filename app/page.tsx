import LandingPage from "@/components/landing-page";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "TutorSetu",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "TutorSetu connects students and parents with verified tutors and coaching institutes for home tuition, online classes, one-time sessions, and monthly learning.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPage />
    </>
  );
}
