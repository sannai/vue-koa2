import Http from '@/utils/http';

//知识点-列表
const getKnowledgePoint = (that) => {
    Http({
        method: 'get',
        url: `/knowledge-point/list`
    }, (response) => {
        that.knowledgePointList = response.data.message.data;
    }, (error) => {});
};

export {
    getKnowledgePoint
};