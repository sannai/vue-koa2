import Http from "@/utils/http";

//留言-查看
const getSeeMessageBoard = (that, data) => {
    Http(
        {
            method: "get",
            url: `/message/list`,
            params: data
        },
        response => {
            that.translateDataToTree(response.data.message);
        },
        error => {}
    );
};

//留言-添加
const postAddMessageBoard = (that, data, text) => {
    Http(
        {
            method: "post",
            url: `/message/add`,
            params: data
        },
        response => {
            that.$message.success(`${text}成功`);
            let datas = {
                page: 1,
                limit: 10
            };
            getSeeMessageBoard(that, datas);
        },
        error => {}
    );
};

export { getSeeMessageBoard, postAddMessageBoard };
