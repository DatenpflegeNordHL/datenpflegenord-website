"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { portalProfileService } from "@/lib/portal/profile-service"
import {
  businessModelSchema,
  isWebsiteInput,
  normalizeWebsiteUrl,
  toCleanList,
} from "@/lib/portal-profile"

const portalOnboardingSchema = z.object({
  companyName: z.string().trim().min(2, "Bitte Unternehmensname eintragen."),
  websiteUrl: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || isWebsiteInput(value),
      "Bitte eine gültige Website-URL eintragen.",
    ),
  industry: z.string().trim().min(2, "Bitte Branche eintragen."),
  region: z.string().trim().min(2, "Bitte Region eintragen."),
  businessModel: businessModelSchema,
  mainServices: z.string().trim().min(2, "Bitte mindestens eine Hauptleistung eintragen."),
  targetCustomers: z.string().trim().min(2, "Bitte Zielkunden eintragen."),
  cmsSystem: z.string().trim(),
  hasShop: z.boolean(),
  hasBookingSystem: z.boolean(),
  hasContactForms: z.boolean(),
  hasGoogleBusinessProfile: z.boolean(),
  hasExternalProfiles: z.boolean(),
  usesAiTools: z.boolean(),
  hasInternalDocuments: z.boolean(),
  digitalProblems: z.string().trim(),
  desiredAiSearchQueries: z.string().trim(),
})

type PortalOnboardingValues = z.infer<typeof portalOnboardingSchema>

type BooleanFieldName =
  | "hasShop"
  | "hasBookingSystem"
  | "hasContactForms"
  | "hasGoogleBusinessProfile"
  | "hasExternalProfiles"
  | "usesAiTools"
  | "hasInternalDocuments"

type TextAreaFieldName =
  | "mainServices"
  | "targetCustomers"
  | "digitalProblems"
  | "desiredAiSearchQueries"

const booleanFields: Array<{
  name: BooleanFieldName
  label: string
  description: string
}> = [
  {
    name: "hasShop",
    label: "Shop vorhanden",
    description: "Produkte, Warenkorb oder Checkout auf der Website.",
  },
  {
    name: "hasBookingSystem",
    label: "Buchungssystem vorhanden",
    description: "Online-Termine, Reservierung oder Anfragekalender.",
  },
  {
    name: "hasContactForms",
    label: "Kontaktformulare vorhanden",
    description: "Formulare für Anfragen, Leads, Bewerbung oder Support.",
  },
  {
    name: "hasGoogleBusinessProfile",
    label: "Google Business Profile vorhanden",
    description: "Ein gepflegtes oder beanspruchtes Google-Unternehmensprofil.",
  },
  {
    name: "hasExternalProfiles",
    label: "Externe Profile vorhanden",
    description: "Branchenportale, Standortseiten, Bewertungsprofile oder Verzeichnisse.",
  },
  {
    name: "usesAiTools",
    label: "KI-Tools im Einsatz",
    description: "Zum Beispiel ChatGPT, Copilot, Automatisierungen oder interne Assistenten.",
  },
  {
    name: "hasInternalDocuments",
    label: "Interne Dokumentenquellen vorhanden",
    description: "FAQ, Preislisten, PDFs, SOPs, Wissensdatenbanken oder Vorlagen.",
  },
]

const textAreaFields: Array<{
  name: TextAreaFieldName
  label: string
  placeholder: string
  description: string
}> = [
  {
    name: "mainServices",
    label: "Hauptleistungen",
    placeholder: "z. B. Beratung\nWartung\nOnline-Buchung",
    description: "Eine Leistung pro Zeile oder mit Komma getrennt.",
  },
  {
    name: "targetCustomers",
    label: "Zielkunden",
    placeholder: "z. B. Privatkunden\nregionale Unternehmen\nöffentliche Einrichtungen",
    description: "Eine Zielgruppe pro Zeile oder mit Komma getrennt.",
  },
  {
    name: "digitalProblems",
    label: "Größte digitale Probleme",
    placeholder: "z. B. Website veraltet\nBFSG-Readiness unklar\nzu wenig lokale Anfragen",
    description: "Die wichtigsten offenen Punkte aus Sicht des Unternehmens.",
  },
  {
    name: "desiredAiSearchQueries",
    label: "Gewünschte KI-Suchfragen",
    placeholder: "z. B. Welcher Anbieter in Lübeck bietet ...?\nWelche Firma hilft bei ...?",
    description: "Optional. Daraus entsteht die GEO-/KI-Sichtbarkeits-Vorschau.",
  },
]

