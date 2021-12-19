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

<br/>

``Vue 3``에서 ``emit()`` 사용하기 위한 다른 방법도 있습니다.

``Vue 2`` 에서 사용했던 ``this.$emit()`` 처럼, 컴포넌트 객체를 통해서 ``emit()`` 메서드를 사용하는 방법도 지원하고 있습니다.

<br/>

``Vue 3`` 에서 컴포넌트 자신의 객체에 접근하는 방법은 다음과 같습니다.

```javascript
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const { emit } = getCurrentInstance();
    emit("myInput", "전달값");
  },
};
```



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



## 10. ``watch``

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



<br/><hr/><br/>



## 11. ``Router``

``Router`` 설정 파일은 ``Vue2`` 와 거의 유사합니다.

달라진 점은 다음과 같습니다.
* ``Router`` Factory Method 로 객체 생성
* ``History Mode`` 설정을 ``string`` 이 아닌, Factory Method 로 생성한 객체로 설정

<br/>

아래의 코드는 ``router.js`` 설정 파일 예시 코드 입니다.

```javascript
// router.js

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // Vue2 와 동일

  {
    path: "/",
    name: "...",
    component: () => import("@/..."),
  },

  // ...
];

const router = createRouter({
  // History Mode 객체로 설정
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```


<br/>


``.vue`` 파일에서 ``Router`` 접근에도 ``SingleTon`` 을 통하여 접근하도록 변경 되었습니다.

기존의 ``Router`` 접근방법과 변경된 접근방법을 비교하면 다음과 같습니다.

|Vue2|Vue3|
|---|---|
|this.$route|useRoute()|
|this.$router|useRouter()|

<br/>

아래의 코드는 ``Router`` 객체 접근 방법 예시코드 입니다.

```html
<script>
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    // Vue2 의 this.$route 와 동일 합니다.
    const $route = useRoute();
    
    // Vue2 의 this.$router 와 동일 합니다.
    const $router = useRouter();
  },
};
</script>
```



<br/><hr/><br/>



## 12. ``Vue3`` 의 ``Lifecycle Hooks``

``setup()`` 이 추가되면서, ``Vue2`` 의 ``created()`` 훅은 ``setup()`` 이 대체하게 되었습니다.

아래는 ``Vue3`` 의 주요 ``Lifecycle Hooks`` 입니다.

<br/>

### 12-1. ``create`` 관련 Hook

|역할|Hook Method|
|---|---|
|beforeCreate|``setup()``|
|created|``setup()``|

```html
<script>
export default {
  setup() {
    // beforeCreate 와 created 역할
  },
};
</script>
```

<br/>

### 12-2. ``mount`` 관련 Hook

|역할|Hook Method|
|---|---|
|beforeMount|``onBeforeMount()``|
|mounted|``onMounted()``|

```html
<script>
import { onBeforeMount, onMounted } from "vue";

export default {
  setup() {
    onBeforeMount(() => {
      // mount 완료 전에 호출되는 Hook
    });

    onMounted(() => {
      // mount 완료 후에 호출되는 Hook
    });
  },
};
</script>
```

<br/>

### 12-4. ``update`` 관련 Hook

|역할|Hook Method|
|---|---|
|beforeUpdate|``onBeforeUpdate()``|
|updated|``onUpdated()``|

```html
<script>
import { onBeforeUpdate, onUpdated } from "vue";

export default {
  setup() {
    onBeforeUpdate(() => {
      // update 전에 호출되는 Hook
    });

    onUpdated(() => {
      // update 후에 호출되는 Hook
    });
  },
};
</script>
```

<br/>

### 12-3. ``Unmount`` 관련 Hook

|역할|Hook Method|
|---|---|
|beforeUnmount|``onBeforeUnmount()``|
|unmounted|``onUnmounted()``|

```html
<script>
import { onBeforeUnmount, onMounted } from "vue";

export default {
  setup() {
    onBeforeUnmount(() => {
      // unmount 전 (beforeDestroy) 에 호출되는 Hook
    });

    onUnmounted(() => {
      // unmount 후 (destroyed) 에 호출되는 Hook
    });
  },
};
</script>
```



<br/><hr/><br/>



## 13. ``Composable`` - ``setup()`` 을 문맥별로 분리하기

자식 컴포넌트를 사용할 때, 필요한 ``State, Method, Hook`` 들이 있을 수 있습니다.

이를 위해 ``setup()`` 에서 정의하여 사용하게 되는데, 복수의 자식 컴포넌트를 사용하게 된다면, ``setup()`` 에서 문맥을 파악하기가 어려워 집니다.

