<script>
  import "../app.css";

  import store from "../lib/config/store";
  import { onMount, afterUpdate } from "svelte";

  let navIndex = 0;
  let isAuthenticated = false;
  let unsubscribe;

  onMount(() => {
    // Subscribe to changes in the Redux store
    unsubscribe = store.store.subscribe(() => {
      navIndex = store.store.getState().navIndex.value;
      isAuthenticated = store.store.getState().navIndex.authenticated;
    });

    return unsubscribe; // Unsubscribe from the store on component cleanup
  });

  afterUpdate(() => {
    navIndex;
  });
</script>

<main style="width: 100%;">
  <slot />
</main>
