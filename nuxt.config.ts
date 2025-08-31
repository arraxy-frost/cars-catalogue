// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    ssr: true,                          // Enable Server Side Rendering
    devtools: { enabled: true },
    css: [
        '@/assets/global.css'
    ],
    app: {
        head: {
            title: "Cars Catalogue",
            link: [
                { rel: 'icon', type: 'image/png', href: '/icon-car.png' },
            ]
        }
    }
});