<br/>

때문에 ``setup()`` 에서 정의하여 사용할 각 ``State, Method, Hook`` 들을 문맥별로 분리하여 작성하고, ``import`` 하여 사용할 수 있는데, 이를 ``Vue3`` 에서는 ``Composable`` 이라고 합니다.

<br/>

``Composable`` 을 사용하는 목적을 정리하면 다음과 같습니다.

* 특정 컴포넌트를 사용하기 위해 필요한 ``State, Method, Hook`` 들을 별도의 파일로 분리하여 작성할 수 있습니다.
* 동일한 컴포넌트를 자식 컴포넌트로 사용하는 모든 부분에서, 중복으로 코드 작성을 하지 않게 됩니다. (``import``)
* ``Composable`` 파일은 ``useXXX.js`` 형식으로 작성하며, ``setup()`` 과 같은 형식의 함수로 만듭니다.

<br/>

아래 코드는 ``Composable`` 을 적용한 예시 입니다.

```html
<!-- Toast.vue -->
<!-- 자식 컴포넌트 -->

<template>
  <h1>Toast Component</h1>

  <div>
    메시지: {{ message }}
  </div>

  <div>
    타입: {{ type }}
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";

export default {
  props: {
    message: {
      type: String,
      default: "",
    },

    type: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
```

<br/>

```javascript
// useToast.js
// composable 파일

import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const isShow = ref(false);
  const toastMessage = ref("");
  const toastType = ref("");

  let timeoutID = undefined;

  const openToast = (message, type) {
    toastMessage.value = message;
    toastType.value = type;
    isShow.value = true;

    timeoutID = setTimeout(() => {
      isShow.value = false;
      toastMessage.value = "";
      toastType.value = "";
    }, 2000);
  };

  onUnmounted(() => {
    timeoutID && clearTimeout(timeoutID);
  });

  return {
    isShow,
    toastMessage,
    toastType,
    openToast,
  };
};
```

<br/>

```html
<!-- MyParent.vue -->
<!-- 부모 컴포넌트 1 -->

<template>
  <Toast :isShow="isShow" :message="toastMessage" :type="toastType" />

  <button @click="openToast">열기</button>
</template>

<script>
import Toast from "@/components/Toast.vue";
import { useToast } from "@/composables/useToast";

export default {
  setup() {
    const {
      isShow,
      toastMessage,
      toastType,
      openToast,
    } = useToast();

    return {
      isShow,
      toastMessage,
      toastType,
      openToast,
    };
  },

  components: {
    Toast,
  },
};
</script>
```

<br/>

```html
<!-- YourParent.vue -->
<!-- 부모 컴포넌트 2 -->

<template>
  <Toast v-if="isShow" :message="toastMessage" :type="toastType" />
</template>

<script>
import Toast from "@/components/Toast.vue";
import { useToast } from "@/composables/useToast";

export default {
  setup() {
    const {
      isShow,
      toastMessage,
      toastType,
      openToast,
    } = useToast();

    return {
      isShow,
      toastMessage,
      toastType,
      openToast,
    };
  },

  components: {
    Toast,
  },
};
</script>
```



<br/><hr/><br/>



## 14. ``Teleport``

``Teleport`` 는 컴포넌트의 ``<template>`` 중 일부를 다른 Element 의 자식요소에 Rendering 하는 방법 입니다.

이는 ``Modal`` 컴포넌트의 경우가 좋은 예시 입니다.

화면 전체를 Overlay 하는 ``Modal`` 의 경우, ``position: relative`` 인 부모요소를 기준으로 Style 이 반영되기 때문 입니다.

<br/>

화면의 일부분에 위치하는 컴포넌트 내에서 필요한 ``Modal`` 의 경우, ``position: relative`` 는 부적절한 위치를 가지게 됩니다.

이 때, 화면 전체 Element 인 부모 요소로 ``Modal`` 의 Rendering 위치만 바꾸는데 사용하게 됩니다.

<br/>

``Teleport`` 의 특징은 다음과 같습니다.

* 컴포넌트의 ``<template>`` 일부분을 다른 위치에 Rendering 시킬 수 있습니다.
* ``Teleport`` 대상 요소는, 논리적 자식 컴포넌트를 그대로 유지 합니다.
  * ``Props``
  * ``Methods``
  * ``EventListener``
  * ``context.$parent``
  * 그 외 vm Properties 전체

<br/>

