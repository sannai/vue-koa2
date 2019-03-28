<template>
    <!-- 聊天室 -->
    <main>
        <div class="login-wrap" v-show="!isShow">
            <div class="login-con">
                <h3>用户登录</h3>
                <input v-model="loginName" type="text" placeholder="请输入昵称">
                <button class="login-btn" @click="handleClick('登录')">登录</button>
            </div>
        </div>
        <div class="chat-wrap" v-show="isShow">
            <h1>多人聊天室</h1>
            <div class="chat-con clearfix">
                {{htmlValue}}
            </div>
            <div class="bottom">
                <div>
                    <div v-for="(item, index) in htmldata" :key="index">
                        <div v-html="item"></div>
                    </div>
                </div>
                <el-input type="text" id="sendtxt" v-model="text"></el-input>
                <el-button class="sendBtn" @click="handleClick('发送')">发送</el-button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            loginName: "112",
            isShow: false,
            uname: "",
            text: "",
            htmlValue: "",
            htmldata: []
        };
    },
    created() {
        var uname = null;
        /*登录成功*/
        this.$sockets.on("loginSuccess", data => {
            console.log(data, 6, this.isShow);
            if (data.username !== uname) {
                this.isShow = true;
            } else {
                alert("用户名不匹配，请重试");
            }
        });

        /*登录失败*/
        this.$sockets.on("loginFail", function() {
            alert("昵称重复");
        });

        /*新人加入提示*/
        this.$sockets.on("add", data => {
            var html = "<p>系统消息:" + data.username + "已加入群聊</p>";
            this.htmlValue = html;
        });
        this.$sockets.on("leave", name => {
            if (name !== null) {
                var html = "<p>FBI warning:" + name + "已退出群聊</p>";
                this.htmlValue = html;
            }
        });
        this.$sockets.on("receiveMessage", data => {
            this.showMessage(data);
        });
    },
    methods: {
        handleClick(item) {
            console.log(item);
            if (item === "登录") {
                if (this.loginName) {
                    console.log(this.$sockets.emit(), this.loginName);
                    this.$sockets.emit("login", { username: this.loginName });
                } else {
                    console.log("请输入雷人");
                }
            } else {
                if (this.text) {
                    this.$sockets.emit("sendMessage", {
                        username: this.loginName,
                        message: this.text
                    });
                }
            }
        },
        showMessage(data) {
            var html;
            if (data.username === this.loginName) {
                html =
                    '<div class="chat-item item-right clearfix"><span class="img fr"></span><span class="message fr">' +
                    data.message +
                    "</span></div>";
            } else {
                html =
                    '<div class="chat-item item-left clearfix rela"><span class="abs uname">' +
                    data.username +
                    '</span><span class="img fl"></span><span class="fl message">' +
                    data.message +
                    "</span></div>";
            }
            this.htmldata.push(html);
        }
    }
};
</script>

<style scoped>
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    *zoom: 1;
}
.cred {
    color: #f03e3e;
}
.cgreen {
    color: #459d36;
}
.fr {
    float: right;
}
.fl {
    float: left;
}
.rela {
    position: relative;
}
.abs {
    position: absolute;
}
/* h1 {
  position: fixed;
  z-index: 20;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  left: 0;
  top: 0;
  background: #000;
  color: #fff;
} */

/*登录界面*/
.login-wrap {
    background: #e7e7e7;
    width: 100%;
    height: 100%;
    text-align: center;
}
.login-con {
    padding-top: 50px;
}
.login-con h3 {
    margin-bottom: 20px;
}
.login-con input {
    width: 60%;
    display: block;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
}
.login-con button {
    width: 60%;
    display: block;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    border: none;
    background: #459d36;
    color: #fff;
    border-radius: 5px;
}

/*聊天界面*/
.chat-wrap {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: #e7e7e7;
    text-align: center;
}
.chat-con {
    padding: 50px 0;
    background: #e7e7e7;
}
.chat-con p {
    display: inline-block;
    padding: 5px 10px;
    background: #999;
    border-radius: 5px;
    color: #fff;
    margin: 5px 0;
}
.chat-item {
    width: 100%;
    margin-bottom: 20px;
}
.item-right .message {
    background: #62b900;
}
.item-left .message {
    background: #fff;
    margin-top: 20px;
}
.item-left .img {
    margin-right: 10px;
}
.item-left .uname {
    font-size: 12px;
    left: 50px;
    top: 0;
}
.chat-item .message {
    width: 60%;
    display: block;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
}
.chat-item .img {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
}
</style>
