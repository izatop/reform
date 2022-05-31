// eslint-disable-next-line
declare interface Window {
    dataLayer: any[];
}

window.dataLayer = window.dataLayer || [];

function gtag(...args: unknown[]): void;
function gtag() {
    window.dataLayer.push(/* eslint-disable-line */ arguments);
}

gtag("js", new Date());
gtag("config", "GA_MEASUREMENT_ID");
