import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import type { UserJwtPayload } from "~/libs/shared-types";
import type { DecodedJwt } from "~/types";

interface IUserStore {
  id: number;
  username: string;
  avatar: string;
  token: string;
  decodedToken: DecodedJwt<UserJwtPayload> | null;
}

export const useUserStore = defineStore("user", () => {
  const user = reactive<IUserStore>({
    id: 0,
    username: "",
    avatar: "",
    token: "",
    decodedToken: null,
  });
  const isLogged = ref(false);

  async function set(accessToken: unknown) {
    if (typeof accessToken !== "string") return;

    try {
      const decodedToken: DecodedJwt<UserJwtPayload> = jwtDecode(accessToken);
      user.decodedToken = decodedToken;

      user.id = decodedToken.id;
      user.username = decodedToken.username;
      user.token = accessToken;
      isLogged.value = true;

      saveToLocalStorage(accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  function clear() {
    user.id = 0;
    user.username = "";
    user.avatar = "";
    user.token = "";
    user.decodedToken = null;
    isLogged.value = false;

    clearLocalStorage();
  }

  function saveToLocalStorage(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  }

  async function loadFromLocalStorage() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    set(accessToken);
  }

  function clearLocalStorage() {
    localStorage.removeItem("accessToken");
  }

  return { isLogged, user, loadFromLocalStorage, set, clear };
});
