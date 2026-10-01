import { n as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Screen, d as useI18n, i as Field, t as Button } from "./ui-DCNPigep.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track.index-C49vHM19.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrackSearch() {
	const { t } = useI18n();
	const nav = useNavigate();
	const [id, setId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, {
		title: t("trackTitle"),
		back: "/",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (id.trim()) nav({
					to: "/track/$id",
					params: { id: id.trim().toUpperCase() }
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "tid",
				label: t("enterId"),
				placeholder: "SND-XXXXXX",
				value: id,
				onChange: (e) => setId(e.target.value),
				className: "h-14 w-full rounded-xl border-2 border-input bg-card px-4 font-mono text-xl uppercase outline-none focus:border-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: !id.trim(),
				children: t("find")
			})]
		})
	});
}
//#endregion
export { TrackSearch as component };
