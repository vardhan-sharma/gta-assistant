import VapiModule from "@vapi-ai/web";

const Vapi = VapiModule.default;

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

export default vapi;