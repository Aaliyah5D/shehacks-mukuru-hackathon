import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useI18n, l as buttonClass, n as Card } from "./ui-DCNPigep.mjs";
import { n as USSD_SERVICE_CODE } from "./types-BFQWD2zc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ltwy9ELV.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold",
						children: "🇿🇦 → 🇿🇼 🇲🇿 🇱🇸 🇸🇿 🇧🇼 🇿🇲 🇲🇼 🇬🇭 🇳🇬"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-5xl font-extrabold leading-[1.02] tracking-tight",
						children: t("tagline")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted-foreground",
						children: t("homeLead")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/send",
						className: buttonClass("primary"),
						children: [t("sendMoney"), " →"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/track",
						className: buttonClass("secondary"),
						children: t("trackTransfer")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ussd",
						className: buttonClass("ghost"),
						children: ["📱 ", t("tryUssd", { code: USSD_SERVICE_CODE })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "recent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "recent",
					className: "mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
					children: t("recent")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 place-items-center rounded-full bg-secondary text-2xl",
							"aria-hidden": true,
							children: "🇿🇼"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: t("recentName")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: t("recentAmount")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-success-soft px-3 py-1 text-sm font-semibold text-success",
							children: ["✓ ", t("status_READY_TO_COLLECT")]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm font-medium text-muted-foreground",
				children: t("support")
			})
		]
	});
}
//#endregion
export { Home as component };
