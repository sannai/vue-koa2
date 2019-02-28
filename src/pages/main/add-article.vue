<template>
  <!-- 富文本上传 -->
  <div class="add-artcle-details">
    <div class="box">
      <el-input placeholder="标题" v-model="label"></el-input>
      <el-button size="mini" @click="handleLabel">新增标签</el-button>


      <el-input placeholder="标题" v-model="article.title"></el-input>
      <div>
        简介
        <el-upload class="avatar-uploader" :action="domain" :data="qiniuForm" :show-file-list="false" :on-success="uploadEditorSuccess" :on-error="uploadEditorError" :before-upload="beforeEditorUpload">
        </el-upload>
        <quill-editor class="editor" @focus="onEditorFocus('introduction')" v-model="article.introduction" ref="introduction" :options="editorOption">
        </quill-editor>
      </div>
      <div>
        内容
        <el-upload class="avatar-uploader" ref="content" :action="domain" :data="qiniuForm" :show-file-list="false" :on-success="uploadEditorSuccess" :on-error="uploadEditorError" :before-upload="beforeEditorUpload">
        </el-upload>
        <quill-editor class="editor" @focus="onEditorFocus('content')" v-model="article.content" ref="content" :options="editorOption2">
        </quill-editor>
      </div>
    </div>
    <div class="funct">
      <el-button type="success" plain @click="handleClickSave">发布文章</el-button>
    </div>
  </div>
</template>

<script>
import { postAddArticle, getIndexToken, postAddLabel } from "@/api/main.js";
import { quillEditor } from "vue-quill-editor";
import imageUrl from "../../images/1.png";
//自定义编辑器的工作条
const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
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
                            image: function(value) {
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
                        container: toolbarOptions, // 工具栏
                        handlers: {
                            image: function(value) {
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
            textFocus: "",
            qiniuForm: {
                key: "",
                token: "",
                uploadUrl: ""
            },
            domain: "http://upload.qiniup.com", //华北地址
            uploadUrl: "http://v.zzp96.cn", //存储对象地址
            label: ''
        };
    },
    created() {
        this.qiniuForm.uploadUrl = this.uploadUrl;
        this.qiniuForm.key =
            new Date().getTime() + "" + Math.floor(Math.random() * 1000);
        getIndexToken(this);
    },
    methods: {
        
        handleLabel() {
            let data = {
                name: this.label
            };
            postAddLabel(this, data);
        },
        onEditorFocus(text) {
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
            if (textFocus === "introduction") {
                quill = this.$refs.introduction.quill;
            } else {
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
        handleClickSave() {
            let data = {
                title: this.article.title,
                content: this.article.content,
                introduction: this.article.introduction
            };
            postAddArticle(this, data);
        }
    },
    components: {
        quillEditor
    }
};
</script>

<style lang="scss">
.add-artcle-details {
  max-width: 1170px;
  padding: 20px 0;
  margin: 0px auto;
  display: flex;
  min-height: 798px;
  background-color: #fff;
  .box {
    .el-input {
      margin-bottom: 10px;
    }
  }
  .funct {
    position: fixed;
    right: 0;
    top: 50%;
  }
}
</style>
