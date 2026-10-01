import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Screen, d as useI18n, r as ErrorMessage, t as Button } from "./ui-DCNPigep.mjs";
import { n as useFlow } from "./flow-CPEaVGgt.mjs";
import { t as useQuote } from "./use-quote-DosNF6Uj.mjs";
import { r as FeeBreakdown, t as AmountInput } from "./money-cyG8XDeY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/amount-1EAvc8P2.js
var import_jsx_runtime = require_jsx_runtime();
function AmountPage() {
	const { t } = useI18n();
	const { draft, update } = useFlow();
	const nav = useNavigate();
	const { dest, data, isError } = useQuote();
	const limits = data?.limits ?? {
		min: 50,
		max: 5e3
	};
	const n = Number(draft.amount);
	const invalid = draft.amount !== "" && (!Number.isFinite(n) || n < limits.min || n > limits.max);
	const quote = !invalid && data?.quote?.amount === Math.round(n * 100) / 100 ? data.quote : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		title: t("howMuch"),
		step: 2,
		back: "/send",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountInput, {
					label: t("youSend"),
					value: draft.amount,
					onChange: (v) => update({ amount: v }),
					error: invalid ? t("errAmount") : void 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: invalid ? "text-sm font-medium text-destructive" : "text-sm text-muted-foreground",
					children: [invalid ? `${t("errAmount")} ` : "", t("limits", {
						min: limits.min,
						max: limits.max.toLocaleString("en-ZA")
					})]
				})]
			}),
			isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: t("errApi") }),
			dest && quote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeeBreakdown, {
				quote,
				country: dest
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: t("mockRate")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				disabled: !quote || invalid || !draft.amount,
				onClick: () => nav({ to: "/recipient" }),
				children: [t("continue"), " →"]
			})
		]
	});
}
//#endregion
export { AmountPage as component };
