export default {
    plugins: [],
    server: {
        open: './index.html',
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                fourOhFour: '404.html',
                about: 'about.html',
                api: 'api.html',
                credits: 'credits.html',
                dmv1: 'dmv1.html',
            },
            output: {
                dir: './docs',
            },
        }
    }
}