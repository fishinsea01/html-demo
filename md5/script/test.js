$(document).ready(function() {
    //727EE1D14AB274A0E050A8C0EBC85194
    //live1234
    //请求明文加密
    $("#qencode").click(function() {
        var appKey = $("#appkey").val();
        var key = $("#key").val();
        if (appKey && key) {
            var str = $("#qe").val();
            if (str) {
                var qd = encryptData(appKey, key, str);
                $("#qd").val(qd);
            } else {
                alert("请求明文不能为空");
            }
        } else {
            alert("appkey和key不能为空");
        }
    });
    //请求密文解密
    $("#qdecode").click(function() {
        var key = $("#key").val();
        if (key) {
            var str = $("#qd").val();
            if (str) {
                var qe = decryptData($("#key").val(), str);
                $("#qe").val(qe);
            }
        } else {
            alert("key不能为空");
        }
    });
    //发送请求
    $("#request").click(function() {
        var requestData = $("#qd").val();
        if (!requestData) {
            alert("请求密文不能为空");
            return;
        }
        $.ajax({
            url: $("#url").val(),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: $("#qd").val(),
            success: function(data) {
                data = decryptData($("#key").val(), data);
                $("#pe").val(data).change();

            },
            error: function(xmlHttpRequest) {
                console.log(xmlHttpRequest);
            }
        })
    });
    $("#qe,#pe").change(function() {
        var str = $(this).val();
        if (isJSON(str)) {
            //调用formatJson函数,将json格式进行格式化
            var resultJson = formatJson(str);
            $(this).val(resultJson);
        }
    });

    function isJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }

            } catch (e) {
                console.log('error：' + str + '!!!' + e);
                return false;
            }
        }
        console.log('It is not a string!')
    }
});