<template>
	<section class="artcle-detail">
		<a class="item-wrap">
			<h3 class="title">{{article.title}}</h3>
			<template v-for="item in article.knowledge">
				<my-tag :key="item.id">{{item.name}}</my-tag>
			</template>
			<div class="introduction" v-html="article.introduction"></div>
			<h4>内容区</h4>
			<div class="content" v-html="article.content"></div>
		</a>
		<comment-area
			:commentList="commentList"
			:commentListPage="commentListPage"
			@handleAddMessageBoard="handleAddMessageBoard"
			@handleScroll="handleScroll"
			:title="'留言'"
		></comment-area>
		<back-to-top></back-to-top>
	</section>
</template>

<script>
import "highlight.js/styles/atom-one-light.css";
import { getArtcleDetails, postAddComment, getComment } from "@/api/main.js";
import SidebarLeft from "./sidebar-left";
import SidebarRight from "./sidebar-right";
import BackToTop from "@/components/back-to-top";
import CommentArea from "@/components/comment-area";
import MyTag from "@/components/my-tag";
export default {
	data() {
		return {
			article: {},
			commentList: [],
			commentListPage: {
				page: 1,
				total: 0
			},
			page: 1
		};
	},
	created() {
		//文章详情
		getArtcleDetails(this, this.$route.params.id);
		//文章评论
		let data = {
			page: 1,
			limit: 10
		};
		getComment(this, this.$route.params.id, data);
		this.$store.commit("handleIsSelect", false);
	},
	computed: {
		//评论
		commentData() {
			let data = [];
			this.commentList.forEach((item, index) => {
				data = item.content;
			});
			return data;
		}
	},
	methods: {
		handleScroll(val) {
			if (
				Math.round(val.scrollTop) + val.clientHeight ===
				val.scrollHeight
			) {
				if (
					Math.ceil(
						this.commentListPage.total / this.commentListPage.limit
					) > this.page
				) {
					this.page++;

					let data = {
						page: this.page,
						limit: 10
					};
					getComment(this, this.$route.params.id, data);
				}
			}
		},
		//提交
		handleAddMessageBoard(data) {
			postAddComment(this, this.article._id, data, this.page);
		},
		//评论数据转换
		translateDataToTree(data) {
			this.commentListPage = data.pageing;
			if (data.data && data.data.length > 0) {
				//没有父节点的数据
				let parents = data.data.filter(
					value =>
						value.content.pid === undefined ||
						value.content.pid === null
				);

				//有父节点的数据
				let children = data.data.filter(
					value =>
						value.content.pid !== undefined &&
						value.content.pid !== null
				);
				//定义转换方法的具体实现
				let translator = (parents, children) => {
					//遍历父节点数据
					parents.forEach((parent, index) => {
						Object.assign(parent, { ...parent.content });
						//遍历子节点数据
						children.forEach((current, index) => {
							Object.assign(current, { ...current.content });
							//此时找到父节点对应的一个子节点
							if (current.pid === parent._id) {
								//对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
								let temp = JSON.parse(JSON.stringify(children));
								//让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
								temp.splice(index, 1);
								//让当前子节点作为唯一的父节点，去递归查找其对应的子节点
								// translator([current], temp);
								//把找到子节点放入父节点的children属性中

								typeof parent.children !== "undefined"
									? parent.children.push(current)
									: (parent.children = [current]);
							}
						});
					});
				};
				//调用转换方法
				translator(parents, children);
				this.commentList = this.commentList.concat(parents);
				let hash = [];
				this.commentList = this.commentList.reduce((item, next) => {
					// eslint-disable-next-line no-unused-expressions
					hash[next._id]
						? ""
						: (hash[next._id] = true && item.push(next));
					return item;
				}, []);
			}
		}
	},
	components: {
		SidebarLeft,
		SidebarRight,
		BackToTop,
		CommentArea,
		MyTag
	}
};
</script>

<style lang="scss">
@import "../../scss/my-element.scss";
.artcle-detail {
	width: 750px;
	background-color: #fff;
	margin-right: 30px;
	.item-wrap {
		display: block;
		margin: 20px;
		padding: 20px;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		.title {
			font-size: 30px;
			font-weight: 500;
			margin-bottom: 20px;
		}
		h4 {
			font-size: 16px;
			text-align: center;
			margin-top: 20px;
		}
		.introduction {
			margin: 10px 0;
			p {
				height: 250px;
			}
			img {
				width: 100%;
				height: 100%;
			}
		}
		.content {
			font-size: 14px;
			img {
				width: 100%;
			}
			.ql-syntax {
				background-color: #282c34;
				.hljs-tag {
					display: inline-flex;
					flex-wrap: wrap;
				}
				.hljs-comment {
					display: inline-flex;
					flex-wrap: wrap;
				}
			}
		}
	}
}
</style>
