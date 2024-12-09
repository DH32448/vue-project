<template>
	<div>
		<div style="display: flex; justify-content: space-between;">
			<h3>学生管理-先做不带分页的， 尝试后再做分页查询 limit n, m</h3>
			<h4><button v-on:click="go2Add()">添加新学生</button></h4>
		</div>
		<hr>
		<div style="width: 98% ; border: red 1px solid">
			<table border="1" style="width: 100%">
				<tr v-for="e in stus">
					<td>{{e.uid}}</td>
					<td>{{e.uname}}</td>
					<td>{{e.phone}}</td>
					<td>{{e.clz.clzno}}</td>
					<td>{{e.clz.clzname}}</td>
					<td>
						<div style="width: 4vw; height: 4vw">
							<img v-bind:src="`${imgurl}/api/public/showimg/${e.pic}`" style="width: 100%;height: 100%">
						</div>
					</td>
					<td><button v-on:click="go2Update(e)">修改</button></td>
					<td><button v-on:click="del(e.uid)">删除</button></td>
				</tr>
			</table>
			<div style="display: flex; justify-content: center;">
				<p><button v-on:click="move(-1)">上一页</button></p>
				<p>{{page.num}}/{{totalPage}}</p>
				<p><button v-on:click="move(1)">下一页</button></p>
			</div>
			<p>计算总的页数， 要注意余数， 计算总页数可以采用 Vue 的计算属性去完成</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AdmTeaShow",
		data() {
			return {
				stus: [],
				page: {
					num: 1,
					lines: 6,
					total: 0
				}
			}
		},
		methods: {
			del(uid) {
				var that = this;
				this.$get("/api/adm/stu/del/" + uid)
					.then(
						function(resp) {
							console.log(resp.data);
							that.stus = resp.data.data;
						}
					)
			},
			go2Add() {
				this.$store.state.pagenum = this.page.num;
				this.$router.push({
					path: '/adm/addstu',
					query: {
						uid: 0,
					}
				})
			},
			go2Update(e) {
				console.log(e)
				this.$store.state.pagenum = this.page.num;
				this.$router.push({
					path: '/adm/addstu',
					query: {
						uid: e.uid,
					}
				})
			},
			move(n) {
				this.page.num = this.page.num + n;
				if (this.page.num < 1) {
					this.page.num = 1;
					return;
				}
				if (this.page.num > this.totalPage) {
					this.page.num = this.totalPage;
					return;
				}
				var that = this;
				this.$get("/api/adm/stu/findPage?pagenum=" + this.page.num + "&lines=" + this.page.lines)
					.then(
						function(resp) {
							console.log(resp.data.data);
							that.stus = resp.data.data.students;
							that.page.total = resp.data.data.total;
						}
					)
			}

		},
		computed: {
			totalPage() {
				let n = this.page.total / this.page.lines;
				console.log("未取整页数=" + n);
				n = Math.floor(n);
				let y = this.page.total % this.page.lines;
				console.log("页数=" + n + "    余数=" + y);
				if (y > 0) n = n + 1;
				return n;
			}
		},
		mounted() {
			this.page.num = this.$store.state.pagenum;

			var that = this;
			this.$get("/api/adm/stu/findPage?pagenum=" + this.page.num + "&lines=" + this.page.lines)
				.then(
					function(resp) {
						console.log(resp.data.data);
						that.stus = resp.data.data.students;
						that.page.total = resp.data.data.total;
					}
				)
		}
	}
</script>

<style>
/* 你可以在这里添加样式 */
</style>
