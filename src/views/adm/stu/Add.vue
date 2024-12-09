<template>
	<div>
		<div style="display: flex; justify-content: space-between;">
			<h3>学生-{{actmsg[actidx]}} </h3>
			<h3><button v-on:click="go2Back()"> 返回(注意原先页面所在位置) </button></h3>
			<h3><button v-on:click="go2Add()"> 继续添加 </button></h3>
		</div>
		<div style="width: 80% ; border: blue 1px solid">
			学生编号:<input type="text" v-model="formStu.uid" v-bind:readonly="actidx!=2">
			<hr>
			学生姓名:<input type="text" v-model="formStu.uname">
			<hr>
			学生电话:<input type="text" v-model="formStu.phone">
			<hr>
			<div v-if="actidx == 1">
				<hr>
				密码:<input type="text" v-model="formStu.pwd">
			</div>
			<hr>
			<div style="width: 8vw; height: 8vw">
				<img v-bind:src="`${imgurl}/api/public/showimg/${formStu.pic}`" style="width: 100%;height: 100%">
			</div>
			图片:<input type="file" ref="img">
			<hr>
			<p>班级：
					<select v-model="formStu.clz.clzno">
						<option v-for="c in clzs"
								v-bind:value="c.clzno"
								v-bind:selected="formStu.clz.clzno == c.clzno">
							{{c.clzname}}
						</option>
					</select>
				</p>
			<hr>
			<button v-on:click="update()" v-show="actidx==0">修改</button>
			<button v-on:click="add()" v-show="actidx==1">添加</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AdmStuAdd",
		data() {
			return {
				formStu: { clz:{} },
				clzs:[],
				actmsg: ['修改', '添加', '显示'],
				actidx: 2
			}
		},
		methods: {
			go2Add() {
				this.actidx = 1;
				this.formStu = {
					uid: 0, clz:{}
				}
			},
			add() {
				var fd = new FormData;
				fd.append("uid", 0);
				fd.append("uname", this.formStu.uname);
				fd.append("phone", this.formStu.phone);
				fd.append("pwd", this.formStu.pwd);
				fd.append("clz.clzno",this.formStu.clz.clzno);
				var file = this.$refs.img.files[0];
				fd.append("mypic", file);
				var that = this;
				this.$postf(
					"/api/adm/stu/add", fd).then(
					function(resp) {
						that.formStu = resp.data.data;
						that.actidx = 2;
						//alert("添加成功 ...")
						that.$store.commit("show", " 添加成功 ...")
					}
				)
			}, //add
			update() {
				var fd = new FormData;
				fd.append("uid", this.formStu.uid);
				fd.append("uname", this.formStu.uname);
				fd.append("phone", this.formStu.phone);
				fd.append("pwd", this.formStu.pwd);
				fd.append("clz.clzno",this.formStu.clz.clzno);
				fd.append("pic", this.formStu.pic);
				var file = this.$refs.img.files[0];
				fd.append("mypic", file);
				var that = this;
				this.$postf(
					"/api/adm/stu/update", fd).then(
					function(resp) {
						that.formStu = resp.data.data;
						that.actidx = 2;
						that.$store.commit("show", " 修改成功 ...")
					}
				)
			},
			go2Back() {
				this.$router.push('/adm/stu')
			}

		},
		mounted() {
			let id = this.$route.query.uid;
			console.log(id)
			if (id == undefined || id == "0") { //添加
				this.formStu = {
					uid: 0
				};
				this.actidx = 1;
			} else { //更新
				this.$get("/api/adm/stu/findById/" + id).then(resp => {
					this.formStu = resp.data.data;
					this.actidx = 0;
				})
			}

			this.$get("/api/public/getClzs").then(resp => {
				this.clzs = resp.data.data;
			})
		}
	}
</script>

<style>
/* 你可以在这里添加样式 */
</style>
