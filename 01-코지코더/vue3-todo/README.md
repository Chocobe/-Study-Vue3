# Vue3 스터디 - (코지코더 강좌)

``Vue3`` 에서는 2가지의 컴포넌트 작성 방법을 지원하고 있습니다.
* ``Vue Options``: ``Vue2`` 의 방식
* ``Composition-API``: ``setup()`` 을 사용한 컴포넌트 작성 방식

이 프로젝트는 ``Composition-API`` 를 사용하여 컴포넌트를 작성하는 방식으로 스터디 합니다.

<br/>

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

<br/>

