<script>
import {
  defineComponent,
  ref,
  reactive,
} from "@vue/composition-api";

export default defineComponent({
  name: "MyApp",

  setup() {
    let id = 2;
    const inputValue = ref("Hello MyApp");
    const onInputValue = ({ target: { value } }) => inputValue.value = value;

    const addTodo = () => {
      console.log(`addTodo() 메서드 호출 - ${inputValue.value}`);
      list.push({
        id: ++id,
        todo: inputValue.value,
        finished: false,
      });

      inputValue.value = "";
    };

    const list = reactive([
      {
        id: 0,
        todo: "할일 0",
        finished: true,
      },
      {
        id: 1,
        todo: "할일 1",
        finished: true,
      },
      {
        id: 2,
        todo: "할일 2",
        finished: false,
      },
    ]);

    const onChangeFinished = item => (item.finished = !item.finished);

    const onRemoveItem = item => {
      const index = list.indexOf(item);
      list.splice(index, 1);

      console.log(list);
    }

    return {
      inputValue,
      onInputValue,
      addTodo,
      list,
      onChangeFinished,
      onRemoveItem,
    };
  },

  methods: {
    renderList() {
      const {
        list,
        onChangeFinished,
        onRemoveItem,
        maxHeight,
      } = this;

      const parsedList = list.map(item => {
        const { id, todo, finished } = item;

        return (
          <li 
            class="myApp-listSection-list-item"
            key={id}
          >
            <input 
              type="checkbox" 
              class="myApp-listSection-list-item-checkbox"
              checked={finished}
              onchange={() => onChangeFinished(item)}
            />

            <div class="myApp-listSection-list-item-id">{id}</div>
            
            <div class="myApp-listSection-list-item-todo">{todo}</div>
            
            <button 
              class="myApp-listSection-list-item-remove"
              onclick={() => onRemoveItem(item)}
            >
              삭제하기
            </button>
          </li>
        );
      });
      

      return (
        <transition-group 
          name="list" 
          tag="ul" 
          class="chocobe"
          style={{ maxHeight }}
        >
          {parsedList}
        </transition-group>
      );
    }
  },

  render() {
    const {
      inputValue,
      onInputValue,
      addTodo,
      renderList,
    } = this;

    return (
      <div class="myApp">
        <header class="myApp-header">
          {/** TODO: 제목 분리하기 */}
          <h1 class="myApp-header-title">
            제목
          </h1>
        </header>

        {/** 입력부 */}
        <section class="myApp-formSection">
          <input 
            type="text" 
            class="myApp-formSection-input" 
            value={inputValue} 
            oninput={onInputValue}
          />
          <button class="myApp-formSection-button" onclick={addTodo}>추가하기</button>
        </section>

        {/** 리스트 */}
        {renderList()}
      </div>
    );
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.myApp {
  
}

/* 헤더부 */
.myApp-header {

}

.myApp-header-title {

}

/* 입력부 */
.myApp-formSection {

}

.myApp-formSection-input {

}

.myApp-formSection-button {

}

.myApp-listSection {

}

.myApp-listSection-list {

}

.myApp-listSection-list-item {

}

.myApp-listSection-list-item-checkbox {

}

.myApp-listSection-list-item-id {

}

.myApp-listSection-list-item-todo {

}

.myApp-listSection-list-item-deleteButton {

}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.chocobe {
  max-height: var(--max-height);

  transition: max-height 2s;
}
</style>