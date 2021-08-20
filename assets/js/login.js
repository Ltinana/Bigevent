$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $('#link_login').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide();
        })
        // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！');
                $('#link_login').click();
            })

            // $('#form_login').submit(function(e) {
            //     e.preventDefault();
            //     $.ajax({
            //         url: 'http://api-breakingnews-web.itheima.net/api/login',
            //         method: 'POST',
            //         data: $(this).serialize(),
            //         success: function(res) {
            //             if (res.status !== 0) {
            //                 return layer.msg('登录失败！')
            //             }
            //             layer.msg('登录成功！')
            //             localStorage.setItem('token', res.token);
            //             location.href = '/index.html'
            //         }
            //     })
            // })

        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})