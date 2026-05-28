import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/myAxios";
import useMyErrorStore from "../error/useMyErrorStore";

const usePostIndexStore = defineStore('postIndex', ()=>{
  // 1. State (ref)
  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);

  // 2. Getters (computed)
  const getNextPageNumber = computed(()=>currentPage.value + 1);


  // 3. Actions (function) 
  // clear를 하지 않으면 items.value에 이전의 이미지 경로 데이터가 남아있음.
  const clearPostIndex = ()=>{
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  }

  const getPostPagination = async (page = 1)=>{
  // 마지막 페이지가 아닐 경우만 실행
    // if(!isLastPage.value){
    //   try{
    //     const url = '/api/posts';
    //     const params = {
    //       page,
    //     };
      
    //     const res = await myAxios.get(url, {params});
    //     const data =res.data.data;
    //     isLastPage.value = data.lastPage;
    //     items.value.push(...data.posts);
      
    //     currentPage.value++;
    //   } catch(error){
    //     throw error
    //   }
    
    // }
    if(!isLastPage.value){
      try {
        const url = '/api/posts';
        const params = {
          page,
        };
      
        const res = await myAxios.get(url, {params});
        const data =res.data.data;
        isLastPage.value = data.lastPage;
        items.value.push(...data.posts);
      
        currentPage.value++;
      } catch (error) {
        console.error(error);
        useMyErrorStore().setErrorInfo(error);
      }
    }
  }

  return{

    // state
    items,
    isLastPage,

    // getter
    getNextPageNumber,

    // actions
    getPostPagination,
    clearPostIndex,
  }
});

export default usePostIndexStore;
