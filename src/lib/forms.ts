import { districts, provinces } from "@/data/site";

/*
  Form definitions mirroring the reference Join Us / Become a Partner forms,
  adapted for Sri Lanka (+94 phones, NIC, district + province). Shared by the
  client renderer and the API routes so validation is identical on both sides.
*/

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "url"
  | "select"
  | "textarea"
  | "radio"
  | "checkboxes"
  | "checkbox"
  // Presentation-only (never submitted):
  | "heading"
  | "upload"
  | "disclaimer";

export interface FieldDef {
  name: string;
  /** English label (used as-is) or an i18n key such as "form.email". */
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  max?: number;
  placeholder?: string;
  autoComplete?: string;
  /** Span both columns of the two-column form grid. */
  wide?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
  /** Only render/validate when another field has a given value. */
  showIf?: { field: string; equals: string };
}

export interface FormDef {
  id: "join" | "partners" | "contact";
  table: string;
  title: string;
  submitLabel: string;
  fields: FieldDef[];
}

const PRESENTATIONAL: FieldType[] = ["heading", "upload", "disclaimer"];

// Sri Lankan NIC (old: 9 digits + V/X, new: 12 digits) or a passport number.
const NIC_OR_PASSPORT = /^(?:\d{9}[VvXx]|\d{12}|[A-Za-z]\d{7,8})$/;

const consent =
  'I have read the disclaimer and accept the policies of the U.N Peace Ambassador Foundation. I recognize that by signing this application I am representing not only myself but ALL people and therefore must reflect good character and standards. "ONE VOICE, ONE DREAM, ONE NETWORK."';

