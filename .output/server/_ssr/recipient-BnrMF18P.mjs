import { n as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Screen, d as useI18n, i as Field, r as ErrorMessage, t as Button } from "./ui-DCNPigep.mjs";
import { n as useFlow } from "./flow-CPEaVGgt.mjs";
import { r as countriesQuery } from "./api-_cZDKRL1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recipient-BnrMF18P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecipientPage() {
	const { t } = useI18n();
	const { draft, update } = useFlow();
	const nav = useNavigate();
	const { data } = useQuery(countriesQuery);
	const dest = data?.find((c) => c.code === draft.toCode);
	const [tried, setTried] = (0, import_react.useState)(false);
	const r = draft.recipient;
	const s = draft.sender;
	const phoneOk = r.phone.replace(/\D/g, "").length >= 7;
	const complete = r.name.trim() && r.city.trim() && phoneOk && s.name.trim() && s.city.trim();
	const err = (v) => tried && !v.trim() ? t("errRecipient") : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, {
		title: t("whoTitle"),
		step: 3,
		back: "/amount",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			noValidate: true,
			onSubmit: (e) => {
				e.preventDefault();
				setTried(true);
				if (complete) nav({ to: "/review" });
			},
			children: [
				tried && !complete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { children: t("errRecipient") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rname",
					label: `${t("recipientName")} — ${t("fullName")}`,
					autoComplete: "off",
					value: r.name,
					error: err(r.name),
					onChange: (e) => update({ recipient: {
						...r,
						name: e.target.value
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rphone",
					label: t("phone"),
					type: "tel",
					inputMode: "tel",
					value: r.phone,
					error: tried && !phoneOk ? t("errPhone") : void 0,
					onChange: (e) => update({ recipient: {
						...r,
						phone: e.target.value
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-base font-semibold",
						children: t("country")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-14 items-center gap-3 rounded-xl border-2 border-border bg-muted px-4 text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: dest?.flag
							}),
							" ",
							dest?.name
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rcity",
					label: t("city"),
					value: r.city,
					error: err(r.city),
					onChange: (e) => update({ recipient: {
						...r,
						city: e.target.value
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pt-4 text-xl font-bold",
					children: t("yourDetails")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "sname",
					label: t("yourName"),
					autoComplete: "name",
					value: s.name,
					error: err(s.name),
					onChange: (e) => update({ sender: {
						...s,
						name: e.target.value
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "scity",
					label: t("yourCity"),
					value: s.city,
					error: err(s.city),
					onChange: (e) => update({ sender: {
						...s,
						city: e.target.value
					} })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					children: [t("reviewTransfer"), " →"]
				})
			]
		})
	});
}
//#endregion
export { RecipientPage as component };