``Teleport`` 를 사용하려면, 대상 컴포넌트를 ``<teleport>`` 의 body에 작성하면 됩니다.

작성 형식은 다음과 같습니다.

```html
<template>
  <h1>Teleport 예시 코드</h1>

  <teleport to="#target">
    <MyComponent />
  </teleport>
</template>
```

<br/>

아래의 코드는 ``Teleport`` 를 사용한 예시 입니다.

```html
<!-- index.html -->
<html>
  <body>
    <div id="app" />
    <div id="teleportTarget" />
  </body>
</html>
```

```html
<!-- Parent.vue -->
<template>
  <h1>Teleport 예시 코드</h1>

  <button @click="openModal">
    모달 열기
  </button>

  <!-- <Element id="teleportTarget" /> 요소의 children 으로 Rendering 됩니다. -->
  <teleport to="#teleportTarge">
    <Modal v-if="isOpen" @close="onClose" @okay="onOkay" />
  </teleport>
</template>

<script>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";

export default {
  setup() {
    const isOpen = ref(false);

    const openModal = () => {
      isOpen.value = true;
    };

    const closeModal = () => {
      isOpen.value = false;
    };

    const onOkay = () => {
      console.log("오케이 !!");
    };

    return {
      isOpen,
      openModal,
      closeModal,
      onOkay,
    };
  },
  components: {
    Modal,
  },
};
</script>
```



## 15. ``ScopedSlot`` (``Vue2`` 와 동일)

``ScopedSlot`` 기능은 ``Vue2`` 와 동일 합니다.

자주 사용하지 않는 기능이기에 복습겸 정리를 하였습니다.

<br/>

``Slot`` 은 컴포넌트의 특정 부분을 부모 컴포넌트에서 정의하여 사용할 수 있도록 공간을 만드는 방법 입니다.

아래 코드는 ``Slot`` 을 가진 ``Children.vue`` 컴포넌트를 사용한 예시 입니다.

```html
<!-- Children.vue -->
<template>
  <slot>default slot</slot>
  <slot name="body">body slot</slot>
  <slot name="footer">footer slot</slot>
</template>

<!-- Parent.vue -->
<template>
  <Children>
    기본 슬롯 정의

    <template #body>바디 슬롯 정의</template>

    <template #footer>푸터 슬롯 정의</template>
  </Children>
</template>

<script>
import Children from "@/components/Children.vue";

export default {
  components: {
    Children,
  },
};
</script>
```

<br/>

위와 같은 ``Slot`` 기능을 살펴보면 다음과 같은 과정을 알 수 있습니다.

* ``Parent.vue`` 에서 ``Children.vue`` 를 자식 컴포넌트로 사용 합니다.
* ``Parent.vue`` 에서 ``Children.vue`` 의 각 ``Slot`` 에 ``<template>`` 을 제공 합니다.
* ``Children.vue`` 는 ``Slot`` 으로 받은 요소를 자신의 ``Slot`` 영역에 렌더링 합니다.

<br/>

``Slot`` 은 ``부모 => 자식`` 방향으로 ``<template>`` 을 전달(주입) 하는 방법 이라고 생각할 수 있습니다.

여기서 생각해 볼 수 있는 것은, ``자식`` 에 있는 데이터를 기준으로 ``Slot`` 을 넘겨주고 싶을 경우 입니다.

이 때 사용할 수 있는 방법이 ``ScopedSlot`` 입니다.

<br/>

``ScopedSlot`` 은 자식 컴포넌트에서 정의한 ``Slot`` 을 대상으로 자신의 데이터를 부모 컴포넌트로 넘겨주는 방법 입니다.

즉, 부모 컴포넌트에서 ``Slot`` 을 지정해 주지만, 여기서 넘겨주는 ``<template>`` 은, 자식 컴포넌트의 데이터로 사용할 수 있게 해줍니다.

자식 컴포넌트의 ``Slot`` 으로 넘겨주는 데이터 (``ScopedSlot``) 은 부모 컴포넌트로 넘겨줄 때, 객체 하나에 묶어서 넘겨줍니다.

<br/>

아래의 코드는 ``ScopedSlot`` 을 사용한 예시 입니다.

```html
<!-- Children.vue -->
<template>
  <slot name="default" :title="title">
    Default Slot
  </slot>

  <slot name="body" :id="id" :subject="mySubject">
    Body Slot
  </slot>

  <slot name="footer">
    Footer Slot
  </slot>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    title: {
      title: String,
      default: "",
    },
  },

  setup() {
    const id = ref(3);
    const mySubject = ref("It's My Subject");

    return {
      id,
      mySubject,
    };
  },
};
</script>
```

