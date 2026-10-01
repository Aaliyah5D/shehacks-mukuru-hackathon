import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useI18n, n as Card, u as cn } from "./ui-DCNPigep.mjs";
import { i as fmt } from "./api-_cZDKRL1.mjs";
import { t as STATUS_FLOW } from "./types-BFQWD2zc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/money-cyG8XDeY.js
var import_jsx_runtime = require_jsx_runtime();
function CountrySelector({ label, countries, value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "mb-2 text-base font-semibold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
			children: countries.map((c) => {
				const selected = c.code === value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: cn("flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card px-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-ring", selected ? "border-primary" : "border-border hover:border-input", disabled && "cursor-default"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							className: "sr-only",
							name: label,
							value: c.code,
							checked: selected,
							disabled,
							onChange: () => onChange?.(c.code)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-3xl",
							"aria-hidden": true,
							children: c.flag
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-lg font-semibold",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-muted-foreground",
								children: c.currencyCode
							})]
						}),
						selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-7 w-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground",
							"aria-hidden": true,
							children: "✓"
						})
					]
				}, c.code);
			})
		})]
	});
}
function AmountInput({ value, onChange, label, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor: "amount",
		className: "sr-only",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-baseline gap-2 rounded-3xl border-2 bg-card px-5 py-4 focus-within:border-primary", error ? "border-destructive" : "border-border"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-4xl font-bold text-muted-foreground",
				children: "R"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "amount",
				inputMode: "decimal",
				autoComplete: "off",
				value,
				onChange: (e) => onChange(e.target.value.replace(/[^\d.]/g, "")),
				"aria-invalid": !!error,
				className: "tabular w-full bg-transparent text-5xl font-extrabold tracking-tight outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-lg font-semibold text-muted-foreground",
				children: "ZAR"
			})
		]
	})] });
}
function Row({ label, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: cn("text-base", strong ? "font-semibold" : "text-muted-foreground"),
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("tabular text-right", strong ? "text-xl font-extrabold" : "text-lg font-semibold"),
			children: value
		})]
	});
}
function FeeBreakdown({ quote, country }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "divide-y divide-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: t("youSend"),
					value: `R ${fmt(quote.amount)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: t("fee"),
					value: `+ R ${fmt(quote.fee)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: t("rate"),
					value: `1 ZAR = ${fmt(quote.rate, quote.rate < 10 ? 2 : 1)} ${quote.receiveCurrency}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: t("totalCost"),
					value: `R ${fmt(quote.total)}`,
					strong: true
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 rounded-2xl bg-success-soft p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-success",
					children: t("recipientGets")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tabular text-3xl font-extrabold tracking-tight",
					children: [
						fmt(quote.receiveAmount),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl",
							children: quote.receiveCurrency
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						country.flag,
						" ",
						country.name
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-center text-sm font-semibold text-success",
			children: ["✓ ", t("noHidden")]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-center text-sm text-muted-foreground",
			children: t("rateHeld", { time: clockTime(quote.rateValidUntil) })
		})
	] });
}
var clockTime = (iso) => new Date(iso).toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit"
});
var STATUS_KEY = {
	SENT: "status_SENT",
	IN_TRANSIT: "status_IN_TRANSIT",
	READY_TO_COLLECT: "status_READY_TO_COLLECT",
	COLLECTED: "status_COLLECTED"
};
var MSG_KEY = {
	SENT: "msg_SENT",
	IN_TRANSIT: "msg_IN_TRANSIT",
	READY_TO_COLLECT: "msg_READY_TO_COLLECT",
	COLLECTED: "msg_COLLECTED"
};
function StatusTracker({ status }) {
	const { t } = useI18n();
	const idx = STATUS_FLOW.indexOf(status);
	const finished = status === "COLLECTED";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "status",
		"aria-live": "polite",
		className: "mb-5 rounded-2xl bg-success-soft p-4 text-lg font-semibold",
		children: t(MSG_KEY[status])
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-0",
		children: STATUS_FLOW.map((s, i) => {
			const done = i < idx || finished && i === idx;
			const current = i === idx && !finished;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-4",
				"aria-current": current ? "step" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 text-lg font-bold", done && "border-success bg-success text-success-foreground", current && "border-accent bg-accent text-accent-foreground ring-4 ring-accent-soft", !done && !current && "border-input bg-card text-muted-foreground"),
						"aria-hidden": true,
						children: done ? "✓" : current ? "●" : "○"
					}), i < STATUS_FLOW.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("my-1 w-0.5 flex-1 min-h-6", i < idx ? "bg-success" : "bg-border"),
						"aria-hidden": true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-6 pt-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-lg font-bold", !done && !current && "text-muted-foreground"),
						children: [
							i + 1,
							". ",
							t(STATUS_KEY[s])
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: done ? t("done") : current ? t("current") : t("waiting")
					})]
				})]
			}, s);
		})
	})] });
}
/** The (mock) SMS messages the recipient has been sent, newest first. */
function RecipientMessages({ transfer }) {
	const { t } = useI18n();
	if (!transfer.notifications.length) return null;
	const vars = {
		sender: transfer.sender.name,
		name: transfer.recipient.name,
		amount: fmt(transfer.quote.receiveAmount),
		cur: transfer.quote.receiveCurrency,
		id: transfer.id
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
		children: t("smsTitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: [...transfer.notifications].reverse().map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-1 text-xs text-muted-foreground",
			children: [
				t("smsTo", { to: n.to }),
				" · ",
				clockTime(n.at)
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl rounded-tl-sm bg-secondary px-4 py-3",
			children: t(SMS_KEY[n.kind], vars)
		})] }, n.kind))
	})] });
}
var SMS_KEY = {
	SENT: "sms_SENT",
	READY_TO_COLLECT: "sms_READY_TO_COLLECT"
};
//#endregion
export { StatusTracker as a, RecipientMessages as i, CountrySelector as n, FeeBreakdown as r, AmountInput as t };
