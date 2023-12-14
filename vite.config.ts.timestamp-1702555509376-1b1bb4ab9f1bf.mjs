// vite.config.ts
import { NodeModulesPolyfillPlugin } from 'file:///home/james/OpenBook/node_modules/@esbuild-plugins/node-modules-polyfill/dist/index.js';
import inject from 'file:///home/james/OpenBook/node_modules/@rollup/plugin-inject/dist/es/index.js';
import { sveltekit } from 'file:///home/james/OpenBook/node_modules/@sveltejs/kit/src/exports/vite/index.js';
import {
  defineConfig,
  loadEnv,
} from 'file:///home/james/OpenBook/node_modules/vite/dist/node/index.js';
import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
var __vite_injected_original_import_meta_url =
  'file:///home/james/OpenBook/vite.config.ts';
var file = fileURLToPath(
  new URL('package.json', __vite_injected_original_import_meta_url),
);
var json = readFileSync(file, 'utf8');
var { version } = JSON.parse(json);
var network = process.env.DFX_NETWORK ?? 'local';
var readCanisterIds = ({ prefix }) => {
  const canisterIdsJsonFile = ['ic', 'staging'].includes(network)
    ? join(process.cwd(), 'canister_ids.json')
    : join(process.cwd(), '.dfx', 'local', 'canister_ids.json');
  try {
    const config2 = JSON.parse(readFileSync(canisterIdsJsonFile, 'utf-8'));
    return Object.entries(config2).reduce((acc, current) => {
      const [canisterName, canisterDetails] = current;
      return {
        ...acc,
        [`${prefix ?? ''}${canisterName.toUpperCase()}_CANISTER_ID`]:
          canisterDetails[network],
      };
    }, {});
  } catch (e) {
    console.warn(`Could not get canister ID from ${canisterIdsJsonFile}: ${e}`);
    return {};
  }
};
var config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $declarations: resolve('./src/declarations'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./node_modules/@dfinity/gix-components/dist/styles/mixins/media";
          @use "./node_modules/@dfinity/gix-components/dist/styles/mixins/text";
        `,
      },
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const folder = dirname(id);
          const lazy = ['@dfinity/nns', '@dfinity/nns-proto'];
          if (
            ['@sveltejs', 'svelte', '@dfinity/gix-components', ...lazy].find(
              (lib) => folder.includes(lib),
            ) === void 0 &&
            folder.includes('node_modules')
          ) {
            return 'vendor';
          }
          if (
            lazy.find((lib) => folder.includes(lib)) !== void 0 &&
            folder.includes('node_modules')
          ) {
            return 'lazy';
          }
          return 'index';
        },
      },
      // Polyfill Buffer for production build
      plugins: [
        inject({
          modules: { Buffer: ['buffer', 'Buffer'] },
        }),
      ],
    },
  },
  // proxy /api to port 4943 during development
  server: {
    proxy: {
      '/api': 'http://localhost:4943',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeModulesPolyfillPlugin(),
        {
          name: 'fix-node-globals-polyfill',
          setup(build) {
            build.onResolve(
              { filter: /_virtual-process-polyfill_\.js/ },
              ({ path }) => ({ path }),
            );
          },
        },
      ],
    },
  },
  worker: {
    format: 'es',
  },
};
var vite_config_default = defineConfig(() => {
  process.env = {
    ...process.env,
    ...loadEnv(
      network === 'ic'
        ? 'production'
        : network === 'staging'
        ? 'staging'
        : 'development',
      process.cwd(),
    ),
    ...readCanisterIds({ prefix: 'VITE_' }),
  };
  return {
    ...config,
    // Backwards compatibility for auto generated types of dfx that are meant for webpack and process.env
    define: {
      'process.env': {
        ...readCanisterIds({}),
        DFX_NETWORK: network,
      },
      VITE_APP_VERSION: JSON.stringify(version),
      VITE_DFX_NETWORK: JSON.stringify(network),
    },
  };
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qYW1lcy9PcGVuQm9va1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamFtZXMvT3BlbkJvb2svdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamFtZXMvT3BlbkJvb2svdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBOb2RlTW9kdWxlc1BvbHlmaWxsUGx1Z2luIH0gZnJvbSAnQGVzYnVpbGQtcGx1Z2lucy9ub2RlLW1vZHVsZXMtcG9seWZpbGwnO1xuaW1wb3J0IGluamVjdCBmcm9tICdAcm9sbHVwL3BsdWdpbi1pbmplY3QnO1xuaW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IGRpcm5hbWUsIGpvaW4sIHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcblxuY29uc3QgZmlsZSA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgncGFja2FnZS5qc29uJywgaW1wb3J0Lm1ldGEudXJsKSk7XG5jb25zdCBqc29uID0gcmVhZEZpbGVTeW5jKGZpbGUsICd1dGY4Jyk7XG5jb25zdCB7IHZlcnNpb24gfSA9IEpTT04ucGFyc2UoanNvbik7XG5cbi8vIG5wbSBydW4gZGV2ID0gbG9jYWxcbi8vIG5wbSBydW4gYnVpbGQgPSBsb2NhbFxuLy8gZGZ4IGRlcGxveSA9IGxvY2FsXG4vLyBkZnggZGVwbG95IC0tbmV0d29yayBpYyA9IGljXG4vLyBkZnggZGVwbG95IC0tbmV0d29yayBzdGFnaW5nID0gc3RhZ2luZ1xuY29uc3QgbmV0d29yayA9IHByb2Nlc3MuZW52LkRGWF9ORVRXT1JLID8/ICdsb2NhbCc7XG5cbmNvbnN0IHJlYWRDYW5pc3RlcklkcyA9ICh7XG4gIHByZWZpeCxcbn06IHtcbiAgcHJlZml4Pzogc3RyaW5nO1xufSk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICBjb25zdCBjYW5pc3Rlcklkc0pzb25GaWxlID0gWydpYycsICdzdGFnaW5nJ10uaW5jbHVkZXMobmV0d29yaylcbiAgICA/IGpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2NhbmlzdGVyX2lkcy5qc29uJylcbiAgICA6IGpvaW4ocHJvY2Vzcy5jd2QoKSwgJy5kZngnLCAnbG9jYWwnLCAnY2FuaXN0ZXJfaWRzLmpzb24nKTtcblxuICB0cnkge1xuICAgIHR5cGUgRGV0YWlscyA9IHtcbiAgICAgIGljPzogc3RyaW5nO1xuICAgICAgc3RhZ2luZz86IHN0cmluZztcbiAgICAgIGxvY2FsPzogc3RyaW5nO1xuICAgIH07XG5cbiAgICBjb25zdCBjb25maWc6IFJlY29yZDxzdHJpbmcsIERldGFpbHM+ID0gSlNPTi5wYXJzZShcbiAgICAgIHJlYWRGaWxlU3luYyhjYW5pc3Rlcklkc0pzb25GaWxlLCAndXRmLTgnKSxcbiAgICApO1xuXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGNvbmZpZykucmVkdWNlKChhY2MsIGN1cnJlbnQ6IFtzdHJpbmcsIERldGFpbHNdKSA9PiB7XG4gICAgICBjb25zdCBbY2FuaXN0ZXJOYW1lLCBjYW5pc3RlckRldGFpbHNdID0gY3VycmVudDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbYCR7cHJlZml4ID8/ICcnfSR7Y2FuaXN0ZXJOYW1lLnRvVXBwZXJDYXNlKCl9X0NBTklTVEVSX0lEYF06XG4gICAgICAgICAgY2FuaXN0ZXJEZXRhaWxzW25ldHdvcmsgYXMga2V5b2YgRGV0YWlsc10sXG4gICAgICB9O1xuICAgIH0sIHt9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGdldCBjYW5pc3RlciBJRCBmcm9tICR7Y2FuaXN0ZXJJZHNKc29uRmlsZX06ICR7ZX1gKTtcbiAgICByZXR1cm4ge307XG4gIH1cbn07XG5cbmNvbnN0IGNvbmZpZzogVXNlckNvbmZpZyA9IHtcbiAgcGx1Z2luczogW3N2ZWx0ZWtpdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAkZGVjbGFyYXRpb25zOiByZXNvbHZlKCcuL3NyYy9kZWNsYXJhdGlvbnMnKSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXG4gICAgICAgICAgQHVzZSBcIi4vbm9kZV9tb2R1bGVzL0BkZmluaXR5L2dpeC1jb21wb25lbnRzL2Rpc3Qvc3R5bGVzL21peGlucy9tZWRpYVwiO1xuICAgICAgICAgIEB1c2UgXCIuL25vZGVfbW9kdWxlcy9AZGZpbml0eS9naXgtY29tcG9uZW50cy9kaXN0L3N0eWxlcy9taXhpbnMvdGV4dFwiO1xuICAgICAgICBgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9sZGVyID0gZGlybmFtZShpZCk7XG5cbiAgICAgICAgICBjb25zdCBsYXp5ID0gWydAZGZpbml0eS9ubnMnLCAnQGRmaW5pdHkvbm5zLXByb3RvJ107XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBbJ0BzdmVsdGVqcycsICdzdmVsdGUnLCAnQGRmaW5pdHkvZ2l4LWNvbXBvbmVudHMnLCAuLi5sYXp5XS5maW5kKFxuICAgICAgICAgICAgICAobGliKSA9PiBmb2xkZXIuaW5jbHVkZXMobGliKSxcbiAgICAgICAgICAgICkgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgZm9sZGVyLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGxhenkuZmluZCgobGliKSA9PiBmb2xkZXIuaW5jbHVkZXMobGliKSkgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgZm9sZGVyLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuICdsYXp5JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gJ2luZGV4JztcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBQb2x5ZmlsbCBCdWZmZXIgZm9yIHByb2R1Y3Rpb24gYnVpbGRcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgaW5qZWN0KHtcbiAgICAgICAgICBtb2R1bGVzOiB7IEJ1ZmZlcjogWydidWZmZXInLCAnQnVmZmVyJ10gfSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIC8vIHByb3h5IC9hcGkgdG8gcG9ydCA0OTQzIGR1cmluZyBkZXZlbG9wbWVudFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiAnaHR0cDovL2xvY2FsaG9zdDo0OTQzJyxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgZGVmaW5lOiB7XG4gICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICAgICAgfSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgTm9kZU1vZHVsZXNQb2x5ZmlsbFBsdWdpbigpLFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2ZpeC1ub2RlLWdsb2JhbHMtcG9seWZpbGwnLFxuICAgICAgICAgIHNldHVwKGJ1aWxkKSB7XG4gICAgICAgICAgICBidWlsZC5vblJlc29sdmUoXG4gICAgICAgICAgICAgIHsgZmlsdGVyOiAvX3ZpcnR1YWwtcHJvY2Vzcy1wb2x5ZmlsbF9cXC5qcy8gfSxcbiAgICAgICAgICAgICAgKHsgcGF0aCB9KSA9PiAoeyBwYXRoIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICB3b3JrZXI6IHtcbiAgICBmb3JtYXQ6ICdlcycsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCk6IFVzZXJDb25maWcgPT4ge1xuICAvLyBFeHBhbmQgZW52aXJvbm1lbnQgLSAuZW52IGZpbGVzIC0gd2l0aCBjYW5pc3RlciBJRHNcbiAgcHJvY2Vzcy5lbnYgPSB7XG4gICAgLi4ucHJvY2Vzcy5lbnYsXG4gICAgLi4ubG9hZEVudihcbiAgICAgIG5ldHdvcmsgPT09ICdpYydcbiAgICAgICAgPyAncHJvZHVjdGlvbidcbiAgICAgICAgOiBuZXR3b3JrID09PSAnc3RhZ2luZydcbiAgICAgICAgPyAnc3RhZ2luZydcbiAgICAgICAgOiAnZGV2ZWxvcG1lbnQnLFxuICAgICAgcHJvY2Vzcy5jd2QoKSxcbiAgICApLFxuICAgIC4uLnJlYWRDYW5pc3Rlcklkcyh7IHByZWZpeDogJ1ZJVEVfJyB9KSxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC4uLmNvbmZpZyxcbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBmb3IgYXV0byBnZW5lcmF0ZWQgdHlwZXMgb2YgZGZ4IHRoYXQgYXJlIG1lYW50IGZvciB3ZWJwYWNrIGFuZCBwcm9jZXNzLmVudlxuICAgIGRlZmluZToge1xuICAgICAgJ3Byb2Nlc3MuZW52Jzoge1xuICAgICAgICAuLi5yZWFkQ2FuaXN0ZXJJZHMoe30pLFxuICAgICAgICBERlhfTkVUV09SSzogbmV0d29yayxcbiAgICAgIH0sXG4gICAgICBWSVRFX0FQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeSh2ZXJzaW9uKSxcbiAgICAgIFZJVEVfREZYX05FVFdPUks6IEpTT04uc3RyaW5naWZ5KG5ldHdvcmspLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOE8sU0FBUyxpQ0FBaUM7QUFDeFIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsU0FBUyxNQUFNLGVBQWU7QUFDdkMsU0FBUyxxQkFBcUI7QUFFOUIsU0FBUyxjQUFjLGVBQWU7QUFQMEcsSUFBTSwyQ0FBMkM7QUFTak0sSUFBTSxPQUFPLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQ25FLElBQU0sT0FBTyxhQUFhLE1BQU0sTUFBTTtBQUN0QyxJQUFNLEVBQUUsUUFBUSxJQUFJLEtBQUssTUFBTSxJQUFJO0FBT25DLElBQU0sVUFBVSxRQUFRLElBQUksZUFBZTtBQUUzQyxJQUFNLGtCQUFrQixDQUFDO0FBQUEsRUFDdkI7QUFDRixNQUU4QjtBQUM1QixRQUFNLHNCQUFzQixDQUFDLE1BQU0sU0FBUyxFQUFFLFNBQVMsT0FBTyxJQUMxRCxLQUFLLFFBQVEsSUFBSSxHQUFHLG1CQUFtQixJQUN2QyxLQUFLLFFBQVEsSUFBSSxHQUFHLFFBQVEsU0FBUyxtQkFBbUI7QUFFNUQsTUFBSTtBQU9GLFVBQU1BLFVBQWtDLEtBQUs7QUFBQSxNQUMzQyxhQUFhLHFCQUFxQixPQUFPO0FBQUEsSUFDM0M7QUFFQSxXQUFPLE9BQU8sUUFBUUEsT0FBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLFlBQStCO0FBQ3hFLFlBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSTtBQUV4QyxhQUFPO0FBQUEsUUFDTCxHQUFHO0FBQUEsUUFD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
