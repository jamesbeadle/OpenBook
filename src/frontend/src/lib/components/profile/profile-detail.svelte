<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { userStore } from '$lib/stores/user-store';
  import { toastsError, toastsShow } from '$lib/stores/toasts-store';
  import type { ProfileDTO } from '../../../../../declarations/backend/backend.did';
  import { busyStore, Copy, Spinner } from '@dfinity/gix-components';
  import { getDateFromBigInt } from '$lib/utils/helpers';
  import UpdateProfileDetailModal from '$lib/components/profile/update-profile-detail-modal.svelte';

  let profile: Writable<ProfileDTO | null> = writable(null);
  let showProfileDetailModal: boolean = false;
  let fileInput: HTMLInputElement;
  let joinedDate = '';
  let newUser = false;

  let unsubscribeUserProfile: () => void;

  $: profileSrc =
    $profile && $profile?.profilePicture && $profile?.profilePicture?.length > 0
      ? URL.createObjectURL(new Blob([new Uint8Array($profile.profilePicture)]))
      : 'profile_placeholder.png';

  let isLoading = true;

  onMount(async () => {
    try {
      await userStore.sync();

      unsubscribeUserProfile = userStore.subscribe((value) => {
        if (!value) {
          return;
        }
        if(value.principal === ""){
          newUser = true;
        }
        setProfile(value);
        joinedDate = getDateFromBigInt(value.createDate);
      });
    } catch (error) {
      toastsError({
        msg: { text: 'Error fetching profile detail.' },
        err: error,
      });
      console.error('Error fetching profile detail:', error);
    } finally {
      isLoading = false;
    }
  });

  function setProfile(updatedProfile: any) {
    if (updatedProfile) {
      profile.set(updatedProfile);
    }
  }

  function displayProfileDetailModal(): void {
    showProfileDetailModal = true;
  }

  async function closeProfileDetailModal() {
    const profileData = await userStore.getProfile();
    setProfile(profileData);
    showProfileDetailModal = false;
  }

  function cancelProfileDetailModal() {
    showProfileDetailModal = false;
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
    busyStore.startBusy({
      initiator: 'upload-image',
      text: 'Uploading profile picture...',
    });

    try {
      await userStore.updateProfilePicture(file);
      await userStore.sync();
      const profileData = await userStore.getProfile();

      setProfile(profileData);
      if (
        profileData &&
        profileData.profilePicture &&
        profileData.profilePicture.length > 0
      ) {
        const blob = new Blob([new Uint8Array(profileData.profilePicture)]);
        profileSrc = URL.createObjectURL(blob);
      }
      toastsShow({
        text: 'Profile image updated.',
        level: 'success',
        duration: 2000,
      });
    } catch (error) {
      toastsError({
        msg: { text: 'Error updating profile image.' },
        err: error,
      });
      console.error('Error updating profile image', error);
    } finally {
      busyStore.stopBusy('upload-image');
    }
  }
</script>

{#if isLoading}
  <Spinner />
{:else}
  <UpdateProfileDetailModal
    profile={$profile}
    visible={showProfileDetailModal}
    closeModal={closeProfileDetailModal}
    cancelModal={cancelProfileDetailModal}
  />

  {#if newUser}
    <p>New User</p>
  {:else}
    <div class="flex-1 flex-col">
      <div class="w-full flex flex-row">
        <div class="flex w-auto flex-col">
          <p>Profile Image</p>
          <img alt="profile" />
        </div>
        <div class="flex justify-content-end">
          <p>Maximimum Size.</p>
          <p>500KB</p>
        </div>
      </div>

      <div class="w-full flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 flex flex-row">
          <div class="" />
        </div>
        <div class="w-full md:w-1/2" />
      </div>
    </div>

    <div class="container mx-auto p-4">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
          <div class="group flex flex-col md:block">
            <img src={profileSrc} alt="Profile" class="w-full mb-1 rounded-lg" />

            <div class="file-upload-wrapper mt-4">
              <button class="btn-file-upload book-btn" on:click={clickFileInput}
                >Upload Photo</button
              >
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
        </div>

        <div class="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 md:px-2 mb-4 md:mb-0">
          <div class="md:ml-4 md:px-4 px-4 mt-2 md:mt-1 rounded-lg">
            <p class="mb-1">Username:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.username}
            </h2>
            <p class="mb-1">Display Name:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.displayName}
            </h2>
            <p class="mb-1">First Name:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.firstName}
            </h2>
            <p class="mb-1">Last Name:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.lastName}
            </h2>
            <p class="mb-1">OpenChat:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.openChatUsername}
            </h2>
            <p class="mb-1">Email:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.emailAddress}
            </h2>
            <p class="mb-1">Phone Number:</p>
            <h2 class="default-header mb-1 md:mb-2">
              {$profile?.phoneNumber}
            </h2>
            <button
              class="text-sm md:text-sm p-1 md:p-2 px-2 md:px-4 rounded book-btn"
              on:click={displayProfileDetailModal}
            >
              Update
            </button>

            <p class="mb-1 mt-4">Joined:</p>
            <h2 class="default-header mb-1 md:mb-2">{joinedDate}</h2>

            <p class="mb-1">Principal:</p>
            <div class="flex items-center">
              <h2 class="tiny-text">{$profile?.principal}</h2>
              <Copy value={$profile?.principal ?? ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

{/if}
