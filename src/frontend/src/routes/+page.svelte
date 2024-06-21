<script lang="ts">
import LogoIcon from "$lib/icons/logo-icon.svelte";
  import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
import Layout from "./Layout.svelte";


</script>
<Layout>    
  <div class="p-4">
      <div class="flex flex-row items-center">
          <p class="text-2xl">Welcome to OpenBook</p>
          <LogoIcon className="w-10 ml-4" />
      </div>
      <p class="my-2">Decentralised Business Management.</p>
      <a href="/whitepaper">
          <button class="bg-OpenBookGray text-white my-2 px-4 py-2 rounded-sm">Whitepaper</button>
      </a>
  </div>
</Layout>
