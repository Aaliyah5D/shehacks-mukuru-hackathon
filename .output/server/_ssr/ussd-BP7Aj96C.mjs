import { n as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Screen, d as useI18n, i as Field, u as cn } from "./ui-DCNPigep.mjs";
import { n as api } from "./api-_cZDKRL1.mjs";
import { n as USSD_SERVICE_CODE } from "./types-BFQWD2zc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ussd-BP7Aj96C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"*",
	"0",
	"#"
];
function UssdPage() {
	const { t } = useI18n();
	const [phone, setPhone] = (0, import_react.useState)("+27 82 000 0000");
	const [phase, setPhase] = (0, import_react.useState)("dial");
	const [dialed, setDialed] = (0, import_react.useState)(USSD_SERVICE_CODE);
	const [screen, setScreen] = (0, import_react.useState)("");
	const [inputs, setInputs] = (0, import_react.useState)([]);
	const [reply, setReply] = (0, import_react.useState)("");
	const [sessionId, setSessionId] = (0, import_react.useState)("");
	async function request(session, next) {
		setPhase("running");
		try {
			const res = await api.ussd({
				sessionId: session,
				phoneNumber: phone,
				text: next.join("*")
			});
			setScreen(res.slice(4));
			setInputs(next);
			setReply("");
			setPhase(res.startsWith("CON ") ? "session" : "ended");
		} catch {
			setScreen(t("ussdInvalid"));
			setPhase("ended");
		}
	}
	function call() {
		if (dialed.trim() !== "*120*7362#") {
			setScreen(t("ussdInvalid"));
			setPhase("ended");
			return;
		}
		const id = `sim-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
		setSessionId(id);
		request(id, []);
	}
	function hangUp() {
		setPhase("dial");
		setScreen("");
		setInputs([]);
		setReply("");
	}
	function onSubmit(e) {
		e.preventDefault();
		if (phase === "dial") call();
		else if (phase === "session" && reply.trim()) request(sessionId, [...inputs, reply.trim()]);
		else if (phase === "ended") hangUp();
	}
	const press = (k) => phase === "dial" ? setDialed((d) => d + k) : phase === "session" ? setReply((r) => r + k) : void 0;
	const backspace = () => phase === "dial" ? setDialed((d) => d.slice(0, -1)) : setReply((r) => r.slice(0, -1));
	const primaryLabel = phase === "dial" ? t("ussdCall") : phase === "ended" ? t("ussdClose") : t("ussdSend");
	const keyClass = "min-h-12 rounded-xl bg-neutral-800 text-xl font-semibold text-white active:bg-neutral-700 disabled:opacity-40";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		title: t("ussdTitle"),
		back: "/",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: t("ussdLead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "ussd-phone",
				label: t("ussdPhone"),
				type: "tel",
				inputMode: "tel",
				value: phone,
				disabled: phase !== "dial",
				onChange: (e) => setPhone(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mx-auto w-full max-w-xs rounded-[2.5rem] bg-neutral-900 p-4 shadow-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					"aria-live": "polite",
					className: "flex min-h-72 flex-col rounded-2xl bg-[#d9e6c8] p-4 font-mono text-[15px] leading-snug text-neutral-900",
					children: [
						phase === "dial" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: t("ussdHint", { code: "*120*7362#" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ussd-dial",
								className: "sr-only",
								children: t("ussdCall")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ussd-dial",
								value: dialed,
								onChange: (e) => setDialed(e.target.value),
								autoComplete: "off",
								className: "mt-auto w-full bg-transparent text-right text-3xl font-bold outline-none"
							})
						] }),
						phase === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "m-auto text-center",
							children: t("ussdRunning")
						}),
						(phase === "session" || phase === "ended") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-line",
							children: screen
						}),
						phase === "session" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "ussd-reply",
								className: "sr-only",
								children: t("ussdReply")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "ussd-reply",
								autoFocus: true,
								autoComplete: "off",
								placeholder: t("ussdReply"),
								value: reply,
								onChange: (e) => setReply(e.target.value),
								className: "w-full border-b-2 border-neutral-900 bg-transparent py-1 outline-none"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-3 gap-2",
					children: [
						KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: keyClass,
							disabled: phase === "running" || phase === "ended",
							onClick: () => press(k),
							children: k
						}, k)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn(keyClass, "bg-red-700 text-base active:bg-red-600"),
							disabled: phase === "dial" || phase === "running",
							onClick: hangUp,
							children: t("ussdCancel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: cn(keyClass, "bg-green-700 text-base active:bg-green-600"),
							disabled: phase === "running",
							children: primaryLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: keyClass,
							"aria-label": t("ussdDelete"),
							disabled: phase === "running" || phase === "ended",
							onClick: backspace,
							children: "⌫"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: "POST /api/ussd · Africa's Talking USSD format"
			})
		]
	});
}
//#endregion
export { UssdPage as component };
