<script>
  import LineLayout from '../lib/components/LineLayout.svelte';
  import Carousel from '../lib/components/Carousel.svelte';
  import image1 from '../assets/Slides/1.png';
  import image2 from '../assets/Slides/2.png';
  import image3 from '../assets/Slides/3.png';
  import image4 from '../assets/Slides/4.png';
  import image5 from '../assets/Slides/5.png';
  import image6 from '../assets/Slides/6.png';
  import image7 from '../assets/Slides/7.png';
  import image8 from '../assets/Slides/8.png';
  import image9 from '../assets/Slides/9.png';
  import image10 from '../assets/Slides/10.png';
  import image11 from '../assets/Slides/11.png';
  import image12 from '../assets/Slides/12.png';

  let images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ];
</script>

<main class="md:flex md:flex-row" style="width: 100%;">
  <div
    class="md:w-1/2 sm:basis-1/2 relative flex flex-col justify-center gap-8"
    style="background-color: #101111;"
  >
    <div class="absolute sm:top-8 md:top-10 md:left-10 flex gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="40"
        viewBox="0 0 22 40"
        fill="none"
      >
        <path
          d="M22 25.6327V30.9227C20.6322 30.1004 18.987 29.6243 17.2174 29.6243C15.773 29.6243 14.4148 29.9417 13.2191 30.5044C12.3917 30.8939 11.6409 31.3989 11 32C10.3591 31.3989 9.60826 30.8939 8.78087 30.5044C7.58522 29.9417 6.22696 29.6243 4.78261 29.6243C3.01304 29.6243 1.36783 30.1004 0 30.9227V25.6327C0.86087 25.1133 1.82696 24.7334 2.86957 24.5266C3.48652 24.4016 4.12739 24.3342 4.78261 24.3342C5.27043 24.3342 5.75348 24.3727 6.21739 24.44C8.08261 24.719 9.74696 25.5365 11 26.7099C12.253 25.5365 13.9174 24.719 15.7826 24.44C16.2465 24.3727 16.7296 24.3342 17.2174 24.3342C17.8726 24.3342 18.5135 24.4016 19.1304 24.5266C20.173 24.7334 21.1391 25.1133 22 25.6327Z"
          fill="#66E094"
        />
        <path
          d="M11 0C4.92609 0 0 4.95341 0 11.061C0 17.1686 4.92609 22.122 11 22.122C17.0739 22.122 22 17.1686 22 11.061C22 4.95341 17.0739 0 11 0ZM11 16.832C7.82913 16.832 5.26087 14.2495 5.26087 11.061C5.26087 7.87256 7.82913 5.29005 11 5.29005C14.1709 5.29005 16.7391 7.87256 16.7391 11.061C16.7391 14.2495 14.1709 16.832 11 16.832Z"
          fill="white"
        />
      </svg>
      <p class="text-white" style="font-size: 20px;">OpenBook</p>
    </div>
    <div class="md:flex md:flex-col justify-center h-auto">
      <p
        class="text-center text-4xl"
        style="color: var(--text-white, #FFF);
      font-family: Poppins;"
      >
        Welcome to OpenBook
      </p>
      <p
        class="sm:text-sm text-center"
        style="color: var(--text-g-6, #8C8C8C);
      font-family: Poppins;
      font-style: normal;"
      >
        <!-- Please Login to continue. -->
      </p>
      <div class="justify-center flex">
        <button
          type="button"
          class="flex w-64 md:mt-10 sm:mt-2 px-8 py-4 justify-center align-middle gap-1"
          style="border-radius: 4px; background: var(--status-positive, #66E094);"
        >
          <a href="/whitepaper"> White Paper </a>
        </button>
      </div>
    </div>
    <div class="absolute md:bottom-10 md:left-10 md:right-10 justify-center">
      <p
        style="color: var(--text-g-6, #8C8C8C);
      text-align: center;
      font-family: Poppins;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;"
      >
        Welcome to <b class="text-white">OpenBook</b>, the future of accounting
        at your fingertips! Experience the ease of decentralized financial
        management. Streamline processes, manage transactions securely, and gain
        real-time insights. Simplify your accounting journey with
        <b class="text-white">OpenBook</b>!
      </p>
    </div>
  </div>
  <div
    class="md:w-1/2 sm::basis-1/2 md:basis md:flex md:h-screen sm:h-full bg-neutral-950"
    style="background-color: gray;"
  >
    <Carousel autoplay="2000">
      {#each images as image, index (index)}
        <img src={image} class="md:w-screen md:h-screen" alt="ok" />
      {/each}
    </Carousel>
  </div>
</main>

<style lang="postcss">
  /* section {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
  } */
  /* .slides {
    height: 100rem;
    width: 100%;
  } */

  /* span {
		display: inline-block;
		margin-top: 6rem;
	} */
</style>
