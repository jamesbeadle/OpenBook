<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { userStore } from '$lib/stores/user-store';
  import { toastsError, toastsShow } from '$lib/stores/toasts-store';
  import type { ProfileDTO } from '../../../../../declarations/backend/backend.did';
  import { busyStore, Copy, Spinner } from '@dfinity/gix-components';
  import { getDateFromBigInt } from '$lib/utils/helpers';
  import UpdateProfileDetailModal from '$lib/components/profile/update-profile-detail-modal.svelte';
  import CreateProfileForm from './create-profile-form.svelte';
  import OpenchatIcon from '$lib/icons/openchat-icon.svelte';

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
        if (value.principal === '') {
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
        profileSrc = URL.createObjectURL(blob) + '?v=' + new Date().getTime();
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

  function profileCreated() {
    newUser = false;
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

  {#if newUser || !$profile}
    <CreateProfileForm {profile} {profileCreated} />
  {:else}
    <div class="flex-1 flex-col m-4">
      <div class="w-full flex flex-col md:flex-row">
        <div class="flex flex-col">
          <p class="text-xs mb-2">Profile Image</p>
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
        <div
          class="flex flex-1 md:p-4 flex-col md:flex-row md:space-x-16 w-full md:px-8"
        >
          <div class="w-full md:w-1/2 flex-col flex">
            <div class="w-full flex mb-2 my-4 md:mt-0">
              Public Profile Information:
            </div>
            <div class="w-full flex flex-row space-x-4">
              <div class="form-group w-1/2">
                <label for="username" class="flex text-sm"
                  >Username
                  <span>
                    <div class="text-xs text-red-500 ml-1">*</div>
                  </span>
                </label>
                <p class="display-value">{$profile.username}</p>
              </div>
              <div class="form-group w-1/2">
                <label for="displayName" class="flex text-sm"
                  >Display Name
                  <span>
                    <div class="text-xs text-red-500 ml-1">*</div>
                  </span>
                </label>
                <p class="display-value">{$profile.displayName}</p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="form-group w-1/2">
                <label for="firstName" class="block text-sm">First Name</label>
                <p class="display-value">{$profile.firstName}</p>
              </div>
              <div class="form-group w-1/2">
                <label for="lastName" class="block text-sm">Last Name</label>
                <p class="display-value">{$profile.lastName}</p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="form-group w-1/2">
                <label for="profession" class="block text-sm">Profession</label>
                <p class="display-value">
                  {$profile.profession.length == 0
                    ? ' '
                    : $profile.profession}&nbsp;
                </p>
              </div>
              <div class="form-group w-1/2" />
            </div>
          </div>
          <div class="w-full md:w-1/2 flex-col flex">
            <div class="w-full flex mb-2 my-4 md:mt-0">
              Shareable Profile Information:
            </div>
            <div class="w-full flex flex-row space-x-4">
              <div class="form-group w-1/2">
                <label for="username" class="flex text-sm"
                  ><a
                    target="_blank"
                    href="https://oc.app/community/mldkd-vqaaa-aaaar-av5cq-cai/channel/230276105428323899255565868449599995147/?ref=zv6hh-xaaaa-aaaar-ac35q-cai"
                    ><OpenchatIcon className="w-4 mr-1" /></a
                  >OpenChat</label
                >
                <p class="display-value">{$profile.openChatUsername} &nbsp;</p>
              </div>
              <div class="form-group w-1/2">
                <label for="displayName" class="block text-sm">Email</label>
                <p class="display-value">{$profile.emailAddress} &nbsp;</p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="form-group w-1/2">
                <label for="username" class="block text-sm">Phone Number</label>
                <p class="display-value">{$profile.phoneNumber} &nbsp;</p>
              </div>
              <div class="form-group w-1/2">
                <label for="username" class="block text-sm">Other</label>
                <p class="display-value">{$profile.otherContact} &nbsp;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}
