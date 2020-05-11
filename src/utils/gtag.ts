export const GA_TRACKING_ID = 'UA-166177238-1'

// SEE: https://git.io/JflHQ
export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
