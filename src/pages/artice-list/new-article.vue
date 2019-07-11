<template>
	<!-- 富文本上传 -->
	<main class="artcle-details">
		<!-- <el-input placeholder="标题" v-model="label"></el-input>
		<el-button size="mini" @click="handleLabel">新增标签</el-button>-->
		<el-form label-width="80px">
			<el-form-item label="标题">
				<el-input placeholder="请输入内容" v-model="article.title"></el-input>
			</el-form-item>
			<el-form-item label="大图">
				<el-upload
					class="avatar-uploader"
					:action="domain"
					:data="qiniuForm"
					:show-file-list="false"
					:on-success="uploadEditorSuccess"
					:on-error="uploadEditorError"
					:before-upload="beforeEditorUpload"
				></el-upload>
				<quill-editor
					class="editor"
					@focus="onEditorFocus('introduction')"
					v-model="article.introduction"
					ref="introduction"
					:options="editorOption"
				></quill-editor>
			</el-form-item>
			<el-form-item label="内容">
				<el-upload
					class="avatar-uploader"
					:action="domain"
					:data="qiniuForm"
					:show-file-list="false"
					:on-success="uploadEditorSuccess"
					:on-error="uploadEditorError"
					:before-upload="beforeEditorUpload"
				></el-upload>
				<quill-editor
					class="editor"
					:class="{'ceiling': isCeiling}"
					v-model="article.content"
					@focus="onEditorFocus('content')"
					@blur="handleBlur"
					ref="content"
					:options="editorOption2"
				></quill-editor>
			</el-form-item>
		</el-form>
		<div class="funct">
			<el-button type="success" plain @click="handleClickSave">{{routeText}}文章</el-button>
		</div>
	</main>
</template>

<script>
import "highlight.js/styles/atom-one-light.css";
import hljs from "highlight.js";
import {
	postAddArticle,
	getIndexToken,
	postAddLabel,
	getArtcleDetails,
	putEditArticle
} from "@/api/main.js";
import { Quill } from "vue-quill-editor";
import imageUrl from "../../images/1.png";
//自定义编辑器的工作条
const toolbarOptions = [["image"]];
//自定义编辑器的工作条
const toolbarOptions2 = [
	["bold", "italic", "underline", "strike"], // toggled buttons
	["blockquote", "code-block"],
	[{ header: 1 }, { header: 2 }], // custom button values
	[{ list: "ordered" }, { list: "bullet" }],
	[{ script: "sub" }, { script: "super" }], // superscript/subscript
	[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
	[{ direction: "rtl" }], // text direction
	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ align: [] }],
	["image"],
	["clean"] // remove formatting button
];
export default {
	data() {
		return {
			quillUpdateImg: false,
			article: {
				content: "",
				title: "",
				introduction: ""
			},
			editorOption: {
				placeholder: "文章大图",
				modules: {
					toolbar: {
						container: toolbarOptions, // 工具栏
						handlers: {
							image: value => {
								getIndexToken(this);
								if (value) {
									document
										.querySelector(".avatar-uploader input")
										.click();
								} else {
									this.quill.format("image", false);
								}
							}
						}
					}
				}
			},
			editorOption2: {
				placeholder: "文章内容",
				modules: {
					toolbar: {
						container: toolbarOptions2, // 工具栏
						handlers: {
							image: value => {
								getIndexToken(this);
								if (value) {
									document
										.querySelector(".avatar-uploader input")
										.click();
								} else {
									this.quill.format("image", false);
								}
							}
						}
					},
					syntax: {
						highlight: text => hljs.highlightAuto(text).value
					}
				}
			},
			textFocus: "",
			qiniuForm: {
				key: "",
				token: "",
				uploadUrl: ""
			},
			domain: "https://upload.qiniup.com", //华北地址
			uploadUrl: "https://v.zzp96.cn", //存储对象地址
			routeText: "",
			isclick: true,
			isCeiling: false //吸顶
		};
	},
	created() {
		this.routeText = this.$route.name === "ArticleAdd" ? "添加" : "编辑";
		if (this.routeText === "添加") {
			this.article = {
				content: "",
				title: "",
				introduction: ""
			};
		}
		this.qiniuForm.uploadUrl = this.uploadUrl;
		this.qiniuForm.key =
			new Date().getTime() + "" + Math.floor(Math.random() * 1000);
		if (this.routeText === "编辑") {
			getArtcleDetails(this, this.$route.params.id);
		}
	},
	methods: {
		handleBlur() {
			this.isCeiling = false;
		},
		onEditorFocus(text) {
			if (text === "content") {
				this.isCeiling = true;
			} else {
				this.isCeiling = false;
			}
			this.textFocus = text;
		},
		//上传图片之前
		beforeEditorUpload(res, file) {
			//显示上传动画
			this.quillUpdateImg = true;
		},

		// 上传图片成功
		uploadEditorSuccess(res, file) {
			let textFocus = this.textFocus;
			let quill = "";
			//拼接出上传的图片在服务器的完整地址
			let imgUrl = this.qiniuForm.uploadUrl + "/" + res.key;
			//重置上传文件key，为下次上传做好准备
			this.qiniuForm.key =
				new Date().getTime() + "" + Math.floor(Math.random() * 1000);
			// 获取富文本组件实例
			console.log(this.$refs.content.quill);
			if (textFocus === "introduction") {
				quill = this.$refs.introduction.quill;
			} else if (textFocus === "content") {
				quill = this.$refs.content.quill;
			}
			// 获取光标所在位置
			let length = quill.getSelection().index;
			// 插入图片  res.info为服务器返回的图片地址
			quill.insertEmbed(length, "image", imgUrl);
			// 调整光标到最后
			quill.setSelection(length + 1);
			//取消上传动画
			this.quillUpdateImg = false;
		},

		// 上传图片失败
		uploadEditorError(res, file) {
			//页面提示
			Notification.error({
				message: "上传图片失败"
			});

			//取消上传动画
			this.quillUpdateImg = false;
		},
		//添加/编辑
		handleClickSave() {
			let data = {
				title: this.article.title,
				content: this.article.content,
				introduction: this.article.introduction
			};
			if (this.isclick) {
				if (this.routeText === "添加") {
					postAddArticle(this, data);
				} else {
					putEditArticle(this, this.article._id, data);
				}
				this.isclick = false;
			} else {
				this.$message({
					message: "点击过快稍等片刻，这是一条警告消息",
					type: "warning"
				});
			}
			//下面添加需要执行的事件 //定时器
			setTimeout(() => {
				this.isclick = true;
			}, 2000);
		}
	}
	// components: {
	//     quillEditor
	// }
};
</script>

<style lang="scss">
.artcle-details {
	box-sizing: border-box;
	display: flex;
	min-height: calc(100vh - 180px);
	width: 1040px;
	padding: 20px 0;
	margin: 20px auto;
	background-color: #fff;
	.el-form {
		flex: 1;
		margin-right: 20px;
	}
	.editor {
		.ql-toolbar {
			background-color: #f6f6f6;
		}
	}
	.ceiling {
		.ql-toolbar {
			position: sticky;
			z-index: 1;
			top: 76px;
		}
	}
	.funct {
		position: sticky;
		top: 50%;
		z-index: 2;
		height: 100px;
	}
}
</style>
