<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "./Layout.svelte";
    import OrganisationList from "$lib/components/organisation/OrganisationList.svelte";
  
  onMount(async () => {
  });

</script>

<Layout>
    <OrganisationList />
</Layout>