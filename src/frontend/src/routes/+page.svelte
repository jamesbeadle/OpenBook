<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "./Layout.svelte";


    // Form fields bound to the inputs
    let postContent: string = "";
    let tags: string = "";
    let contextId: string = "";
    let organisation: string = "";
    let project: string = "";
    let projectStage: number = 0;

  // Function to handle form submission
  function submitPost(): void {
    /*
    const newPost: Post = {
      content: postContent,
      tags: tags.split(",").map((tag) => tag.trim()),
      contextId,
      organisation,
      project,
      projectStage: Number(projectStage),
      createdAt: Date.now(),
    };*/


    // Reset form fields
    postContent = "";
    tags = "";
    contextId = "";
    organisation = "";
    project = "";
    projectStage = 0;
  }

  
  onMount(async () => {
  });

</script>

<Layout>
    
  <div class="p-4 bg-BrandAltGray shadow rounded-md text-sm">
    <h2 class="mb-2">Create a Post</h2>

    <textarea
      bind:value={postContent}
      class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      rows="3"
      placeholder="Share your thoughts..."
    ></textarea>

    <div class="mt-1 flex flex-row justify-center items-center">
      <label for="tags" class="block text-sm font-medium mr-2">Tags</label>
      <input
        type="text"
        bind:value={tags}
        class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="e.g., web3, blockchain"
      />
    </div>

    <div class="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
      

      <div>
        <label for="context-id" class="block text-sm font-medium mb-1">Context ID</label>
        <input
          type="text"
          bind:value={contextId}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter context ID"
        />
      </div>

      <div>
        <label for="organisation-id" class="block text-sm font-medium mb-1">Organisation</label>
        <input
          type="text"
          bind:value={organisation}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter organisation"
        />
      </div>

      <div>
        <label for="project-id" class="block text-sm font-medium mb-1">Project</label>
        <input
          type="text"
          bind:value={project}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter project"
        />
      </div>

      <div>
        <label for="project-stage" class="block text-sm font-medium mb-1">Project Stage</label>
        <input
          type="number"
          bind:value={projectStage}
          class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter stage"
        />
      </div>
    </div>

    <div class="mt-4 flex justify-end">
      <button
        on:click={submitPost}
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Post
      </button>
    </div>
  </div>

</Layout>