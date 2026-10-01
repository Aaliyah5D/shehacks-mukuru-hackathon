import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track._id-BT7F3Q58.js
var $$splitComponentImporter = () => import("./track._id-6tAWnRVh.mjs");
var Route = createFileRoute("/track/$id")({
	head: ({ params }) => ({ meta: [
		{ title: `Transfer ${params.id} — Senda` },
		{
			name: "description",
			content: "Live status of your Senda transfer."
		},
		{
			property: "og:title",
			content: `Transfer ${params.id} — Senda`
		},
		{
			property: "og:description",
			content: "Sent → In Transit → Ready to Collect → Collected."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
