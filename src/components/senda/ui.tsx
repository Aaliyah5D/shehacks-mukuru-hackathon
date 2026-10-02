import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";

type BtnVariant = "primary" | "secondary" | "accent" | "ghost";

const btnBase =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-6 text-lg font-bold transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const btnVariants: Record<BtnVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",

  accent:
    "bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg",

  secondary:
    "border-2 border-primary bg-card text-primary hover:bg-secondary",

  ghost:
    "min-h-12 text-primary underline-offset-4 hover:underline",
};

export const buttonClass = (
  variant: BtnVariant = "primary",
  extra?: string,
) => cn(btnBase, btnVariants[variant], extra);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: BtnVariant;
  }
>(({ variant = "primary", className, ...props }, ref) => (
  <button
    ref={ref}
    className={buttonClass(variant, className)}
    {...props}
  />
));

Button.displayName = "Button";


/* ---------------------------------------------------------
   INPUT FIELD
--------------------------------------------------------- */

export function Field({
  label,
  id,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-base font-bold text-foreground"
      >
        {label}
      </label>

      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(
          "h-14 w-full rounded-2xl border-2 bg-card px-4 text-lg",
          "outline-none transition-all",
          "focus:border-primary focus:ring-4 focus:ring-primary/10",
          error
            ? "border-destructive"
            : "border-input",
        )}
        {...props}
      />

      {error && (
        <p
          id={`${id}-err`}
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}


/* ---------------------------------------------------------
   MONEY INPUT
--------------------------------------------------------- */

export function MoneyField({
  label,
  currency = "ZAR",
  symbol = "R",
  value,
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  currency?: string;
  symbol?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={props.id}
          className="text-base font-bold"
        >
          {label}
        </label>

        <span className="text-sm font-semibold text-muted-foreground">
          {currency}
        </span>
      </div>

      <div className="flex h-16 overflow-hidden rounded-2xl border-2 border-input bg-card transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
        <div className="grid w-16 place-items-center border-r bg-secondary text-xl font-extrabold">
          {symbol}
        </div>

        <input
          {...props}
          value={value}
          onChange={onChange}
          inputMode="decimal"
          className="min-w-0 flex-1 bg-transparent px-4 text-2xl font-extrabold outline-none"
        />
      </div>
    </div>
  );
}


/* ---------------------------------------------------------
   MONEY BREAKDOWN
--------------------------------------------------------- */

export function MoneyBreakdown({
  sendAmount,
  fee,
  exchangeRate,
  recipientAmount,
  recipientCurrency = "USD",
}: {
  sendAmount: string;
  fee: string;
  exchangeRate: string;
  recipientAmount: string;
  recipientCurrency?: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-border bg-secondary p-4">
      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            You send
          </span>

          <span className="font-bold">
            {sendAmount}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Mukuru fee
          </span>

          <span className="font-bold">
            {fee}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Exchange rate
          </span>

          <span className="font-bold">
            {exchangeRate}
          </span>
        </div>

        <div className="my-2 border-t" />

        <div className="flex items-center justify-between">
          <span className="font-bold">
            Recipient gets
          </span>

          <span className="text-xl font-extrabold text-primary">
            {recipientAmount} {recipientCurrency}
          </span>
        </div>

      </div>
    </div>
  );
}


/* ---------------------------------------------------------
   TRUST MESSAGE
--------------------------------------------------------- */

export function TrustMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <span
        className="mt-0.5 text-lg"
        aria-hidden
      >
        🔒
      </span>

      <p className="text-sm font-medium leading-5 text-muted-foreground">
        {children}
      </p>
    </div>
  );
}


/* ---------------------------------------------------------
   ERROR MESSAGE
--------------------------------------------------------- */

export function ErrorMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border-2 border-destructive/30 bg-accent-soft px-4 py-3 font-medium text-destructive"
    >
      <span aria-hidden>⚠</span>{" "}
      {children}
    </div>
  );
}


/* ---------------------------------------------------------
   CARD
--------------------------------------------------------- */

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-card p-5",
        "border border-border/50",
        "shadow-[0_1px_2px_oklch(0.245_0.058_265/0.06),0_8px_24px_-12px_oklch(0.245_0.058_265/0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}


/* ---------------------------------------------------------
   LANGUAGE SELECTOR
--------------------------------------------------------- */

export function LanguageSelector() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex rounded-full border-2 border-border bg-card p-0.5 text-sm font-bold"
    >
      {(Object.keys(LANGUAGES) as Lang[]).map((language) => (
        <button
          key={language}
          onClick={() => setLang(language)}
          aria-pressed={lang === language}
          className={cn(
            "min-h-9 rounded-full px-3 transition-colors",
            lang === language
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {LANGUAGES[language].label}
        </button>
      ))}
    </div>
  );
}


/* ---------------------------------------------------------
   LOGO
--------------------------------------------------------- */

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
      aria-label="Senda home"
    >
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground"
      >
        ➜
      </span>

      <span>Senda</span>
    </Link>
  );
}


/* ---------------------------------------------------------
   RECIPIENT CARD
--------------------------------------------------------- */

export function RecipientCard({
  name,
  country,
  phone,
}: {
  name: string;
  country: string;
  phone?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4">

      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-lg font-extrabold text-primary">
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0">
        <p className="font-extrabold">
          {name}
        </p>

        <p className="text-sm text-muted-foreground">
          {country}
          {phone ? ` • ${phone}` : ""}
        </p>
      </div>
    </div>
  );
}


/* ---------------------------------------------------------
   HEADER
--------------------------------------------------------- */

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <Logo />

      <LanguageSelector />
    </header>
  );
}


/* ---------------------------------------------------------
   SCREEN
--------------------------------------------------------- */

export function Screen({
  title,
  step,
  back,
  children,
}: {
  title: string;
  step?: number;
  back?: string;
  children: ReactNode;
}) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          {back ? (
            <Link
              to={back}
              className="-ml-2 inline-flex min-h-11 items-center px-2 font-semibold text-muted-foreground hover:text-foreground"
            >
              ← {t("back")}
            </Link>
          ) : (
            <span />
          )}

          {step && (
            <span className="text-sm font-bold text-muted-foreground">
              {t("step", { n: step })}
            </span>
          )}

        </div>

        {step && (
          <div
            className="flex gap-1.5"
            aria-hidden
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  i <= step
                    ? "bg-primary"
                    : "bg-border",
                )}
              />
            ))}
          </div>
        )}

        <h1 className="pt-2 text-3xl font-extrabold leading-tight tracking-tight">
          {title}
        </h1>

      </div>

      {children}
    </div>
  );
}
