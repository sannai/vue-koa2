const articleSelect = {
    handleSelect(that, getArticleList) {
        let data = {
            keyWord: that.keyWord,
            page: 1,
            limit: 10
        };
        if (that.isclick) {
            getArticleList(that, data);
            that.isclick = false;
        } else {
            that.$message({
                message: "点击过快稍等片刻，这是一条警告消息",
                type: "warning"
            });
        }
        //下面添加需要执行的事件 //定时器
        setTimeout(() => {
            that.isclick = true;
        }, 1000);
    }
};

export {
    articleSelect
};