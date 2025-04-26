<script lang="ts">

   interface Props { 
    title: string,
    links: string[],
   }
   let { title, links }: Props = $props();
  </script>
  
  <div class="p-4 hover:bg-BrandAltGray">
    <div class="flex items-center space-x-4">
      <h3 class="text-lg font-bold">{title}</h3>
    </div>
    {#if links.length > 0}
      <ul class="mt-2 space-y-2 pl-10 text-sm">
        {#each links as link}
          <li class="cursor-pointer hover:underline">{link}</li>
        {/each}
      </ul>
    {/if}
  </div>
  