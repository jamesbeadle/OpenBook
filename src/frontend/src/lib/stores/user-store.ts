import { authStore } from "$lib/stores/auth-store";
import { replacer } from "$lib/utils/helpers";
import { writable } from "svelte/store";
import type {
  ProfileDTO,
  UpdateProfileDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "../utils/actor-factory";
import { isError } from "$lib/utils/helpers";

function createUserStore() {
  const { subscribe, set } = writable<any>(null);


  async function sync() {
    console.log("here2")
    let localStorageString = localStorage.getItem("user_profile_data");
    console.log("string")
    console.log(localStorageString)
    if (localStorageString && localStorageString != "undefined") {
      const localProfile = JSON.parse(localStorageString);
      set(localProfile);
      return;
    }
    try {
      await cacheProfile();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async function cacheProfile() {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    let getProfileResponse = await identityActor.getProfile();
    let error = isError(getProfileResponse);
    if (error) {
      console.error("Error fetching user profile");
      return;
    }

    let profileData = getProfileResponse.ok;

    set(profileData);
  }

  async function createProfile(profileDTO: UpdateProfileDTO): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.createProfile(profileDTO);
      return result;
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }

  async function updateProfile(updatedProfile: UpdateProfileDTO): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateProfileDetail(updatedProfile);
      sync();
      return result;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  async function checkUsernameAvailability(username: string): Promise<any> {
    try {
      const identityActor = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.isUsernameAvailable(username);
      return result;
    } catch (error) {
      console.error("Error getting profile:", error);
      throw error;
    }
  }

  async function updateProfilePicture(picture: File): Promise<any> {
    try {
      const maxPictureSize = 1000;

      if (picture.size > maxPictureSize * 1024) {
        return null;
      }
      const reader = new FileReader();
      reader.readAsArrayBuffer(picture);
      reader.onloadend = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        try {
          const identityActor = await ActorFactory.createIdentityActor(
            authStore,
            process.env.BACKEND_CANISTER_ID ?? "",
          );
          const result = await identityActor.updateProfilePicture(uint8Array);
          sync();
          return result;
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error("Error updating username:", error);
      throw error;
    }
  }

  return {
    subscribe,
    sync,
    createProfile,
    updateProfile,
    updateProfilePicture,
    checkUsernameAvailability,
  };
}

export const userStore = createUserStore();
