<template>
	<div>
		<div style="display: flex; justify-content: space-between;">
			<h3>教师-{{actmsg[actidx]}}</h3>
			<h3><button v-on:click="go2Add()"> 继续添加 </button></h3>
		</div>
		<div style="width: 80% ; border: blue 1px solid">
			教师编号:<input type="text" v-model="formTea.uid" v-bind:readonly="actidx != 2">
			<hr>
			教师姓名:<input type="text" v-model="formTea.uname">
			<hr>
			教师电话:<input type="text" v-model="formTea.phone">
			<div v-if="actidx == 1">
				<hr>
				密码:<input type="text" v-model="formTea.pwd">
			</div>
			<div style="width: 8vw; height: 8vw">
				<img v-bind:src="`${imgurl}/api/public/showimg/${formTea.pic}`" style="width: 100%;height: 100%">
			</div>
			图片:<input type="file" ref="img">
			<hr>
			<button v-on:click="update()" v-show="actidx == 0">修改</button>
			<button v-on:click="add()" v-show="actidx == 1">添加</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AdmTeaAdd",
		data() {
			return {
				formTea: {},
				actmsg: ['修改', '添加', '显示'],
				actidx: 2
			}
		},
		methods: {
			go2Add() {
				this.actidx = 1;
				this.formTea = {
					uid: 0
				};
			},
			add() {
				var fd = new FormData();
				fd.append("uid", 0);
				fd.append("uname", this.formTea.uname);
				fd.append("phone", this.formTea.phone);
				fd.append("pwd", this.formTea.pwd);
				var file = this.$refs.img.files[0];
				fd.append("mypic", file);
				var that = this;
				this.$postf("/api/adm/tea/add", fd).then(function(resp) {
					that.formTea = resp.data.data;
					that.actidx = 2;
					that.$store.commit("show", " 添加成功 ...");
				});
			},
			update() {
				var fd = new FormData();
				fd.append("uid", this.formTea.uid);
				fd.append("uname", this.formTea.uname);
				fd.append("phone", this.formTea.phone);
				fd.append("pwd", this.formTea.pwd);
				fd.append("pic", this.formTea.pic);
				var file = this.$refs.img.files[0];
				fd.append("mypic", file);
				var that = this;
				this.$postf("/api/adm/tea/update", fd).then(function(resp) {
					that.formTea = resp.data.data;
					that.actidx = 2;
					that.$store.commit("show", " 修改成功 ...");
				});
			}
		},
		mounted() {
			let id = this.$route.query.uid;
			console.log(id);
			if (id == undefined || id == "0") { // 添加
				this.formTea = {
					uid: 0
				};
				this.actidx = 1;
			} else { // 更新
				this.$get("/api/adm/tea/findById/" + id).then(resp => {
					this.formTea = resp.data.data;
					this.actidx = 0;
				});
			}
		}
	}
</script>

<style>
/* 你可以在这里添加样式 */
</style>
