# Vue3 스터디 - (코지코더 강좌)

``Vue3`` 에서는 2가지의 컴포넌트 작성 방법을 지원하고 있습니다.
* ``Vue Options``: ``Vue2`` 의 방식
* ``composition-api``: ``setup()`` 을 사용한 컴포넌트 작성 방식

이 프로젝트는 ``Composition-API`` 를 사용하여 컴포넌트를 작성하는 방식으로 스터디 합니다.



<br/><hr/><br/>



## 01. ``App.vue`` 렌더링

``Vue2`` 와는 달리, ``createApp()`` 함수를 사용하여 ``App.vue`` 를 렌더링 합니다.

```javascript
// main.js

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

<br/>

또한 ``createApp()`` 으로 만든 ``Vue`` 객체는 ``Builder`` 패턴이 적용되어, 다음과 같이 초기화 할 수 있습니다.

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
  .use(router)
  .use(store)
  .mount("#App");
```



<br/><hr/><br/>



## 02. ``<template>`` 변경점

``Vue2`` 에서는 ``<template>`` 에 루트 요소에 묶인 형식으로 작성 하였습니다.

```html
<template>
  <div class="component-root">
    ...
  </div>
</template>
```

<br/>

``Vue 3`` 에서는 이부분이 변경 되어, 루트 요소 없이 사용할 수 있게 되었습니다.

```html
<template>
  <div class="el-1"></div>

  <div class="el-2">
    <div class="el-2-1"></div>
    <div class="el-2-2"></div>
  </div>

  ...
</template>
```



<br/><hr/><br/>



## 03. ``setup()``

``Vue3`` 에서 가장 큰 변화는 ``composition-api`` 입니다.

``Vue2`` 의 기본 문법이었던 ``Options`` 방식과 달리, ``setup()`` 함수에서 반환하는 객체가 ``컴포넌트 속성`` 이 됩니다.

```html
<template>
  <div class="name">
    {{ greet }}
  </div>
</template>

<script>
export default {
  setup() {
    const name = "Chocobe";
    const greeting = name => `Hello, ${name}`;

    const greet = greeting(name);

    return {
      greet,
    };
  },
};
</script>
```



<br/><hr/><br/>



## 04. ``ref`` 와 ``reactive``

``Vue2`` 에서 제공했던 ``data`` 와 ``method`` 는, ``Vue3`` 의 ``setup()`` 에서 반환시켜 만들 수 있습니다.

<br/>

``method`` 의 경우는 ``setup()`` 에서 함수객체를 반환하는 것으로 만들 수 있습니다.

```html
<script>
export default {
  setup() {
    const onClick = () => console.log("Hello World");

    return { onClick };
  },
};
</script>
```

<br/>

``data`` 의 경우는 ``Vue3`` 에서 제공하는 2개의 함수를 사용하여 만들 수 있습니다.

* ``ref()`` 함수
* ``reactive()`` 함수

<br/>

``data`` 를 만드는데 2개의 함수를 제공하는 이유는 다음과 같습니다.

* ``ref()`` 함수는 모든 타입 (리터럴, 객체, 배열) 을 만들 수 있습니다.
* ``reactive()`` 함수는 객체, 배열만 만들 수 있습니다.
* ``ref()`` 로 만든 ``data``는 ``.value`` 속성을 통해서만 실제 값(참조값)에 접근할 수 있습니다.
* ``reactive()`` 는 바로 값을 접근할 수 있습니다. (``.value`` 속성 없음)

<br/>

만약, ``ref()`` 나 ``reactive()`` 를 사용하지 않는다면, ``<template />`` 에서 값의 변화를 ``감지할 수 없습니다.``

<br/>

```html
<template>
  <div class="name">{{ name }}</div>
  <div class="user">{{ user }}</div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    const name = ref("초코비");

    const user = reactive({
      id: 0,
      name: "Chocobe",
    });

    return {
      name,
      user,
    };
  },
};
</script>
```

<br/>

<img src="./readmeAssets/04-01.png"><br/>



<br/><hr/><br/>



## 05. 메서드와 이벤트

``setup()`` 에서 정의한 함수를 ``return`` 해주면 됩니다.

``<template />`` 에서의 이벤트 등록 방법은 ``Vue2`` 와 동일 합니다.

```html
<template>
  <button @click="onClick">버튼</button>
</template>

<script>
export default {
  setup() {
    const onClick => () => console.log("Hello World");

    return {
      onClick,
    };
  },
};
</script>
```



