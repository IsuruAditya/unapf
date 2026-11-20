"use client";

import { useRef, useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { forms, splitMulti, validate, type FieldDef, type FormDef } from "@/lib/forms";
import { useT } from "@/i18n/client";
import { isDictKey } from "@/i18n/dictionaries";

/** Renders a form definition with the reference's Wix form styling. */
export function DynamicForm({ id, showTitle = true }: { id: FormDef["id"]; showTitle?: boolean }) {
  const def = forms[id];
  const { t } = useT();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const label = (f: FieldDef) => (isDictKey(f.label) ? t(f.label) : f.label);
  const set = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));
  const toggleMulti = (name: string, opt: string, on: boolean) => {
    const cur = new Set(splitMulti(values[name] ?? ""));
    if (on) cur.add(opt);
    else cur.delete(opt);
    set(name, [...cur].join("|"));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("company_fax") as string) || "";
    const { errors: errs } = validate(def, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("error");
      setMessage(t("form.fixErrors"));
      document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`/api/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_fax: honeypot }),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("done");
        setValues({});
      } else {
        setErrors(json.fields ?? {});
        setStatus("error");
        setMessage(json.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const errEl = (f: FieldDef) =>
    errors[f.name] ? (
      <p id={`${id}-${f.name}-err`} className="mt-1 text-[12px] text-red-700">
        {errors[f.name]}
      </p>
    ) : null;

  function renderField(f: FieldDef) {
    if (f.showIf && values[f.showIf.field] !== f.showIf.equals) return null;
    const fid = `${id}-${f.name}`;
    const err = errors[f.name];
    const span = f.wide || f.type === "heading" ? "md:col-span-2" : "";
    const req = f.required ? " *" : "";
    const aria = {
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `${fid}-err` : undefined,
    } as const;

    switch (f.type) {
      case "heading":
        return (
          <h3 key={f.name} className={`${span} -mb-2 mt-4 text-[18px] font-semibold text-muted`}>
            {label(f)}
          </h3>
        );
      case "upload":
        return (
          <div key={f.name} className={span}>
            <p className="mb-2 text-[13px] text-[#333]">{label(f)}</p>
            <button
              type="button"
              disabled
              aria-describedby={`${fid}-note`}
              className="flex h-7 w-full max-w-[230px] cursor-not-allowed items-center justify-center gap-2 border border-[#555] text-[13px] text-[#777]"
            >
              <Plus aria-hidden className="size-4" strokeWidth={3} />
              {f.placeholder}
            </button>
            <p id={`${fid}-note`} className="mt-1 text-[11px] text-muted">
              {t("form.uploadNote")}
            </p>
          </div>
        );
      case "disclaimer":
        return (
          <div key={f.name} className={`${span} ${f.wide ? "flex justify-center" : ""} self-end`}>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex items-center rounded-xl bg-accent-soft px-6 py-2 text-[17px] font-bold text-white transition-colors hover:bg-accent"
            >
              {label(f)}
              <ChevronRight aria-hidden className="size-4" strokeWidth={3} />
            </button>
          </div>
        );
      case "radio":
        return (
          <fieldset key={f.name} className={span} {...aria}>
            <legend className="mb-1 text-[13px] text-[#333]">
              {label(f)}
              {req}
            </legend>
            <div className="space-y-1">
              {f.options?.map((o) => (
                <label key={o} className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-[#333]">
                  <input
                    type="radio"
                    id={o === f.options?.[0] ? fid : undefined}
                    name={f.name}
                    value={o}
                    checked={values[f.name] === o}
                    onChange={() => set(f.name, o)}
                    className="size-[18px] cursor-pointer appearance-none rounded-full border border-[#555] bg-white checked:border-[5px] checked:border-accent"
                  />
                  {o === "Yes" ? t("form.yes") : o === "No" ? t("form.no") : o}
                </label>
              ))}
            </div>
            {errEl(f)}
          </fieldset>
        );
      case "checkboxes": {
        const sel = new Set(splitMulti(values[f.name] ?? ""));
        return (
          <fieldset key={f.name} className={span} {...aria}>
            <legend className="mb-1 text-[13px] text-[#333]">
              {label(f)}
              {req}
            </legend>
            <div className="space-y-1">
              {f.options?.map((o, i) => (
                <label key={o} className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-[#333]">
                  <input
                    type="checkbox"
                    id={i === 0 ? fid : undefined}
                    checked={sel.has(o)}
                    onChange={(e) => toggleMulti(f.name, o, e.target.checked)}
                    className="size-[17px] cursor-pointer accent-accent"
                  />
                  {o}
                </label>
              ))}
            </div>
            {errEl(f)}
          </fieldset>
        );
      }
      case "checkbox":
        return (
          <div key={f.name} className={span}>
            <label className="flex cursor-pointer items-start gap-2.5 font-[Arial,sans-serif] text-[13px] leading-[1.15] text-black">
              <input
                id={fid}
                type="checkbox"
                checked={values[f.name] === "true"}
                onChange={(e) => set(f.name, e.target.checked ? "true" : "")}
                className="mt-2 size-[17px] shrink-0 cursor-pointer accent-accent"
                {...aria}
              />
              <span>
                {label(f)}
                {req}
              </span>
            </label>
            {errEl(f)}
          </div>
        );
      default: {
        const common = {
          id: fid,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          maxLength: f.max,
          placeholder: f.placeholder,
          className: "field-line",
          value: values[f.name] ?? "",
          ...aria,
        };
        let control: React.ReactNode;
        if (f.type === "textarea") {
          control = <textarea {...common} rows={4} onChange={(e) => set(f.name, e.target.value)} className="field-line resize-y" />;
        } else if (f.type === "select") {
          control = (
            <select {...common} onChange={(e) => set(f.name, e.target.value)}>
              <option value="">{f.placeholder ?? t("form.select")}</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          );
        } else {
          control = <input {...common} type={f.type} onChange={(e) => set(f.name, e.target.value)} />;
        }
        return (
          <div key={f.name} className={span}>
            <label htmlFor={fid} className="block text-[13px] text-[#333]">
              {label(f)}
              {req}
            </label>
            <div className="mt-2">{control}</div>
            {errEl(f)}
          </div>
        );
      }
    }
  }

  return (
    <div className="mx-auto max-w-[830px] bg-sand px-5 pb-16 pt-6 md:px-[100px]">
      {showTitle && <h2 className="text-center text-[24px] font-light text-muted md:text-[27px]">{def.title}</h2>}
      {status === "done" ? (
        <p role="status" className="mt-8 border-l-4 border-accent bg-white p-6 text-lg">
          {t("form.success")}
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6">
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">{def.fields.map(renderField)}</div>
          {/* Honeypot, hidden from people and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px]">
            <label>
              Leave empty
              <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="mt-6 text-[12px] text-muted">{t("form.privacy")}</p>
          {status === "error" && message && (
            <p role="alert" className="mt-4 border-l-4 border-red-700 bg-red-50 p-4 text-[14px] text-red-800">
              {message}
            </p>
          )}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-w-[155px] rounded-[6px] bg-accent px-8 py-[7px] text-[19px] font-bold text-white transition-colors hover:bg-nav disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : def.submitLabel}
            </button>
          </div>
        </form>
      )}

      {def.fields.some((f) => f.type === "disclaimer") && (
        <dialog
          ref={dialogRef}
          aria-labelledby={`${id}-disclaimer-title`}
          className="m-auto max-w-lg rounded-lg p-0 backdrop:bg-black/50"
          onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        >
          <div className="p-6">
            <h3 id={`${id}-disclaimer-title`} className="text-[20px] text-muted">
              {t("form.disclaimerTitle")}
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-body">{t("form.disclaimerText")}</p>
            <form method="dialog" className="mt-6 text-right">
              <button className="rounded-[5px] bg-accent px-5 py-2 text-[15px] font-bold text-white hover:bg-nav">{t("gallery.close")}</button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
