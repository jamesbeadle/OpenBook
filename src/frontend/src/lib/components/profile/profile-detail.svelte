<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { userStore } from '$lib/stores/user-store';
  import { toastsError, toastsShow } from '$lib/stores/toasts-store';
  import type { ProfileDTO } from '../../../../../declarations/backend/backend.did';
  import { busyStore, Copy, Modal, Spinner } from '@dfinity/gix-components';
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
      await userStore.sync();

      unsubscribeUserProfile = userStore.subscribe((value) => {
        if (!value) {
          return;
        }
        if (value.principal === '') {
          newUser = true;
        }
        console.log(value)
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

  function profileUpdated() {
    showUpdateModal = false;
  }

  function toggleShareableUpdateModal(){
    showShareableUpdateModal = !showShareableUpdateModal;
  }

 
  async function copyTextAndShowToast() {
    try {
      const textToCopy = $profile ? $profile.principal : "";
      await navigator.clipboard.writeText(textToCopy);
      toastsShow({
        text: 'Copied to clipboard.',
        level: 'success',
        duration: 2000,
      });
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
    <div class="p-4">
      <div class="flex justify-between items-center my-2">
        <h3 class="default-header">Update Public Profile Information</h3>
        <button class="times-button" on:click={toggleUpdateModal}>&times;</button>
      </div>

      <CreateProfileForm
        profile={profile}
        {profileUpdated}
        {profileCreated}
      />
    </div>
  </Modal>
{/if}


{#if showShareableUpdateModal}
  <ShareableUpdateModal {profile} {toggleShareableUpdateModal} {showShareableUpdateModal} shareableInfoUpdated={toggleShareableUpdateModal}/>
{/if}

  {#if newUser || !$profile}
    <h3 class="default-header">Create Your OpenBook Profile</h3>
    <CreateProfileForm {profile} {profileCreated} {profileUpdated} />
  {:else}
    <div class="flex-1 flex-col m-4">
      <div class="w-full flex flex-col md:flex-row">
        <div class="flex flex-col">
          <p class="mb-2 inputHeader">Profile Image</p>
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
        <div class="flex flex-1 md:p-4 flex-col md:flex-row md:space-x-16 w-full md:px-8">
          <div class="w-full md:w-1/2 flex-col flex mt-4">
            <div class="w-full flex my-4 md:mt-0 mb-4 items-center">
              <div class="w-2/3 text-sm">
                Public Profile Information:
              </div>
              <div class="w-1/3 flex justify-end">
                <button on:click={toggleUpdateModal} class="book-btn px-4 py-2 rounded-md md:text-xxs">
                  Update
                </button>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4">
              <div class="form-group w-1/2">
                <label for="username" class="inputHeader"
                  >Username
                  <span>
                    <div class="text-xs text-red-500 ml-1">*</div>
                  </span>
                </label>
                <p class="display-value">{$profile.username}</p>
              </div>
              <div class="form-group w-1/2">
                <label for="displayName" class="inputHeader"
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
                <label for="firstName" class="inputHeader">First Name</label>
                <p class="display-value">{$profile.firstName}&nbsp;</p>
              </div>
              <div class="form-group w-1/2">
                <label for="lastName" class="inputHeader">Last Name</label>
                <p class="display-value">{$profile.lastName}&nbsp;</p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="form-group w-1/2">
                <label for="profession" class="inputHeader">Profession</label>
                <p class="display-value">{$profile.profession}&nbsp;
                </p>
              </div>
              <div class="form-group w-1/2">
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 flex-col flex mt-4">
            <div class="w-full flex my-4 md:mt-0 mb-4 items-center">
              <div class="w-2/3 text-xs">
                Shareable Profile Information:
              </div>
              <div class="w-1/3 flex justify-end">
                <button on:click={toggleShareableUpdateModal} class="book-btn px-4 py-2 rounded-md md:text-xxs">
                  Update
                </button>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4">
              <div class="form-group w-1/2">
                <label for="username" class="inputHeader"
                  ><a
                    target="_blank"
                    href="https://oc.app/community/mldkd-vqaaa-aaaar-av5cq-cai/channel/230276105428323899255565868449599995147/?ref=zv6hh-xaaaa-aaaar-ac35q-cai"
                    ><OpenchatIcon className="w-4 mr-1" /></a
                  >OpenChat</label
                >
                <p class="display-value">{$profile.openChatUsername} &nbsp;</p>
              </div>
              <div class="form-group w-1/2">
                <label for="displayName" class="inputHeader">Email</label>
                <p class="display-value">{$profile.emailAddress} &nbsp;</p>
              </div>
            </div>
            <div class="w-full flex flex-row space-x-4 mt-4">
              <div class="form-group w-1/2">
                <label for="username" class="inputHeader">Phone Number</label>
                <p class="display-value">{$profile.phoneNumber} &nbsp;</p>
              </div>
              <div class="form-group w-1/2">
                <label for="username" class="inputHeader">Other</label>
                <p class="display-value">{$profile.otherContact} &nbsp;</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-row space-x-4 mt-8">
          <button class="w-full text-left flex items-center text-xs" on:click={copyTextAndShowToast}>
            Principal: {$profile.principal}
            <CopyIcon className="w-4" fill='#FFFFFF' />
          </button>
        </div>
      </div>
    </div>
  {/if}
{/if}
