<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul
  style="color: #a0a4af; background-color: #292c33; border-bottom-color: #292c33; border-top-right-radius: 10px; border-top-left-radius: 10px;"
>
  {#each items as item}
    <li
      class="hover:text-gray-300; hover:border-0;"
      style="background-color: #292c33;  border-top-left-radius: 10px; border-bottom-color: {activeTabValue ===
      item.value
        ? '#39dca5'
        : '#292c33'}; border-bottom-width: 4px;"
    >
      <button on:click={handleClick(item.value)}>{item.label}</button>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div
      class="box border-0"
      style="background-color: #232428; border-width: 1px; border-color: #232428"
    >
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}

<style>
  .box {
    margin-bottom: 10px;
    padding: 40px;
    border: 1px solid #dee2e6;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
  }
  li {
    margin-bottom: -1px;
  }

  /* span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  } */

  /* span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  } */

  /* li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  } */
</style>
