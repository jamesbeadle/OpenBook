import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
import { replaceHistory } from "$lib/utils/route.utils";
import { isNullish } from "@dfinity/utils";

export const signIn = async (
  params: AuthSignInParams,
): Promise<{ success: "ok" | "cancelled" | "error"; err?: unknown }> => {
  try {
    await authStore.signIn(params);

    return { success: "ok" };
  } catch (err: unknown) {
    if (err === "UserInterrupt") {
      return { success: "cancelled" };
    }

    return { success: "error", err };
  } finally {
  }
};

export const signOut = (): Promise<void> => logout();

export const idleSignOut = async () => logout();

const logout = async () => {
  await authStore.signOut();
  window.location.reload();
};
