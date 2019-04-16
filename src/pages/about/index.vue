<template>
    <!-- 关于我 -->
    <main class="about">
        <h3>个人介绍</h3>
        <div class="box">
            <img src="../../images/With-love-for-life.jpg">
            <ul class="introduction">
                <li v-for="item in introduction" :key="item.id" class="item-wrap">
                    <h4>{{item.name}}</h4>
                    <h5>{{item.introduction}}</h5>
                    <p>{{item.introductionContent}}</p>
                    <h5 class="work">{{item.work}}</h5>
                    <div v-for="t in item.workList" :key="t.id" class="work-wrap">
                        <p @click="handleClickWork(t)"><strong>{{t.book}}</strong></p>
                    </div>
                </li>
            </ul>
        </div>
        <el-dialog :title="bookContent.book" :visible.sync="isWork" width="50%">
            <div v-html="bookContent.content"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isWork = false">取 消</el-button>
                <el-button type="primary" @click="isWork = false">确 定</el-button>
            </span>
        </el-dialog>
    </main>
</template>

<script>
export default {
    data() {
        return {
            introduction: [
                {
                    name: "诸葛亮",
                    introduction: "生平",
                    introductionContent:
                        "诸葛亮（181年-234年10月8日），字孔明，号卧龙，徐州琅琊阳都（今山东临沂市沂南县）人 ，三国时期蜀国丞相，杰出的政治家、军事家、外交家、文学家、书法家、发明家。诸葛亮一生“鞠躬尽瘁、死而后已”，是中国传统文化中忠臣与智者的代表人物。",
                    work: "作品",
                    workList: [
                        {
                            book: "《出师表》",
                            id: 1,
                            content: `
                                <p>
                                先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
                                </p>
                                <p>
                                宫中府中，俱为一体，陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。
                                </p>
                                <p>
                                侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。
                                </p>
                                <p>
                                将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。
                                </p>
                                <p>
                                亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。
                                </p>
                                <p>
                                臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。
                                </p>
                                <p>
                                先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐托付不效，以伤先帝之明，故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。
                                </p>
                                <p>
                                愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言。深追先帝遗诏，臣不胜受恩感激。
                                </p>
                                <p>今当远离，临表涕零，不知所言。</p>`
                        },
                        {
                            book: "《诫子书》",
                            id: 2,
                            content: `<p>夫君子之行，静以修身，俭以养德。非淡泊无以明志，非宁静无以致远。夫学须静也，才须学也，非学无以广才，非志无以成学。淫慢则不能励精，险躁则不能治性。年与时驰，意与日去，遂成枯落，多不接世，悲守穷庐，将复何及！<p>`
                        }
                    ]
                },
                {
                    name: "孟子",
                    introduction: "生平",
                    introductionContent:
                        "孟子（约前372年—前289年），姬姓，孟氏，名轲，字号子舆，战国时期邹国（今山东济宁邹城）人。战国时期著名哲学家、思想家、政治家、教育家，儒家学派的代表人物之一，地位仅次于孔子，与孔子并称“孔孟”。宣扬“仁政”，最早提出“民贵君轻”的思想。",
                    work: "作品",
                    workList: [
                        {
                            book: "《生于忧患，死于安乐》",
                            id: 1,
                            content: `<p>舜发于畎亩之中，傅说举于版筑之间，胶鬲举于鱼盐之中，管夷吾举于士，孙叔敖举于海，百里奚举于市。</p><p>故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。</p><p>人恒过，然后能改；困于心，衡于虑，而后作；征于色，发于声，而后喻。入则无法家拂士，出则无敌国外患者，国恒亡。</p><p>然后知生于忧患而死于安乐也。</p>`
                        }
                    ]
                }
            ],
            bookContent: {},
            isWork: false
        };
    },
    methods: {
        handleClickWork(item) {
            this.isWork = true;
            this.bookContent = item;
        }
    }
};
</script>

<style  lang='scss'>
.about {
    min-height: calc(100vh);
    width: 1040px;
    margin: 20px auto;
    background-color: #fff;
    font-size: 14px;
    h3 {
        text-align: center;
        font-size: 18px;
        padding: 20px 0;
    }
    .box {
        padding: 0 20px;
        img {
            width: 100%;
        }
        .item-wrap {
            h4 {
                font-size: 16px;
                text-align: center;
                padding-top: 20px;
            }
            h5 {
                font-size: 14px;
            }
            p {
                text-indent: 2em;
            }
            .work {
                padding-top: 15px;
            }
            .work-wrap {
                text-decoration: underline;
                padding-top: 5px;
                strong {
                    cursor: pointer;
                }
            }
        }
    }
    .el-dialog {
        p {
            text-indent: 2em;
        }
    }
}
</style>
