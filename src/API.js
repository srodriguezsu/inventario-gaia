import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const gaiaPublicKey = process.env.REACT_APP_WOOCOMMERCE_PUBLIC_KEY;
const gaiaSecretKey =process.env.REACT_APP_WOOCOMMERCE_SECRET_KEY;
export const WooCommerce = new WooCommerceRestApi({
    consumerKey: gaiaPublicKey,
    consumerSecret: gaiaSecretKey,
    url: 'https://gaia.intfinity.co',
    version: 'wc/v3',
    // axiosConfig: {
    //     headers: {}
    // }
});