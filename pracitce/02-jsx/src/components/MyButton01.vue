<script>
import {
  defineComponent,
  ref,
} from "@vue/composition-api";

export default defineComponent({
  name: "MyButton01",

  props: {
    color: {
      type: String,
      default: "#ff1493"
    },
    size: String,
    fluid: Boolean,
  },

  setup(props, ctx) {
    const { 
      color, 
      size,
      fluid,
      noBorder,
      circle 
    } = props;
    const { slots, attrs } = ctx;

    const buttonName = ref("마이버튼01");
    const onClick = () => console.log(`${buttonName.value} 클릭!`);

    const classNames = {
      "my-button-01": true,
      [color]: true,
      [size]: true,
      fluid,
      circle,
      noBorder,
    };

    console.log("setup() 함수 내부");
    console.log(props);
    console.log("");

    const getChildren = () => slots.default?.();

    return {
      buttonName,
      onClick,
      classNames,
      attrs,
      getChildren,
    };
  },

  render(h) {
    const {
      buttonName,
      onClick,
      classNames,
      attrs,
      getChildren,
    } = this;

    const children = getChildren();

    console.log("여기른 render()");
    console.log(classNames);
    console.log(attrs);

    return h(
      "button",
      {
        // attrs,
        class: classNames,
        on: {
          click: onClick,
        },
      },
      [
        children ? children : buttonName
      ]
    )
  }
})
</script>