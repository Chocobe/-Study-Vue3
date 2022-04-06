<script>
import {
  defineComponent,
} from "@vue/composition-api";

export default defineComponent({
  name: "OriginButton",

  setup(props, ctx) {
    const { attrs, slots } = ctx;
    const { color, size, noBorder, fluid, circle } = props;

    let tag = "button";

    const getChildren = () => {
      const defaultSlots = slots.default?.();

      console.log(slots.default);
      console.log(defaultSlots);

      return defaultSlots;
    }

    const classNames = {
      "labelr-button": true,
      "no-border": noBorder,
      fluid,
      circle,
      [color]: true,
      [size]: true,
    };

    return {
      tag,
      getChildren,
      classNames,
      attrs,
    };
  },

  render(h) {
    const {
      tag,
      getChildren,
      classNames,
      attrs,
    } = this;

    return h(
      tag,
      {
        class: classNames,
        attrs,
      },
      getChildren()
    );
  },
});
</script>