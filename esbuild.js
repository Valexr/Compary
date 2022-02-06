import { build } from "esbuild";
import { derver } from "derver";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

const DEV = process.argv.includes('--dev');

// Development server configuration. To configure production server
// see `start` script in `package.json` file.

const HOST = 'localhost';
const PORT = 5050;

async function build_client() {
    return await build({
        entryPoints: ['src/main.js'],
        bundle: true,
        outfile: 'public/build/bundle.js',
        mainFields: ['svelte', 'module', 'main'],
        minify: !DEV,
        incremental: DEV,
        sourcemap: DEV && 'inline',
        external: ['../img/*'],
        loader: {
            '.jpg': 'file'
        },
        plugins: [
            sveltePlugin({

                compilerOptions: {
                    // Svelte compile options
                    dev: DEV,
                    css: false  //use `css:true` to inline CSS in `bundle.js`
                },

                preprocess: [
                    sveltePreprocess()
                ]

            })
        ]
    });
}

build_client().then(bundle => {
    DEV && derver({
        dir: 'public',
        host: HOST,
        port: PORT,
        watch: ['public', 'src'],
        onwatch: async (l, i, file) => {
            console.log(file)
            if (i == 'src') {
                l.prevent();
                bundle.rebuild().catch(err => l.error(err.message, 'Svelte compile error'));
            }
        }
    })
});

!DEV && (async () => {

    await build({
        entryPoints: ['src/compary/index.js'],
        outfile: 'dist/compary.cjs',
        format: 'cjs',
        bundle: true,
        minify: true,
        sourcemap: false,
        external: ['svelte', 'svelte/*'],
        plugins: [sveltePlugin({ compilerOptions: { css: true } })]
    });

    await build({
        entryPoints: ['src/compary/index.js'],
        outfile: 'dist/compary.mjs',
        format: "esm",
        bundle: true,
        minify: true,
        sourcemap: false,
        external: ['svelte', 'svelte/*'],
        plugins: [sveltePlugin({ compilerOptions: { css: true, accessors: true } })],
    });

    await build({
        entryPoints: ['src/compary/index.js'],
        outfile: 'dist/compary.js',
        platform: 'browser',
        format: "iife",
        bundle: true,
        minify: true,
        sourcemap: false,
        globalName: "Compary",
        plugins: [sveltePlugin({ compilerOptions: { css: true } })],
    });

})()