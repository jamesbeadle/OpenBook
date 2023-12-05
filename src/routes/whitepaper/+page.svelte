<script>
  import Tab1 from './Tab1.svelte';
  import Tab2 from './Tab2.svelte';
  import Tab3 from './Tab3.svelte';
  import Tabs from './Tabs.svelte';

  // List of tab items with labels, values and assigned components
  let items = [
    { label: 'Whitepaper', value: 1, component: Tab1 },
    // { label: "Interactions", value: 2, component: Tab2 },
    // { label: "Tab 3", value: 3, component: Tab3 },
  ];
</script>

<main>
  <div
    class="w-full h-screen p-6"
    style="background-color: #101111; color: white;"
  >
    <!-- <input
      class="shadow appearance-none border rounded py-2 px-3 mb-6 text-white leading-tight focus:outline-none focus:shadow-outline"
      style="background-color: #232428; border-color: #292c33"
      id="username"
      type="text"
      placeholder="Input ..."
    /> -->
    <p
      class="shadow appearance-none py-2 px-3 mb-6 text-xl"
      style="border-color: #292c33"
    >
      OpenBook White Paper
    </p>
    <Tabs {items} />
  </div>
</main>
