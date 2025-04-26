<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "./+layout.svelte";
    import OrganisationList from "$lib/components/organisation/OrganisationList.svelte";
  
  onMount(async () => {
  });

</script>

<Layout>
    <OrganisationList />
</Layout>