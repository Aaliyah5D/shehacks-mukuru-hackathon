import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useI18n, l as buttonClass, n as Card, r as ErrorMessage } from "./ui-DCNPigep.mjs";
import { n as useFlow } from "./flow-CPEaVGgt.mjs";
import { i as fmt, n as api } from "./api-_cZDKRL1.mjs";
import { t as Route } from "./success._id-D5M3pkUa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/success._id-ClpuJSP9.js
var import_jsx_runtime = require_jsx_runtime();
function SuccessPage() {
	const { id } = Route.useParams();
	const { t } = useI18n();
	const { reset } = useFlow();
	const { data: tr, isError } = useQuery({
		queryKey: ["transfer", id],
		queryFn: () => api.getTransfer(id)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pt-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-success text-4xl text-success-foreground",
				"aria-hidden": true,
				children: "✓"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-extrabold tracking-tight",
				children: t("sentTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg text-muted-foreground",
				children: t("sentLead")
			})] }),
			isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: t("errApi") }),
			tr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-4 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: t("amountSent")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-lg font-bold",
							children: ["R ", fmt(tr.quote.amount)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: t("recipientReceives")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular text-lg font-bold text-success",
							children: [
								fmt(tr.quote.receiveAmount),
								" ",
								tr.quote.receiveCurrency
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border-2 border-dashed border-input p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-muted-foreground",
							children: t("transferId")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-3xl font-extrabold tracking-wider",
							children: tr.id
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/track/$id",
					params: { id },
					className: buttonClass("primary"),
					children: [t("trackMyMoney"), " →"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: reset,
					className: buttonClass("secondary"),
					children: t("backHome")
				})]
			})
		]
	});
}
//#endregion
export { SuccessPage as component };
