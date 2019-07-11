import Http from "@/utils/http";

//知识点-列表
const getKnowledgeList = that => {
    Http(
        {
            method: "get",
            url: `/knowledge/list`,
        },
        response => {
            that.knowledgeList = response.data.message.data;
        },
        error => {}
    );
};

export { getKnowledgeList };
