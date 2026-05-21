<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import myAxios from '../../api/myAxios.js';

const posts = ref([]);
const isLastPage = ref(false);
let currentPage = 1;

// 함수
const getPostPagination = async ()=>{
  // 마지막 페이지가 아닐 경우만 실행
  if(!isLastPage.value){
    try{
      const url = '/api/posts';
      const params = {
        page: currentPage,
      };

      const res = await myAxios.get(url, {params});
      const data =res.data.data;
      isLastPage.value = data.lastPage;
      posts.value.push(...data.posts);
    }catch(error){
      console.error(error);
    }
     
  }

}

// 라이플 사이클
onBeforeMount(getPostPagination);

</script>

<template>
<div class="card-container">
  <div 
    v-for="item in posts"
    :key="item.id"
    class="card"
    :style="{backgroundImage: `url(${item.image})`}"
  ></div>
</div>
<MyButton 
  v-if="!isLastPage"
  :color="'gray'"
  :size="'big'"
  :content="'Show more posts from One-Piece'"
/>
</template>

<style scoped>
.card-container{
  display: grid;
  padding: 10px;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.card{
  border-radius: 10px;
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
