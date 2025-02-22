<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { userStore } from '$lib/stores/user-store';
  import type { ProfileDTO } from '../../../../../declarations/backend/backend.did';
  import { getDateFromBigInt } from '$lib/utils/helpers';
  import CreateProfileForm from './create-profile-form.svelte';
  import OpenchatIcon from '$lib/icons/openchat-icon.svelte';
  import ShareableUpdateModal from './shareable-update-modal.svelte';
  import CopyIcon from '$lib/icons/copy-icon.svelte';

  let profile: Writable<ProfileDTO | null> = writable(null);
  let fileInput: HTMLInputElement;
  let joinedDate = '';
  let newUser = false;
  let showUpdateModal = false;
  let showShareableUpdateModal = false;

  let unsubscribeUserProfile: () => void;

  $: profileSrc =
    $profile && $profile?.profilePicture && $profile?.profilePicture?.length > 0
      ? URL.createObjectURL(new Blob([new Uint8Array($profile.profilePicture)]))
      : 'profile_placeholder.png';

  let isLoading = true;

  onMount(async () => {
    try {
      console.log("here1")
      await userStore.sync();

      unsubscribeUserProfile = userStore.subscribe((value) => {
        console.log(value)
        if (!value) {
          return;
        }
        if (value.principal === '') {
          newUser = true;
        }
        setProfile(value);
        console.log(value)
        joinedDate = getDateFromBigInt(value.createDate);
      });
    } catch (error) {
      console.error('Error fetching profile detail:', error);
    } finally {
      isLoading = false;
    }
  });

  function toggleUpdateModal() {
    showUpdateModal = !showUpdateModal;
  }

  function setProfile(updatedProfile: any) {
    if (updatedProfile) {
      profile.set(updatedProfile);
    }
  }

  function clickFileInput() {
    fileInput.click();
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 1000 * 1024) {
        alert('File size exceeds 1000KB');
        return;
      }
      uploadProfileImage(file);
    }
  }

  async function uploadProfileImage(file: File) {

    try {
      await userStore.updateProfilePicture(file);
      await userStore.sync();
      await userStore.subscribe(profileData => {
        setProfile(profileData);
        if (
          profileData &&
          profileData.profilePicture &&
          profileData.profilePicture.length > 0
        ) {
          const blob = new Blob([new Uint8Array(profileData.profilePicture)]);
          profileSrc = URL.createObjectURL(blob) + '?v=' + new Date().getTime();
        }
      });
      
    } catch (error) {
      console.error('Error updating profile image', error);
    } finally {
    }
  }

  function profileCreated() {
    newUser = false;
  }

  function profileUpdated() {
    showUpdateModal = false;
  }

  function toggleShareableUpdateModal() {
    showShareableUpdateModal = !showShareableUpdateModal;
  }

  async function copyTextAndShowToast() {
    try {
      const textToCopy = $profile ? $profile.principal : '';
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

{#if isLoading}
  <Spinner />
{:else}
  {#if $profile && showUpdateModal}
    <Modal visible={showUpdateModal} on:nnsClose={toggleUpdateModal}>
      <div class="m-4">
        <div class="flex justify-between items-center">
          <h3>Update Public Profile Information</h3>
          <button class="times-button" on:click={toggleUpdateModal}
            >&times;</button
          >
        </div>

        <CreateProfileForm {profile} {profileUpdated} {profileCreated} />
      </div>
    </Modal>
  {/if}

  {#if showShareableUpdateModal}
    <ShareableUpdateModal
      {profile}
      {toggleShareableUpdateModal}
      {showShareableUpdateModal}
      shareableInfoUpdated={toggleShareableUpdateModal}
    />
  {/if}

  {#if newUser || !$profile}
    <h3 class="default-header">Create Your OpenBook Profile</h3>
    <CreateProfileForm {profile} {profileCreated} {profileUpdated} />
  {:else}
    <div
      class="flex-1 flex-col m-1 md:mx-1 text-xxs sm:text-sm md:text-xxs lg:text-xs"
    >
      <div
        class="w-full flex flex-col sm:flex-row mt-8 md:mt-0 items-center md:mb-4"
      >
        <span class="w-full sm:w-auto">Principal:&nbsp;</span>
        <button
          class="w-full text-left flex items-center my-2 xs:my-0"
          on:click={copyTextAndShowToast}
        >
          {$profile.principal}<CopyIcon className="w-7 xs:w-6" fill="#FFFFFF" />
        </button>
      </div>
      <div class="w-full flex flex-col md:flex-row">
        <div class="flex flex-col">
          <div class="w-full md:w-36 flex flex-col">
            {#key profileSrc}
              <img
                src={profileSrc}
                alt="Profile"
                class="w-full mb-2 rounded-lg"
              />
            {/key}
            <button
              class="btn-file-upload book-btn w-full text-xs mb-2"
              on:click={clickFileInput}>Upload Photo</button
            >
            <div class="file-upload-wrapper">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                bind:this={fileInput}
                on:change={handleFileChange}
                style="opacity: 0; position: absolute; left: 0; top: 0;"
              />
            </div>
          </div>
          <p class="text-xs">Maximimum Size 500KB.</p>
        </div>
        <div class="flex flex-1 flex-col md:flex-row w-full md:px-4 md:pr-0">
          <div
            class="w-full md:w-1/2 flex-col flex mt-4 md:mt-0 md:mx-2 lg:mx-4 xl:mx-8"
          >
            <div class="w-full flex my-4 md:mt-0 mb-4 items-center">
              <div class="hidden md:flex w-2/3 default-header">
                Public Profile Information:
              </div>
              <div class="md:hidden w-2/3 default-header">
                Public Profile Info
              </div>
              <div class="w-1/3 flex justify-end">
                <button
                  on:click={toggleUpdateModal}
                  class="book-btn px-4 py-2 rounded-md md:text-xxs lg:text-sm xl:text-base"
                >
                  Update
                </button>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4">
              <div class="flex flex-col w-1/2">
                <label for="username" class="inputHeader"
                  >Username
                  <span>
                    <div class="text-xs text-red-500 ml-1">*</div>
                  </span>
                </label>
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.username}&nbsp;</span
                  >
                </p>
              </div>
              <div class="flex flex-col w-1/2 md:w-1/2">
                <label for="displayName" class="inputHeader"
                  >Display Name
                  <span>
                    <div class="text-xs text-red-500 ml-1">*</div>
                  </span>
                </label>
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.displayName}</span
                  >
                </p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="flex flex-col w-1/2">
                <label for="firstName" class="inputHeader">First Name</label>

                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.firstName}&nbsp;</span
                  >
                </p>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="lastName" class="inputHeader">Last Name</label>
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.lastName}&nbsp;</span
                  >
                </p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="flex flex-col w-full">
                <label for="profession" class="inputHeader">Profession</label>
                <p class="display-value-wrapper">
                  <span class="wide-truncated-display-value"
                    >{$profile.profession}&nbsp;</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-full md:w-1/2 flex-col flex mt-4 md:mt-0 md:mx-2 lg:mx-4 xl:mx-8"
          >
            <div class="w-full flex my-4 md:mt-0 mb-4 items-center">
              <div class="hidden md:flex w-2/3 default-header">
                Shareable Profile Information:
              </div>
              <div class="md:hidden w-2/3 default-header">
                Shareable Profile Info:
              </div>
              <div class="w-1/3 flex justify-end">
                <button
                  on:click={toggleShareableUpdateModal}
                  class="book-btn px-4 py-2 rounded-md md:text-xxs lg:text-sm xl:text-base"
                >
                  Update
                </button>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4">
              <div class="flex flex-col w-1/2">
                <label for="openChatUsername" class="inputHeader"
                  ><a
                    target="_blank"
                    href="https://oc.app/community/mldkd-vqaaa-aaaar-av5cq-cai/channel/230276105428323899255565868449599995147/?ref=zv6hh-xaaaa-aaaar-ac35q-cai"
                    ><OpenchatIcon className="w-4 mr-1" /></a
                  >OpenChat</label
                >
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.openChatUsername}&nbsp;</span
                  >
                </p>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="displayName" class="inputHeader">Email</label>
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.emailAddress}&nbsp;</span
                  >
                </p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="flex flex-col w-1/2">
                <label for="phoneNumber" class="inputHeader">Phone Number</label
                >
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.phoneNumber}&nbsp;</span
                  >
                </p>
              </div>
              <div class="flex flex-col w-1/2">
                <label for="otherContact" class="inputHeader">Other</label>
                <p class="display-value-wrapper">
                  <span class="truncated-display-value"
                    >{$profile.otherContact}&nbsp;</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}
