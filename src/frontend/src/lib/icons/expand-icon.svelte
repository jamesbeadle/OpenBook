<script lang="ts">
  interface Props { 
   className: string,
   fill: string
  }
  let { className, fill }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  viewBox="0 0 24 24"
  fill="none"
>
  <path
    d="M8.49995 8.3C8.09995 7.9 7.49995 7.9 7.09995 8.3C6.69995 8.7 6.69995 9.3 7.09995 9.7L9.29995 12L6.99995 14.3C6.79995 14.5 6.69995 14.7 6.69995 15C6.69995 15.6 7.09995 16 7.69995 16C7.99995 16 8.19995 15.9 8.39995 15.7L11.4 12.7C11.8 12.3 11.8 11.7 11.4 11.3L8.49995 8.3ZM17 11.3L14 8.3C13.6 7.9 13 7.9 12.6 8.3C12.2 8.7 12.2 9.3 12.6 9.7L14.9 12L12.6 14.3C12.4 14.5 12.3 14.7 12.3 15C12.3 15.6 12.7 16 13.3 16C13.6 16 13.8 15.9 14 15.7L17 12.7C17.3 12.3 17.3 11.7 17 11.3Z"
    {fill}
  />
</svg>
