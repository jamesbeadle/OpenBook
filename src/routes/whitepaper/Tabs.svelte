<script>
  import "./tabs.css";
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>



<ul class="tabs_ul rounded-t-lg">
  {#each items as item}
    <li
      class="tabs_li hover:text-white"
      style="border-bottom-color: {activeTabValue === item.value
        ? '#39dca5'
        : '#292c33'};"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span on:click={handleClick(item.value)} class="hover:text-white">{item.label}</span>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div
      class="box border-0"
    >
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}
