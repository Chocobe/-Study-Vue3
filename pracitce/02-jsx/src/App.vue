<script>
import {
  defineComponent,
  ref,
} from "@vue/composition-api";

import OriginButton from "./components/OriginButton.vue";
import MyButton01 from "./components/MyButton01.vue";

export default defineComponent({
  name: "MyApp",

  components: {
    OriginButton,
    MyButton01,
  },

  setup() {
    const title = ref("Hello World 🚀");

    return {
      title,
    };
  },

  methods: {
    renderTitle() {
      const { title } = this;

      return (
        <h1>🐫 {title}</h1>
      );
    },

    renderOriginButton() {
      return (
        <OriginButton color="my-color">
          안녕하세요
        </OriginButton>
      );
    },

    renderMyButton01() {
      return (
        <MyButton01 size="small" fluid hello world>
          안뇽!
        </MyButton01>
      )
    }
  },

  render() {
    const {
      renderTitle,
      renderOriginButton,
      renderMyButton01,
    } = this;

    console.log(renderOriginButton());
    
    return (
      <div>
        {renderTitle()}
        {renderOriginButton()}
        {renderMyButton01()}
      </div>
    );
  },
});
</script>