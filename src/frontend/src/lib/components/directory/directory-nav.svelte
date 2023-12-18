<script lang="ts">
  import { onMount } from 'svelte';
  let activeSelection = 'A';
  import { directoryFilter, professionFilter } from '$lib/stores/filter-store';

  onMount(async () => {
    $directoryFilter = 'A';
  });

  function selectLetter(selection: string) {
    activeSelection = selection;
    $directoryFilter = selection;
    $professionFilter = '';
  }
</script>

<div class="flex flex-col space-y-1 items-center mt-4 text-sm">
  <button
    on:click={() => selectLetter('A')}
    class={` ${
      activeSelection === 'A' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>A</button
  >
  <button
    on:click={() => selectLetter('B')}
    class={` ${
      activeSelection === 'B' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>B</button
  >
  <button
    on:click={() => selectLetter('C')}
    class={` ${
      activeSelection === 'C' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>C</button
  >
  <button
    on:click={() => selectLetter('D')}
    class={` ${
      activeSelection === 'D' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>D</button
  >
  <button
    on:click={() => selectLetter('E')}
    class={` ${
      activeSelection === 'E' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>E</button
  >
  <button
    on:click={() => selectLetter('F')}
    class={` ${
      activeSelection === 'F' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>F</button
  >
  <button
    on:click={() => selectLetter('G')}
    class={` ${
      activeSelection === 'G' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>G</button
  >
  <button
    on:click={() => selectLetter('H')}
    class={` ${
      activeSelection === 'H' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>H</button
  >
  <button
    on:click={() => selectLetter('I')}
    class={` ${
      activeSelection === 'I' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>I</button
  >
  <button
    on:click={() => selectLetter('J')}
    class={` ${
      activeSelection === 'J' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>J</button
  >
  <button
    on:click={() => selectLetter('K')}
    class={` ${
      activeSelection === 'K' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>K</button
  >
  <button
    on:click={() => selectLetter('L')}
    class={` ${
      activeSelection === 'L' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>L</button
  >
  <button
    on:click={() => selectLetter('M')}
    class={` ${
      activeSelection === 'M' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>M</button
  >
  <button
    on:click={() => selectLetter('N')}
    class={` ${
      activeSelection === 'N' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>N</button
  >
  <button
    on:click={() => selectLetter('O')}
    class={` ${
      activeSelection === 'O' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>O</button
  >
  <button
    on:click={() => selectLetter('P')}
    class={` ${
      activeSelection === 'P' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>P</button
  >
  <button
    on:click={() => selectLetter('Q')}
    class={` ${
      activeSelection === 'Q' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>Q</button
  >
  <button
    on:click={() => selectLetter('R')}
    class={` ${
      activeSelection === 'R' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>R</button
  >
  <button
    on:click={() => selectLetter('S')}
    class={` ${
      activeSelection === 'S' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>S</button
  >
  <button
    on:click={() => selectLetter('T')}
    class={` ${
      activeSelection === 'T' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>T</button
  >
  <button
    on:click={() => selectLetter('U')}
    class={` ${
      activeSelection === 'U' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>U</button
  >
  <button
    on:click={() => selectLetter('V')}
    class={` ${
      activeSelection === 'V' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>V</button
  >
  <button
    on:click={() => selectLetter('W')}
    class={` ${
      activeSelection === 'W' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>W</button
  >
  <button
    on:click={() => selectLetter('X')}
    class={` ${
      activeSelection === 'X' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>X</button
  >
  <button
    on:click={() => selectLetter('Y')}
    class={` ${
      activeSelection === 'Y' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>Y</button
  >
  <button
    on:click={() => selectLetter('Z')}
    class={` ${
      activeSelection === 'Z' ? 'directory-nav-btn-active' : 'directory-nav-btn'
    }`}>Z</button
  >
</div>
