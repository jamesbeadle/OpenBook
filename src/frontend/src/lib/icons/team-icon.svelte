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
  <g clip-path="url(#clip0_15_112)">
    <path
      d="M10.644 17.08C13.51 16.418 15.183 15.839 13.89 13.398C9.958 5.971 12.848 2 17.001 2C21.236 2 24.055 6.124 20.111 13.398C18.779 15.853 20.548 16.432 23.353 17.08C25.836 17.654 26 18.867 26 20.969V22H8C8 19.255 7.78 17.742 10.644 17.08ZM-2 22H5.809C5.774 13.823 9.245 16.687 9.245 10.873C9.245 8.362 7.606 7 5.497 7C2.382 7 0.215 9.979 3.164 15.549C4.133 17.379 2.133 17.814 -0.017 18.31C-1.879 18.74 -2 19.65 -2 21.227V22Z"
      {fill}
    />
  </g>
  <defs>
    <clipPath id="clip0_15_112">
      <rect width="24" height="24" {fill} />
    </clipPath>
  </defs>
</svg>
