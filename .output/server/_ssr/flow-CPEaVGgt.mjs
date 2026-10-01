import { n as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flow-CPEaVGgt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = {
	fromCode: "ZA",
	toCode: "ZW",
	amount: "1000",
	sender: {
		name: "Thandi",
		city: "Johannesburg"
	},
	recipient: {
		name: "Mai Chipo",
		phone: "+263 77 123 4567",
		city: "Harare"
	}
};
var STORAGE_KEY = "senda-draft";
var Ctx = (0, import_react.createContext)(null);
function FlowProvider({ children }) {
	const [draft, setDraft] = (0, import_react.useState)(initial);
	const [restored, setRestored] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const saved = sessionStorage.getItem(STORAGE_KEY);
			if (saved) setDraft({
				...initial,
				...JSON.parse(saved)
			});
		} catch {}
		setRestored(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!restored) return;
		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
		} catch {}
	}, [draft, restored]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			draft,
			update: (p) => setDraft((d) => ({
				...d,
				...p
			})),
			reset: () => setDraft(initial)
		},
		children
	});
}
var useFlow = () => (0, import_react.useContext)(Ctx);
//#endregion
export { useFlow as n, FlowProvider as t };
