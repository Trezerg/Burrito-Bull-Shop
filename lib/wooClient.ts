import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export type StoreKey = "MAIN" | "A" | "B" | "C";

function getEnv(store: StoreKey) {
  const url = process.env[`WC_${store}_URL`];
  const ck = process.env[`WC_${store}_CK`];
  const cs = process.env[`WC_${store}_CS`];
  if (!url || !ck || !cs) {
    throw new Error(
      `Missing WooCommerce creds for store "${store}". ` +
      `Make sure WC_${store}_URL, WC_${store}_CK & WC_${store}_CS are set in .env.local.`
    );
  }
  return { url, ck, cs };
}

export function getWooClient(store: StoreKey = "MAIN") {
  const { url, ck, cs } = getEnv(store);
  return new WooCommerceRestApi({
    url,
    consumerKey: ck,
    consumerSecret: cs,
    version: "wc/v3",
    queryStringAuth: true,
  });
}