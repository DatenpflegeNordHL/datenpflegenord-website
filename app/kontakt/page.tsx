import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Signalcheck anfragen: Website, Ort und Anliegen einreichen. DatenpflegeNord prüft den passenden technischen Einstieg.",
  alternates: { canonical: "https://datenpflegenord.de/kontakt" },
}

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
