exports.chat = (io) => {
    /*定义用户数组*/
    let users = [];
    io.on('connection', (socket) => {
        /*是否是新用户标识*/
        let isNewPerson = true;
        /*当前登录用户*/
        let username = null;
        socket.on('login', function (data) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === data.username) {
                    isNewPerson = false;
                    break;
                } else {
                    isNewPerson = true;
                }
            }
            if (isNewPerson) {
                username = data.username;
                users.push({
                    username: data.username
                });
                /*登录成功*/
                console.log(data,123);
                socket.emit('loginSuccess', data);
                /*向所有连接的客户端广播add事件*/
                io.sockets.emit('add', data);
            } else {
                /*登录失败*/
                socket.emit('loginFail', '');
            }
            console.log(data, 66, users);

        });
        socket.on('disconnect',function(){
            /*向所有连接的客户端广播leave事件*/
            io.sockets.emit('leave',username);
            users.map(function(val,index){
                if(val.username === username){
                    users.splice(index,1);
                }
            });
        });
        socket.on('sendMessage',function(data){
            console.log(data,45);
            io.sockets.emit('receiveMessage',data);
        });
    });
};