<template>
	<div>
		<div style="display: flex; justify-content: space-between;">
			<h3>教师管理</h3>
			<h4><button v-on:click="go2Add()">添加新教师</button></h4>
		</div>
		<hr>
		<div style="width: 98% ; border: red 1px solid">
			<table border="1" style="width: 100%">
				<tr v-for="e in teas" :key="e.uid">
					<td>{{e.uid}}</td>
					<td>{{e.uname}}</td>
					<td>{{e.phone}}</td>
					<td>
						<div style="width: 4vw; height: 4vw">
							<img v-bind:src="`${imgurl}/api/public/showimg/${e.pic}`" style="width: 100%;height: 100%">
						</div>
					</td>
					<td><button v-on:click="go2Update(e)">修改</button></td>
					<td><button v-on:click="del(e.uid)">删除</button></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AdmTeaShow",
		data() {
			return {
				teas: [],
				imgurl: "" // 假设 imgurl 需要在 data 中定义，如果没有定义，请根据实际情况补充
			}
		},
		methods: {
			del(uid) {
				var that = this;
				this.$get("/api/adm/tea/del/" + uid)
					.then(
						function(resp) {
							console.log(resp.data);
							that.teas = resp.data.data;
						}
					)
			},
			go2Add() {
				this.$router.push({
					path: '/adm/addtea',
					query: {
						uid: 0,
					}
				})
			},
			go2Update(e) {
				console.log(e);
				this.$router.push({
					path: '/adm/addtea',
					query: {
						uid: e.uid,
					}
				})
			}
		},
		mounted() {
			var that = this;
			this.$get("/api/adm/tea/findAll")
				.then(
					function(resp) {
						console.log(resp.data);
						that.teas = resp.data.data;
					}
				)
		}
	}
</script>

<style>
/* 你可以在这里添加样式 */
</style>