<br/><hr/><br/>



## 06. 이벤트 발생 시키기 (``emit()``)

``Vue2`` 에서는 ``this.$emit()`` 을 사용하여 컴포넌트의 이벤트를 발생 시킬 수 있었습니다.

``composition-api`` 의 ``setup()`` 을 사용할 경우에는 ``this`` 가 아닌, ``setup()`` 으로 받게 되는 ``인자`` 를 통해서 이벤트를 발생 시킬 수 있습니다.

<br/>

``setup()`` 으로 받게되는 인자는 다음과 같습니다.

``setup(props, context)``
* ``props``: 부모 컴포넌트에서 받는 ``props``
* ``context``: 이 컴포넌트의 ``context``

``emit()`` 메서드는 ``context.emit()`` 을 통해 사용할 수 있습니다.

<br/>

```javascript
<script>
export default {
  setup(_props, context) {
    const onAddTodo = todo => {
      context.emit("addTodo", todo);
    };

    return {
      onAddTodo,
    };
  },
};
</script>
```

<br/>

그리고 ``Vue3`` 에서 추가된 속성인 ``emits`` 를 함께 등록 해주어야 합니다.

``emits`` 속성은, 컴포넌트에서 발생시킬 ``이벤트명`` 을 ``string[]`` 으로 작성합니다.

이렇게 작성한 코드는, 다음과 같습니다.

```javascript
export default {
  emits: ["addTodo", "deleteTodo"],

  setup(_props, context) {
    const addTodo = todo => {
      context.emit("addTodo", todo);
    }

    const deleteTodo = todo => {
      context.emit("deleteTodo", todo);
    }

    return {
      addTodo,
      deleteTodo,
    };
  },
};
```

<br/>

위와 같이 ``emits`` 속성을 정의하면, 부모 컴포넌트에서 사용할 때, 자식 컴포넌트에서 발생되는 ``이벤트 목록`` 을 파악할 수 있게 됩니다.



<br/><hr/><br/>



## 07. ``props``

``Vue2`` 와 동일합니다.

<br/>

```html
<script>
export default {
  props: {
    myProp: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
```



<br/><hr/><br/>



## 08. ``computed``

``Vue3`` 의 ``computed`` 는 ``ref()`` 와 ``reactive()`` 처럼, ``vue`` 에서 제공하는 ``computed()`` 메서드로 생성할 수 있습니다.

```javascript
import { computed } from "vue";

export default {
  setup() {
    const count = 0;
    const doubleCount = computed(() => count * 2);

    return {
      count,
      doubleCount,
    };
  },
};
```



<br/><hr/><br/>



## 09. ``watchEffect``

``Vue2`` 의 ``watch`` 처럼 대상의 값이 변경될 경우, ``callback (handler)`` 가 호출 됩니다.

``Vue2`` 의 ``watch`` 와 다른점은, ``watchEffect`` 의 ``callback`` 에서 사용한 ``Reactive state`` 가 하나라도 변경될 경우, 호출되는 특징이 있습니다.

그리고, 내부에서 사용 ``Reactive state`` 를 모두 감시하는 형태이므로, ``callback`` 으로 아무런 값을 받아오지 못합니다.

즉, ``현재값`` 과 ``이전값`` 을 구분할 수 없고, ``watchEffect`` 의 ``callback`` 이 호출되는 시점에는, 이미 값이 변경된 후 입니다.

<br/>

``watchEffect`` 의 사용방법은 다음과 같습니다.

```html
<script>
import { watchEffect, ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    watchEffect(() => {
      console.log("watch 동작 !!");

      // Reactive state 를 사용
      console.log(`count: ${count}`);
    });

    // watchEffect 의 callback 이 호출되는 시점
    count.value = 3;
  },
};
</script>
```

<br/>

위의 예시에서는 ``count.value = 3`` 이 실행되면, ``watchEffect`` 가 동작하게 됩니다.

<br/>

만약 아래의 코드처럼 ``watchEffect`` 의 ``callback`` 에서 복수의 ``Reactive state`` 를 사용된다면, 이 중 어떠한 ``Reactive state`` 가 변경되어도, ``watchEffect`` 의 ``callback`` 이 실행 됩니다.

<br/>

