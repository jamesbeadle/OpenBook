<script lang="ts">
  interface Props { 
   className: string,
   fill: string
  }
  let { className, fill }: Props = $props();
</script>

<svg class={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="4" width="24" height="2" fill={fill}/>
    <rect y="11" width="24" height="2" fill={fill}/>
    <rect y="18" width="24" height="2" fill={fill}/>
  </svg>
  