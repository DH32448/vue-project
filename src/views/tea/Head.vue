<template>
  <div style="height: 80vh;border: blue 1px solid">
    <h3>头像修改-教师学生同页面组件</h3>
    <hr>
    <div style="display: flex;">
      <!-- menu -->
      <div style="width: 25%; height: 100%; padding-left: 5%; ">
        <h3>
          当前我的图片
        </h3>
        <div style="width: 10vw; height: 10vw; border: 2px solid gray;">
          <img v-bind:src="`${imgurl}/api/public/showimg/${$store.state.pic}`" style="width: 100%;height: 100%">
        </div>
      </div>
      <div style="width: 74%;height: 100%;">
        <h3>
          上传新的图片
        </h3>
        <input type="file" ref="img">

        <hr>
        <button v-on:click = "update()"> 更新我的图片 </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'TeaHead',
  data() {
    return {
      imgurl: "http://localhost:9000"
    }
  },
  methods: {
    update() {
      var fd = new FormData;
      var file = this.$refs.img.files[0];
      fd.append("mypic", file);
      this.$postf("/api/user/updatePic", fd).then((resp)=> {
        this.$store.state.pic = resp.data.data + "?x=" + (new Date().getMilliseconds());
        this.$store.commit("show",  resp.data.msg)
      })
    } //update
  }
}
</script>

<style>

</style>