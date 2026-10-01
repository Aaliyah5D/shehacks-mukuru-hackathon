import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Screen, d as useI18n, r as ErrorMessage, t as Button } from "./ui-DCNPigep.mjs";
import { n as useFlow } from "./flow-CPEaVGgt.mjs";
import { r as countriesQuery } from "./api-_cZDKRL1.mjs";
import { n as CountrySelector } from "./money-cyG8XDeY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-DcgoOX0y.js
var import_jsx_runtime = require_jsx_runtime();
function SendPage() {
	const { t } = useI18n();
	const { draft, update } = useFlow();
	const nav = useNavigate();
	const { data, isError, isLoading, refetch } = useQuery(countriesQuery);
	const origins = data?.filter((c) => c.role === "origin") ?? [];
	const dests = data?.filter((c) => c.role === "destination") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		title: t("whereTitle"),
		step: 1,
		back: "/",
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("loading") }),
			isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: t("errApi") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => refetch(),
					children: "↻"
				})]
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountrySelector, {
					label: t("sendingFrom"),
					countries: origins,
					value: draft.fromCode,
					onChange: (c) => update({ fromCode: c })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountrySelector, {
					label: t("sendingTo"),
					countries: dests,
					value: draft.toCode,
					onChange: (c) => update({ toCode: c })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky bottom-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => nav({ to: "/amount" }),
						disabled: !draft.toCode,
						children: [t("continue"), " →"]
					})
				})
			] })
		]
	});
}
//#endregion
export { SendPage as component };
