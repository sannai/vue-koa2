<template>
	<section class="comment-area">
		<header class="title">
			<h3>{{title}}</h3>
			<p>共{{commentListPage.total}}条</p>
		</header>
		<section class="content" ref="content" @scroll="handleScrollLoad">
			<ul class="comment-box" v-if="commentList.length > 0">
				<li v-for="item in commentList" :key="item.id">
					<div class="lately-list">
						<div>
							<h4 class="name">{{item.name}}</h4>
							<p class="comment">{{item.content}}</p>
							<time>{{item.createDate.slice(0,10)}}</time>
						</div>
						<p class="reply" @click="handleReply(item)">回复</p>
					</div>
					<ul class="comment-children">
						<li v-for="t in item.children" :key="t.id">
							<div class="lately-children">
								<div>
									<h4 class="name">{{t.name}}</h4>
									<p class="comment">
										<strong class="name">{{t.replyName}}</strong>
										{{t.content}}
									</p>
									<time>{{t.createDate.slice(0,10)}}</time>
								</div>
								<p class="reply" @click="handleReply(t)">回复</p>
							</div>
						</li>
					</ul>
				</li>
			</ul>
			<p v-else class="not-data">暂无评论</p>
		</section>
		<el-form label-width="60px">
			<el-form-item label="名字" :error="isCommentValue.name">
				<el-input type="text" ref="input" v-model="commentValue.name" placeholder="昵称" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="回复" v-show="isReply">
				<el-input type="text" v-model="replyName" :disabled="true" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="内容" :error="isCommentValue.content">
				<el-input type="textarea" v-model="commentValue.content" placeholder="正文" size="mini"></el-input>
			</el-form-item>
			<el-form-item style="text-align: right;">
				<el-button size="mini" v-if="isReply" @click="handlePublishComment('取消')">取消</el-button>
				<el-button size="mini" @click="handlePublishComment('发表')">发表</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
export default {
	props: {
		commentList: {
			type: Array
		},
		commentListPage: {
			type: Object
		},
		title: {
			type: String
		}
	},
	data() {
		return {
			commentValue: {
				name: "",
				content: "",
				pid: "",
				hierarchy: 1
			},
			isCommentValue: {
				name: "",
				content: ""
			},
			isReply: false,
			replyName: ""
		};
	},
	methods: {
		handleScrollLoad() {
			this.$emit("handleScroll", this.$refs.content);
		},
		//验证
		checkForm() {
			let isOk = true;
			if (this.commentValue.name === "") {
				this.isCommentValue.name = "不能为空";
				isOk = false;
			} else if (this.commentValue.name.length > 10) {
				this.isCommentValue.name = "1 到 10 位数字";
				isOk = false;
			} else {
				this.isCommentValue.name = "";
			}

			if (this.commentValue.content === "") {
				this.isCommentValue.content = "不能为空";
				isOk = false;
			} else if (this.commentValue.content.length > 50) {
				this.isCommentValue.content = "1 到 50 位数字";
				isOk = false;
			} else {
				this.isCommentValue.content = "";
			}
			return isOk;
		},
		handleCurrentChange(val) {
			this.$emit("handleCurrentChange", val);
		},
		//发表评论
		handlePublishComment(text) {
			let data = {
				name: this.commentValue.name,
				content: this.commentValue.content,
				hierarchy: this.commentValue.hierarchy,
				count: 0
			};
			if (text === "取消") {
				this.isReply = false;
				this.commentValue.pid = "";
				this.commentValue.hierarchy = 1;
			} else if (text === "发表") {
				if (this.checkForm()) {
					if (this.isReply) {
						data.replyName = this.replyName;
						data.pid = this.commentValue.pid;
						data.content = data.content;
						this.$emit("handleAddMessageBoard", data);
					} else {
						this.$emit("handleAddMessageBoard", data);
					}
					this.commentValue = {
						name: "",
						content: "",
						pid: "",
						hierarchy: 1
					};
				}
			}
		},
		//回复
		handleReply(item) {
			this.isReply = true;
			this.$refs["input"].focus();
			this.commentValue.hierarchy = 2;
			if (item.pid) {
				this.commentValue.pid = item.pid;
			} else {
				this.commentValue.pid = item._id;
			}
			this.replyName = "@" + item.name;
		}
	}
};
</script>

<style lang="scss">
@import "../../scss/my-element.scss";
.content::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}
.content::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(144, 147, 153, 0.3);
	background-color: #ccc;
}
.content::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(144, 147, 153, 0.3);
	border-radius: 10px;
	background-color: #ededed;
}
.comment-area {
	padding: 20px;
	.title {
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		background-color: #fafafa;
		font-size: 14px;
		@include my-display(space-between);
	}
	.content {
		max-height: 400px;
		overflow: auto;
		margin-bottom: 30px;
		background-color: #fff;
		border: 1px solid #f5f5f5;
		.comment-box {
			.name {
				font-size: 16px;
				padding: 10px 0;
			}
			.comment {
				font-size: 14px;
				margin-bottom: 10px;
			}
			.lately-children {
				margin-left: 20px;
				border-bottom: 1px solid #ccc;
				padding: 6px 10px;
				@include my-display(space-between);
			}
			.lately-list {
				border-bottom: 1px solid #ccc;
				@include my-display(space-between);
				padding: 16px 10px;
			}
			.reply {
				text-align: center;
				height: 43px;
				line-height: 43px;
				width: 60px;
				cursor: pointer;
			}
		}
		.not-data {
			text-align: center;
			height: 60px;
			line-height: 60px;
		}
	}
	.pagination {
		margin-top: 20px;
		text-align: center;
	}
}
</style>
