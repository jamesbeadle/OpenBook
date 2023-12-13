<script>
  export let activeSection = 0;
</script>

<h1>Owner</h1>

{#if activeSection == 0}
  <p>section 0</p>
{/if}

{#if activeSection == 1}
  <p>section 1</p>
{/if}