```html
<script>
import { ref } from "vue";

export default {
  setup() {
    const value1 = ref(1);
    const value2 = ref(100);

    watchEffect(() => {
      console.log(`watchEffect 의 callback 실행`)
      console.log(`value1.value: ${value1.value}`);
      console.log(`value2.value: ${value2.value}`);
    });

    // 값이 변경된 후, watchEffect 의 callback 이 실행됨
    value1.value = 3;

    // 여기서도 watchEffect 의 callback 이 실행됨
    value2.value = 300;
  },
};
</script>
```

<br/>

위의 예시에서는 ``ref()`` 만 사용하였지만, ``reactive()``, ``computed()``, ``props`` 의 변경에도 ``watchEffect`` 의 ``callback`` 이 실행 됩니다.

즉, ``watchEffect`` 는 ``Reactive state (반응성 상태값)`` 의 변경마다 공통으로 실행할 로직에 유용합니다.



<br/>



## ``watch``

``Vue2`` 와 유사하지만, 다른점은 복수의 대상을 대상으로 ``watch`` 의 ``callback (handler)`` 를 호출할 수 있습니다.

아래의 코드는 단일 대상에 ``watch`` 를 사용한 예시 입니다.

```html
<script>
import { watch, ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    watch(count, (cur, prev) => {
      console.log(`cur: ${cur}`);
      console.log(`prev: ${prev}`);
    });
  },
};
</script>
```

<br/>

``Vue3`` 의 ``watch`` 는 복수의 대상을 감지할 수 있으며, 감시 대상들을 ``배열에 넣어`` 넘겨주면 됩니다.

```html
<script>
import { watch, ref } from "vue";

export default {
  setup() {
    const value1 = ref(0);
    count value2 = ref(100);

    watch(
      [value1, value2],
      (cur, prev) => {
        console.log(`cur: ${cur}`);
        console.log(`prev: ${prev}`);
      },
    );

    setTimeout(() => {
      // watch 츼 callback 호출
      value1.value = 3;
    }, 1000);
    // [3, 100]

    setTimeout(() => {
      // watch 의 callback 호출
      value2.value = 300;
    }, 2000);
    // [3, 300]
  },
};
</script>
```

<br/>

지금까지 ``watch`` 는 ``Vue2`` 와 동일한 동작을 하였습니다.

하지만, 객체를 대상으로 ``watch`` 를 사용하면, ``callback`` 의 인자인 ``prev (이전값)`` 이 ``현재값과 동일`` 한 상태인 버그가 존재 합니다.

때문에, ``watch`` 의 감시대상으로 각각의 요소를 별도로 감시해야, 기존의 ``watch`` 처럼 사용할 수 있습니다.

(만약 감시대상을 ``배열`` 로 사용하여 동작하지 않는다면, ``배열 반환 타입 Callback`` 으로 사용하면 동작 합니다.)

(작성일: 2021. 12. 14)

<br/>

```html
<script>
import { watch, ref } from "vue";

export default {
  setup() {
    const obj = ref({
      a: 1,
      b: "Hello",
    });

    watch(
      [obj.a, obj.b],
      (cur, prev) => {
        console.log(cur)
        console.log(pref)
      },
    );

    setTimeout(() => {
      obj.value.a = 3;

      // 와치 동작
      // cur: [{ a: 3, b: "Hello" }]
      // pref: [{ a: 1, b: "Hello" }]
    }, 1000);

    setTimeout(() => {
      obj.value.b = "🚀🚀🚀";

      // 와치 동작
      // cur: [{ a: 3, b: "Hello" }]
      // pref: [{ a: 3, b: "🚀🚀🚀" }]
    }, 2000);
  }
}
</script>
```

<br/>

```html
<!-- 위의 코드에서 watch 가 동작하지 않을 경우 -->
<script>
import { ref, watch } from "vue";

export default {
  setup() {
    const obj = ref({
      a: 1,
      b: "Hello",
    });

    watch(
      () => [obj.a, obj.b],
      (cur, prev) => {
        console.log(cur)
        console.log(pref)
      },
    );

    setTimeout(() => {
      obj.value.a = 3;

      // 와치 동작
      // cur: [{ a: 3, b: "Hello" }]
      // pref: [{ a: 1, b: "Hello" }]
    }, 1000);

    setTimeout(() => {
      obj.value.b = "🚀🚀🚀";

      // 와치 동작
      // cur: [{ a: 3, b: "Hello" }]
      // pref: [{ a: 3, b: "🚀🚀🚀" }]
    }, 2000);
  }
}
</script>
```