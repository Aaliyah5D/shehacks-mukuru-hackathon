import { a as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Screen, d as useI18n, l as buttonClass, n as Card, r as ErrorMessage, t as Button } from "./ui-DCNPigep.mjs";
import { n as useFlow } from "./flow-CPEaVGgt.mjs";
import { n as api, t as ApiError } from "./api-_cZDKRL1.mjs";
import { t as useQuote } from "./use-quote-DosNF6Uj.mjs";
import { r as FeeBreakdown } from "./money-cyG8XDeY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-b2VwFewv.js
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const { t } = useI18n();
	const { draft } = useFlow();
	const nav = useNavigate();
	const { dest, countries, data, refetch } = useQuote();
	const origin = countries?.find((c) => c.code === draft.fromCode);
	const m = useMutation({
		mutationFn: ({ amount, rateWindow }) => api.createTransfer({
			amount,
			rateWindow,
			sender: {
				...draft.sender,
				countryCode: draft.fromCode
			},
			recipient: {
				...draft.recipient,
				countryCode: draft.toCode
			}
		}),
		onSuccess: (tr) => nav({
			to: "/success/$id",
			params: { id: tr.id }
		}),
		onError: (e) => {
			if (e instanceof ApiError && e.code === "quote_expired") refetch();
		}
	});
	const expired = m.error instanceof ApiError && m.error.code === "quote_expired";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		title: t("reviewTitle"),
		step: 4,
		back: "/recipient",
		children: [
			dest && data?.quote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeeBreakdown, {
				quote: data.quote,
				country: dest
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-muted-foreground",
						children: t("from")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold",
						children: draft.sender.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							draft.sender.city,
							", ",
							origin?.name,
							" ",
							origin?.flag
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-muted-foreground",
						children: t("to")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold",
						children: draft.recipient.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							draft.recipient.city,
							", ",
							dest?.name,
							" ",
							dest?.flag
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: draft.recipient.phone
					})
				] })]
			}),
			m.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: expired ? t("errQuoteExpired") : t("errApi") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "accent",
					disabled: m.isPending || !data?.quote,
					onClick: () => data?.quote && m.mutate(data.quote),
					children: m.isPending ? t("sending") : `${t("confirmSend")} ✓`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/amount",
					className: buttonClass("secondary"),
					children: t("editTransfer")
				})]
			})
		]
	});
}
//#endregion
export { ReviewPage as component };