<br/>

```html
<!-- Parent.vue -->

<template>
  <Children :title="🐫🐫🐫">
    <template #default="scopedSlotData">
      {{ scopedSlotData.title }}
    </template>

    <template #body="{ id, mySubject }">
      <div>아이디: {{ id }}</div>
      <div>서브젝트: {{ mySubject }}</div>
    </template>

    <template #footer>
      여기는 푸터 입니다.
    </template>
  </Children>
</template>
```



<br/><hr/><br/>



## 16. ``v-model``

``v-model`` 은 양방향 바인딩을 위한 방법입니다.

``Vue 2.x`` 에서도 있지만, 컴포넌트당 오직 하나만 사용할 수 있었습니다.

이러한 불편한 점을 보완하기 위해 ``.sync`` 기능이 추가된 상태 입니다.

<br/>

``Vue 3`` 에서는 이러한 ``v-model`` 을 복수로 사용할 수 있도록 변경 되었습니다.

그리고 ``.sync`` 키워드는 삭제 되었습니다.

<br/>

아래는 ``Vue3`` 에서 변경된 ``v-model`` 기능 입니다.

||Vue 2.x|Vue 3.x|
|---|---|---|
|``v-model`` 사용 개수|오직 1개|복수 사용가능|
|``.sync`` 키워드|사용 가능|사용 불가 (삭제됨)|
|이벤트 명|``update:이벤트명`` 을 사용해야 ``.sync`` 사용 가능|``update:이벤트명`` 을 사용해야 ``v-model`` 사용 가능|
|기본 ``Prop명``|``value``|``modelValue``|
|기본 ``이벤트명``|``input``|``update:modelValue``|

<br/>

아래의 코드는 ``Vue3`` 의 ``v-model`` 사용 예시 입니다.

```html
<!-- Children.vue -->

<template>
  <input type="text" :value="myTitle" @input="emitMyTitle">
  <input type="text" :value="mySubject" @input="emitMySubject">
</template>

<script>
export default {
  props: {
    myTitle: {
      type: String,
      default: "",
    },

    mySubject: {
      type: String,
      default: "",
    },
  },

  setup(_props, { emit }) {
    const emitMyTitle = e => {
      emit("update:myTitle", e.target.value);
    };

    const emitMySubject = e => {
      emit("update:mySubject", e.target.value);
    };

    return {
      emitMyTitle,
      emitMySubject,
    };
  },
};
</script>
```

<br/>

```html
<!-- Parent.vue -->

<template>
  <Children v-model:myTitle="title" v-model:mySubject="subject" />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const title = ref("제목");
    const subject = ref("내용");

    return {
      title,
      subject,
    };
  },
};
</script>
```



<br/><hr/><br/>



## 17. ``toRefs`` 와 ``toRef``

``reactive`` 로 생성한 객체는 ``방응성`` 을 가집니다.

여기서 주의할 점은, ``reactive`` 객체의 개별 ``Property`` 들에는 반응성이 부여되지 않는다는 것입니다.

<br/>

이를 위해, ``reactive`` 로 생성한 객체의 개별 ``Property`` 들에 반응성을 부여하는 함수를 제공합니다.

* ``toRef(대상객체, "Property명")`` : 대상객체의 ``Property`` 하나에 반응성을 부여 합니다.
* ``toRefs(대상객체)`` : 대상객체의 모든 ``Property`` 들을 개별로 반응성을 부여 합니다.

<br/>

정리하면, ``reactive`` 로 생성한 객체의 개별 ``Property`` 에는 반응성이 존재하지 않지만, ``toRef()`` 또는 ``toRefs()`` 를 사용하면, Property 개별로 반응성을 부여할 수 있습니다.

<br/>

```javascript
// count.js

import { reactive } from "vue";

export const useCount = () => {
  const countObj = reactive({
    prevCount: 0,
    count: 0,
  });

  return {
    countObj,
  };
};
```

<br/>

```html
<script>
import { toRefs } from "vue";
import { useCount } from "useCount";

export default {
  setup() {
    const { countObj } = useCount();

    // Property 개별로 반응성 부여
    const { prefCount, count } = toRefs(countObj);

    // ref() 로 생성한 객체처럼 ``.value`` 로 참조
    console.log(prefCount.value);
    console.log(count.value);

    return {
      prevCount,
      count,
    };
  },
};
</script>
```


<br/><hr/><br/>



## 18. 