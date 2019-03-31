<template>
    <span class="my-tag" :class="[classType, classSize]" @click="handleClick">
        <slot></slot>
        <svg class="my-svg my-tag-svg" aria-hidden="true" v-if="closable" @click.stop="handleClose">
            <use :xlink:href="iconSvg"></use>
        </svg>
    </span>
</template>

<script>
export default {
    name: "tag",
    props: {
        type: String,
        size: String,
        closable: {
            //展示图标
            type: Boolean,
            default: false
        },
        iconSvg: {
            //图标类型
            type: String,
            default: "#icon-shanchu"
        }
    },
    data() {
        return {};
    },
    computed: {
        classType() {
            let tag = ["success", "info", "warning", "danger"];
            if (tag.includes(this.type)) {
                return "my-tag-" + this.type;
            } else {
                return this.type;
            }
        },
        classSize() {
            let tag = ["small", "mini"];
            if (tag.includes(this.size)) {
                return "my-tag-" + this.size;
            } else {
                return this.size;
            }
        }
    },
    methods: {
        handleClick(item, index) {
            this.$emit("click");
        },
        handleClose() {
            this.$emit("close");
        }
    }
};
</script>

<style lang='scss'>
.my-tag {
    display: inline-block;
    box-sizing: border-box;
    height: 32px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 12px;
    background-color: rgba(64, 158, 255, 0.1);
    color: #409eff;
    border-radius: 4px;
    border: 1px solid rgba(64, 158, 255, 0.2);
    .my-svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
        position: relative;
        top: 5px;
        right: -5px;
        cursor: pointer;
    }
    .my-svg:hover {
        background-color: currentColor;
        fill: #fff;
        border-radius: 50%;
    }
}
.my-tag-success {
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.2);
    color: #67c23a;
}
.my-tag-info {
    background-color: rgba(144, 147, 153, 0.1);
    border-color: rgba(144, 147, 153, 0.2);
    color: #909399;
}
.my-tag-warning {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    color: #e6a23c;
}
.my-tag-danger {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.2);
    color: #f56c6c;
}
.my-tag-small {
    height: 28px;
    line-height: 26px;
    .my-svg {
        transform: scale(0.8);
    }
}
.my-tag-mini {
    height: 24px;
    line-height: 22px;
    .my-svg {
        transform: scale(0.8);
    }
}
</style>