const defaultValues: PortalOnboardingValues = {
  companyName: "",
  websiteUrl: "",
  industry: "",
  region: "Schleswig-Holstein",
  businessModel: "both",
  mainServices: "",
  targetCustomers: "",
  cmsSystem: "",
  hasShop: false,
  hasBookingSystem: false,
  hasContactForms: false,
  hasGoogleBusinessProfile: false,
  hasExternalProfiles: false,
  usesAiTools: false,
  hasInternalDocuments: false,
  digitalProblems: "",
  desiredAiSearchQueries: "",
}

export function PortalOnboardingForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState("")
  const form = useForm<PortalOnboardingValues>({
    resolver: zodResolver(portalOnboardingSchema),
    defaultValues,
  })

  const onSubmit = async (values: PortalOnboardingValues) => {
    setSubmitError("")

    try {
      await portalProfileService.saveProfile({
        companyName: values.companyName.trim(),
        websiteUrl: normalizeWebsiteUrl(values.websiteUrl),
        industry: values.industry.trim(),
        region: values.region.trim(),
        businessModel: values.businessModel,
        mainServices: toCleanList(values.mainServices),
        targetCustomers: toCleanList(values.targetCustomers),
        cmsSystem: values.cmsSystem.trim() || undefined,
        hasShop: values.hasShop,
        hasBookingSystem: values.hasBookingSystem,
        hasContactForms: values.hasContactForms,
        hasGoogleBusinessProfile: values.hasGoogleBusinessProfile,
        hasExternalProfiles: values.hasExternalProfiles,
        usesAiTools: values.usesAiTools,
        hasInternalDocuments: values.hasInternalDocuments,
        digitalProblems: toCleanList(values.digitalProblems),
        desiredAiSearchQueries: toCleanList(values.desiredAiSearchQueries),
      })

      router.push("/portal/dashboard")
    } catch {
      setSubmitError("Das Profil konnte nicht erstellt werden. Bitte prüfen Sie die Eingaben.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unternehmensname</FormLabel>
                  <FormControl>
                    <Input placeholder="z. B. NordWerk Digital GmbH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website-URL</FormLabel>
                  <FormControl>
                    <Input placeholder="z. B. datenpflegenord.de" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branche</FormLabel>
                  <FormControl>
                    <Input placeholder="z. B. Pflege, Handwerk, Hotel, SaaS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="z. B. Lübeck, Kiel, Schleswig-Holstein" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>B2B / B2C</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Geschäftsmodell auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="both">beides</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cmsSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CMS / Website-System</FormLabel>
                  <FormControl>
                    <Input placeholder="z. B. WordPress, Shopify, Wix, Eigenentwicklung" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {textAreaFields.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder={item.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{item.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {booleanFields.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 rounded-lg border border-border bg-secondary/30 p-4">
                    <FormControl>
                      <Checkbox
                        checked={Boolean(field.value)}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                    </FormControl>
                    <div className="grid gap-1 leading-none">
                      <FormLabel className="text-sm font-semibold">{item.label}</FormLabel>
                      <FormDescription className="text-xs leading-relaxed">{item.description}</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {submitError && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{submitError}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Der Portal-MVP speichert das Profil als Demo nur lokal im Browser. Kein Login, kein Upload, keine Vertragsdaten.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {form.formState.isSubmitting ? "Speichere..." : "Ergebnis anzeigen"}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
