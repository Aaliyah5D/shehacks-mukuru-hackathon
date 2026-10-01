import { n as __toESM } from "../_runtime.mjs";
import { n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useFlow } from "./flow-CPEaVGgt.mjs";
import { n as api, r as countriesQuery } from "./api-_cZDKRL1.mjs";
import { a as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-quote-DosNF6Uj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Live quote for the current draft, computed by the backend. */
function useQuote() {
	const { draft } = useFlow();
	const countries = useQuery(countriesQuery);
	const dest = countries.data?.find((c) => c.code === draft.toCode);
	const [debounced, setDebounced] = (0, import_react.useState)(draft.amount);
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => setDebounced(draft.amount), 250);
		return () => clearTimeout(id);
	}, [draft.amount]);
	const amount = Number(debounced);
	const q = useQuery({
		queryKey: [
			"rate",
			dest?.currencyCode,
			amount
		],
		queryFn: () => api.rate(dest.currencyCode, amount || void 0),
		enabled: !!dest,
		placeholderData: keepPreviousData,
		refetchInterval: 6e4
	});
	return {
		dest,
		countries: countries.data,
		...q,
		amount
	};
}
//#endregion
export { useQuote as t };
