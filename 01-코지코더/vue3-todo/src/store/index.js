import { createStore } from "vuex";
import toast from "@/store/modules/toastModule";

export default createStore({
  modules: {
    toast,
  },
});
