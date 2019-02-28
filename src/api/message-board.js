import Http from '@/utils/http';

//留言-查看
const getSeeMessageBoard = (that, data) => {
    Http({
        method: 'get',
        url: `/message-board/index`,
        params: data
    }, (response) => {
        that.translateDataToTree(response.data.message);
    }, (error) => {
    });
};

//留言-添加
const postAddMessageBoard = (that, data, text, page) => {
    Http({
        method: 'post',
        url: `/message-board/index`,
        params: data
    }, (response) => {
        that.$message.success(`${text}成功`);
        let datas = {
            page: page,
            limit: 10
        };
        getSeeMessageBoard(that, datas);
    }, (error) => {
    });
};

export {
    getSeeMessageBoard,
    postAddMessageBoard
};