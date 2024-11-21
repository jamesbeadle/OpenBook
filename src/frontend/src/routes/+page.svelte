<script lang="ts">
  import { onMount } from "svelte";
  import { authStore } from "$lib/stores/auth-store";
  import { authSignedInStore } from "$lib/derived/auth.derived";
  import Layout from "./Layout.svelte";
  import Welcome from "$lib/components/home/welcome.svelte";
  import Dashboard from "$lib/components/dashboard/dashboard.svelte";
  
  onMount(async () => {
    await authStore.sync();
  });

</script>
<Layout>  
  {#if !$authSignedInStore}
    <Welcome />
  {:else}
    <Dashboard>
      <slot></slot>
    </Dashboard>
  {/if}
</Layout>
