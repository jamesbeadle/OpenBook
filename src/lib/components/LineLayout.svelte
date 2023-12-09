<script>
  export let backgroundColor = "";
  export let border = false;
</script>

<header
  class="bg-shadow {border?"rounded-xl":"rounded-none"}"
  style="background-color: {backgroundColor || 'transparent'};"
>
  <slot />
</header>
