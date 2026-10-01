import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { c as Screen, d as useI18n, n as Card, r as ErrorMessage, t as Button } from "./ui-DCNPigep.mjs";
import { i as fmt, n as api, r as countriesQuery, t as ApiError } from "./api-_cZDKRL1.mjs";
import { t as STATUS_FLOW } from "./types-BFQWD2zc.mjs";
import { a as StatusTracker, i as RecipientMessages } from "./money-cyG8XDeY.mjs";
import { t as Route } from "./track._id-BT7F3Q58.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track._id-6tAWnRVh.js
var import_jsx_runtime = require_jsx_runtime();
function TrackPage() {
	const { id } = Route.useParams();
	const { t } = useI18n();
	const qc = useQueryClient();
	const { data: countries } = useQuery(countriesQuery);
	const { data: tr, error, isLoading } = useQuery({
		queryKey: ["transfer", id],
		queryFn: () => api.getTransfer(id),
		retry: false
	});
	const next = tr ? STATUS_FLOW[STATUS_FLOW.indexOf(tr.status) + 1] : void 0;
	const advance = useMutation({
		mutationFn: () => api.setStatus(id, next),
		onSuccess: (updated) => qc.setQueryData(["transfer", id], updated)
	});
	const dest = countries?.find((c) => c.code === tr?.recipient.countryCode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		title: t("trackTitle"),
		back: "/track",
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("loading") }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: error instanceof ApiError && error.status === 404 ? t("errNotFound") : t("errApi") }),
			tr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-3xl",
							"aria-hidden": true,
							children: dest?.flag
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-bold",
								children: tr.recipient.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									tr.recipient.city,
									", ",
									dest?.name
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-3 border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-muted-foreground",
							children: t("amount")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular font-bold",
							children: [
								fmt(tr.quote.receiveAmount),
								" ",
								tr.quote.receiveCurrency
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-muted-foreground",
							children: t("transferId")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono font-bold",
							children: tr.id
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusTracker, { status: tr.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipientMessages, { transfer: tr }),
				next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 rounded-2xl border-2 border-dashed border-input p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("demoOnly")
						}),
						advance.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: t("errApi") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							disabled: advance.isPending,
							onClick: () => advance.mutate(),
							children: [t("advance"), " →"]
						})
					]
				})
			] })
		]
	});
}
//#endregion
export { TrackPage as component };
