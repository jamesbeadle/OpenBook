<script>
  export let backgroundColor = '' ;
</script>

<header class="bg-shadow" style="background-color: {backgroundColor || "transparent"};">
  <slot />
</header>