export const forms: Record<FormDef["id"], FormDef> = {
  join: {
    id: "join",
    table: "membership_applications",
    title: "UNPAF Application Form",
    submitLabel: "Join Us",
    fields: [
      { name: "h-personal", label: "Personal Information", type: "heading" },
      { name: "firstName", label: "First Name", type: "text", required: true, max: 80, autoComplete: "given-name" },
      { name: "lastName", label: "Last Name", type: "text", required: true, max: 80, autoComplete: "family-name" },
      { name: "email", label: "Email", type: "email", required: true, max: 160, autoComplete: "email" },
      { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+94 7X XXX XXXX", autoComplete: "tel" },
      { name: "dob", label: "Date of Birth", type: "date", required: true, autoComplete: "bday" },
      { name: "countryOfBirth", label: "Country of Birth", type: "text", required: true, max: 80, placeholder: "Country of Birth" },
      {
        name: "organization",
        label: "Organization Associated with:",
        type: "radio",
        required: true,
        options: ["Business Organization", "Faith-based Organization", "Civil Society Organization", "Professional Association", "None"],
      },
      { name: "address", label: "Address", type: "text", required: true, max: 300, placeholder: "Address", autoComplete: "street-address" },
      { name: "district", label: "District", type: "select", required: true, options: districts, placeholder: "Choose your district" },
      { name: "province", label: "Province", type: "select", required: true, options: provinces, placeholder: "Choose your province" },
      {
        name: "education",
        label: "Highest Level of Education",
        type: "select",
        required: true,
        placeholder: "Choose your Highest level",
        options: ["Primary", "G.C.E. O/L", "G.C.E. A/L", "Diploma / Vocational", "Bachelor's Degree", "Master's Degree", "Doctorate"],
      },
      {
        name: "expertise",
        label: "Areas of Expertise :",
        type: "checkboxes",
        required: true,
        options: [
          "Management & Administration",
          "Information Technology",
          "Artistic Skills",
          "Communication Skills",
          "Sales Abilities",
          "Writing Skills",
          "Leadership Skills",
          "Other",
        ],
      },
      {
        name: "involvement",
        label: "How would you like to get involved with UNPAF",
        type: "checkboxes",
        required: true,
        wide: true,
        options: [
          "Volunteer at an event",
          "Support the movement with a voluntary donation",
          "Become a member",
          "Business/ Organization/ Association",
          "Sponsorships",
        ],
      },
      { name: "h-family", label: "Family Information", type: "heading" },
      { name: "fatherName", label: "Father's Name", type: "text", required: true, max: 120 },
      { name: "motherName", label: "Mother's Name", type: "text", required: true, max: 120 },
      { name: "fatherDob", label: "Father's Date of Birth", type: "date", required: true },
      { name: "motherDob", label: "Mother's Date of Birth", type: "date", required: true },
      { name: "fatherPob", label: "Father's Place of Birth", type: "text", required: true, max: 120, placeholder: "Place of Birth" },
      { name: "motherPob", label: "Mother's Place of Birth", type: "text", required: true, max: 120, placeholder: "Place of Birth" },
      { name: "maritalStatus", label: "Marital Status:", type: "radio", required: true, options: ["Single", "Married", "Common Law"] },
      { name: "homeNumber", label: "Home Number", type: "tel", placeholder: "Phone" },
      { name: "h-emergency", label: "Emergency Contact", type: "heading" },
      { name: "emergencyName", label: "Emergency Contact Name", type: "text", required: true, max: 120 },
      { name: "emergencyNumber", label: "Emergency Contact Number", type: "tel", required: true, placeholder: "Phone" },
      { name: "relation", label: "Relation", type: "text", required: true, max: 60 },
      { name: "h-identity", label: "Identity Verification", type: "heading" },
      { name: "photoUpload", label: "Upload Your Passport size photo", type: "upload", placeholder: "Upload photo" },
      { name: "idUpload", label: "Upload Your National ID (NIC)", type: "upload", placeholder: "Upload ID" },
      {
        name: "nic",
        label: "NIC / Passport Number",
        type: "text",
        required: true,
        max: 12,
        placeholder: "NIC / Passport Number",
        pattern: NIC_OR_PASSPORT,
        patternMessage: "Enter a valid NIC (e.g. 199012345678 or 901234567V) or passport number.",
      },
      {
        name: "biography",
        label: "Write down your Biography & Inspire us with Social Achievements",
        type: "textarea",
        required: true,
        wide: true,
        max: 3000,
        placeholder: "Biography & Achievements",
      },
      {
        name: "value",
        label: "What value you will add to UNPAF, if selected as Ambassador",
        type: "textarea",
        required: true,
        wide: true,
        max: 2000,
        placeholder: "Your answer here",
      },
      { name: "h-social", label: "Social Profiles", type: "heading" },
      { name: "facebook", label: "Facebook", type: "text", max: 200, placeholder: "Facebook" },
      { name: "twitter", label: "Twitter/X", type: "text", max: 200, placeholder: "Twitter/X" },
      { name: "linkedin", label: "LinkedIn", type: "text", max: 200, placeholder: "LinkedIn" },
      { name: "instagram", label: "Instagram", type: "text", max: 200, placeholder: "Instagram" },
      { name: "signature", label: "Signature (type your full name)", type: "text", required: true, max: 120, autoComplete: "name" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "disclaimerBtn", label: "Read this Indemnity disclaimer", type: "disclaimer", wide: true },
      { name: "consent", label: consent, type: "checkbox", required: true, wide: true },
    ],
  },
  partners: {
    id: "partners",
    table: "partnership_applications",
    title: "UNPAF Partner Registration",
    submitLabel: "Become a Partner",
    fields: [
      { name: "organization", label: "Name of Partner Organization", type: "text", required: true, max: 160, autoComplete: "organization" },
      { name: "chief", label: "Name Of Chief Of Organization", type: "text", required: true, max: 120 },
      { name: "designation", label: "Designation / Status of Chief in your organization", type: "text", required: true, max: 120, placeholder: "Designation" },
      { name: "chiefPhone", label: "Contact Number of Chief", type: "tel", placeholder: "Phone" },
      { name: "registered", label: "Is your organization registered?", type: "radio", required: true, options: ["Yes", "No"] },
      {
        name: "registrationNumber",
        label: "Registration Number",
        type: "text",
        required: true,
        max: 80,
        placeholder: "Registration Number",
        showIf: { field: "registered", equals: "Yes" },
      },
      { name: "email", label: "E-mail Address of Organization", type: "email", required: true, max: 160, placeholder: "Email" },
      { name: "address", label: "Address of Organization", type: "text", required: true, max: 300, placeholder: "Address" },
      { name: "district", label: "District", type: "select", required: true, options: districts, placeholder: "Choose your district" },
      { name: "province", label: "Province", type: "select", required: true, options: provinces, placeholder: "Choose your province" },
      { name: "logoUpload", label: "Upload Logo of Organization", type: "upload", placeholder: "Upload photo", wide: true },
      {
        name: "projects",
        label: "Can you tell us about the projects/Activities or Experiences of your Organization",
        type: "textarea",
        required: true,
        wide: true,
        max: 3000,
        placeholder: "Projects & Activites",
      },
      { name: "h-social", label: "Social Profiles", type: "heading" },
      { name: "website", label: "Website of Organization", type: "url", max: 200, placeholder: "https://" },
      { name: "facebook", label: "Facebook", type: "text", max: 200, placeholder: "Facebook" },
      { name: "twitter", label: "Twitter/X", type: "text", max: 200, placeholder: "Twitter/X" },
      { name: "instagram", label: "Instagram", type: "text", max: 200, placeholder: "Instagram" },
      { name: "disclaimerBtn", label: "Read this Indemnity disclaimer", type: "disclaimer" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "consent", label: consent, type: "checkbox", required: true, wide: true },
    ],
  },
  contact: {
    id: "contact",
    table: "contact_inquiries",
    title: "Send us a message",
    submitLabel: "Submit",
    fields: [
      { name: "fullName", label: "form.fullName", type: "text", required: true, max: 120, autoComplete: "name" },
      { name: "email", label: "form.email", type: "email", required: true, max: 160, autoComplete: "email" },
      { name: "subject", label: "form.subject", type: "text", required: true, max: 160, wide: true },
      { name: "message", label: "form.message", type: "textarea", required: true, max: 3000, wide: true },
    ],
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Sri Lankan numbers: +94 / 0094 / 0 followed by 9 digits (spaces, dashes allowed).
const LK_PHONE = /^(?:\+94|0094|0)\d{9}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const isPresentational = (f: FieldDef) => PRESENTATIONAL.includes(f.type);

/** Multi-select values travel as a single "|"-joined string. */
export const splitMulti = (v: string) => v.split("|").filter(Boolean);

/** Validates raw input against a form definition. Shared by client and server. */
export function validate(def: FormDef, input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const clean: Record<string, string> = {};
  for (const f of def.fields) {
    if (isPresentational(f)) continue;
    if (f.showIf && String(input[f.showIf.field] ?? "") !== f.showIf.equals) continue;
    const raw = input[f.name];
    let v = typeof raw === "string" ? raw.trim() : raw === true ? "true" : "";
    if (f.type === "tel") v = v.replace(/[\s()-]/g, "");
    if (!v) {
      if (f.required) errors[f.name] = "This field is required.";
      continue;
    }
    if (f.max && v.length > f.max) errors[f.name] = `Maximum ${f.max} characters.`;
    else if (f.type === "email" && !EMAIL.test(v)) errors[f.name] = "Enter a valid email address.";
    else if (f.type === "tel" && !LK_PHONE.test(v)) errors[f.name] = "Enter a valid Sri Lankan number, e.g. +94 77 123 4567.";
    else if (f.type === "url" && !/^https?:\/\/[^\s]+$/i.test(v)) errors[f.name] = "Enter a URL starting with http:// or https://.";
    else if (f.type === "date" && (!ISO_DATE.test(v) || Number.isNaN(Date.parse(v)))) errors[f.name] = "Enter a valid date.";
    else if ((f.type === "select" || f.type === "radio") && !f.options?.includes(v)) errors[f.name] = "Choose a valid option.";
    else if (f.type === "checkboxes" && !splitMulti(v).every((x) => f.options?.includes(x))) errors[f.name] = "Choose valid options.";
    else if (f.type === "checkbox" && v !== "true") errors[f.name] = "This field is required.";
    else if (f.pattern && !f.pattern.test(v)) errors[f.name] = f.patternMessage ?? "Invalid format.";
    if (!errors[f.name]) clean[f.name] = v;
  }
  return { errors, clean };
}
