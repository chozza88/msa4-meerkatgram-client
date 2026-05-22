<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import usePostIndexStore from '../../store/post/usePostIndexStore.js';
// ---------------- 스토어로 이관 start-------------------- 
// const posts = ref([]);
// const isLastPage = ref(false);
// let currentPage = 0;

// // 함수
// const getPostPagination = async (page = 1)=>{
//   // 마지막 페이지가 아닐 경우만 실행
//   if(!isLastPage.value){
//     try{
//       const url = '/api/posts';
//       const params = {
//         page,
//       };
      
//       const res = await myAxios.get(url, {params});
//       const data =res.data.data;
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);
      
//       currentPage++;
//     }catch(error){
//       console.error(error);
//     }
    
//   }
  
// }
// ---------------- 스토어로 이관 end-------------------- 
const postIndexStore = usePostIndexStore();


const getNextPage = async()=>{
  await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
}

// 라이플 사이클
onBeforeMount(postIndexStore.getPostPagination);
</script>

<template>
<div class="card-container">
  <div 
    v-for="item in postIndexStore.items"
    :key="item.id"
    class="card"
    :style="{backgroundImage: `url(${item.image})`}"
  ></div>
</div>
<MyButton 
  v-if="!postIndexStore.isLastPage"
  :color="'gray'"
  :size="'big'"
  :content="'Show more posts from One-Piece'"
  @click="getNextPage()"
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
