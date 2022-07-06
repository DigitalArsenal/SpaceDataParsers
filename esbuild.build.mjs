import esbuild from "esbuild";
import globalsPlugin from "@esbuild-plugins/node-globals-polyfill";
import modulesPlugin from "@esbuild-plugins/node-modules-polyfill";

const args = process.argv.slice(2)
const deploy = args.includes('--deploy')

const loader = {
    // Add loaders for images/fonts/etc, e.g. { '.svg': 'file' }
}

const plugins = [
    globalsPlugin.NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
        define: { 'process.env.NODE_ENV': deploy ? '"production"' : '"development"' },
    }),
    modulesPlugin.NodeModulesPolyfillPlugin(),
]

let opts = {
    entryPoints: ['js/app.js'],
    bundle: true,
    target: 'esnext',
    outdir: './dist/esbuild/',
    logLevel: 'info',
    inject: [],
    loader,
    plugins
}

if (deploy) {
    opts = {
        ...opts,
        minify: true
    }
}

const promise = esbuild.build(opts)