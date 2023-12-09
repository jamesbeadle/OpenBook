<script>
  import "./layout.css";
  import Sidebar from "../../lib/components/Sidebar.svelte";
  import Container from "../../lib/components/Container.svelte";
  import LineLayout from "../../lib/components/LineLayout.svelte";
  import menu from "../../lib/config/menu.js";

  import store from "../../lib/config/store";
  import { onMount, afterUpdate } from "svelte";

  import UserAvatar from "../../assets/useravatar.svg";

  let navIndex = 0;
  let unsubscribe;
  let isHovered = -1;

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

<main class="dashboard">
  <div class="flex h-auto bg-neutral-950 md:h-screen">
    <Sidebar />
    <Container>
      <LineLayout backgroundColor="#1A1A1D">
        <div
          class="dashboard-header flex items-center justify-between py-6 pl-8 md:pl-14 pr-8 border-b-2"
        >
          <span class="text-white">{menu[navIndex].name}</span>
          <div
            class="h-7 w-7 p-0.5 rounded-full border-solid border-2"
            style="border-color: {isHovered === -2 ? '#4ade80' : '#1A1A1D'};"
            on:mouseenter={() => {
              isHovered = -2;
              console.log("ok")
            }}
            on:mouseleave={() => {
              isHovered = -1;
            }}
          >
            <img class="h-6 w-6" src={UserAvatar} alt="Logo" />
          </div>
        </div>
      </LineLayout>
      <slot />
    </Container>
  </div>
</main>
