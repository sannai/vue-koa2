var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// 定义学生模式
var StudentSchema = new mongoose.Schema({
    name: String,
    clazzID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Clazz' // clazz的Model名
    }
});
// 连表查询方法
    


// 定义班级模式
var ClazzSchema = new mongoose.Schema({
    clazzName: String
});

// 模型
var Student = mongoose.model('Student', StudentSchema);
var Clazz = mongoose.model('Clazz', ClazzSchema);

// Student.findOne({_id: '5c39ae8c9eb10ba088a8762a'}).populate('clazzID') // 关联查询
//     .exec((err, status) => {
//         console.log(status.name + " 在的班级: "+status.clazzID.clazzName);
//     });
var clazz = new Clazz(
    {
        clazzName: '体育4班'
    }
);


clazz.save().then((res) => {
    var student = new Student({
        name: '名是带',
        clazzID: res._id //体育3班的_id
    });
    student.save(function (err){
        console.log('true');
    });
    console.log('sss',res,66);
});

// Student.findClazzNameByStudentId('5c39ae8c9eb10ba088a8762a', function (err, student) {
//     if (err) console.log(err);
//     console.log(student.name + " 在的班级: "+student.clazzID.clazzName);
//     /*通过studentID查询到对应的学生对象，并通过关联属性clazzID获取到对应classID的班级对象，
//      通过对象的clazzName属性返回班级名称*/
// });

// var logger = require('morgan');
// if('development' === app.get('env')){
//     app.set('showStackError', true); // 输出报错信息
//     app.use(logger(':method :url :status')); // 输出信息领域
//     app.locals.pretty = true; // 源代码格式化
//     mongoose.set('debug', true); // 数据库报错信息
// }