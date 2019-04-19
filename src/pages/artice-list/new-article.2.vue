<template>
    <!-- 富文本上传 -->
    <main class="artcle-details">
        <div id="editorjs"></div>
        <div class="funct">
            <el-button type="success" plain @click="handleClickSave">{{routeText}}文章</el-button>
        </div>
    </main>
</template>

<script>
import {
    postAddArticle,
    getIndexToken,
    postAddLabel,
    getArtcleDetails,
    putEditArticle
} from "@/api/main.js";
import Axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
export default {
    data() {
        return {
            quillUpdateImg: false,
            article: {
                content: "",
                title: "",
                introduction: ""
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
            isCeiling: false, //吸顶
            editor: ""
        };
    },
    created() {
        getIndexToken(this);
        const that = this;
        this.editor = new EditorJS({
            holderId: "editorjs",
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ["link"]
                },
                list: {
                    class: List,
                    inlineToolbar: ["link"]
                },
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            uploadByFile(file) {
                                const formdata = new FormData();
                                const keyname = new Date().getTime();
                                formdata.append("file", file);
                                formdata.append("token", that.qiniuForm.token);
                                formdata.append("key", keyname);
                                const instance = Axios.create();
                                return instance({
                                    method: "post",
                                    url: that.domain,
                                    data: formdata,
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                }).then(res => {
                                    return {
                                        success: 1,
                                        file: {
                                            url:
                                                that.uploadUrl +
                                                "/" +
                                                res.data.key
                                        }
                                    };
                                });
                            }
                        }
                    }
                }
            },
            data: {}
        });
    },
    methods: {
        handleClickSave() {
            this.editor
                .save()
                .then(outputData => {
                    console.log("Article data: ", outputData);
                })
                .catch(error => {
                    console.log("Saving failed: ", error);
                });
        }
    }
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
    #editorjs {
        width: 100%;
    }
    .funct {
        position: sticky;
        top: 50%;
        z-index: 2;
        height: 100px;
    }
}
</style>
