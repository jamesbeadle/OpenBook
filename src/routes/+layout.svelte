<script>
    import { onMount } from "svelte";
    import { initJuno } from "@junobuild/core";
  
    // TODO: Replace 'satelliteId' with your actual satellite ID
    onMount(
      async () =>
        await initJuno({
            satelliteId: "aedk2-5yaaa-aaaal-adbra-cai",
        })
    );
  </script>
  
  <slot />
