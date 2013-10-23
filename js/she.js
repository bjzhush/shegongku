$().ready(function(){
    $('#keyword').focus();
    function myAlert(message)
    {
        $._messengerDefaults = {
            extraClasses: 'messenger-fixed messenger-theme-ice messenger-on-bottom'
        }
        $.globalMessenger().post(message);
    }

    function sendQuery(){
        $.ajax({
            url : './ajax.php',
            type : 'post',
            dataType: "json",
            data : {'mode':$('#searchMode').val(), 'keyword':$('#keyword').val()},//这里使用json对象
            success : function(data){
                if (data.status == 'error') {
                    /**
                     *  提示出错信息
                     */
                    myAlert(data.data);
                } else {
                    /**
                     *  展示结果
                     */
                    var rows = data.data.rows;
var tableHeader = ' <table id="resultTable" class="table"> <thead> <tr> <th> 来源 </th> <th> 用户名 </th> <th> 密码 </th> <th> 邮箱 </th> <th> 真名 </th> <th> 手机 </th> <th> 固话 </th> <th> 身份证 </th> <th> QQ </th> <th> 其它 </th> </tr> </thead> <tbody>';
                    $.each(rows,function(index, item){
                        tableHeader += '<tr>';
                        tableHeader += '<td>' + item[1] + '</td>';
                        tableHeader += '<td>' + item[2] + '</td>';
                        tableHeader += '<td>' + item[3] + '</td>';
                        tableHeader += '<td>' + item[4] + '</td>';
                        tableHeader += '<td>' + item[5] + '</td>';
                        tableHeader += '<td>' + item[6] + '</td>';
                        tableHeader += '<td>' + item[7] + '</td>';
                        tableHeader += '<td>' + item[8] + '</td>';
                        tableHeader += '<td>' + item[9] + '</td>';
                        tableHeader += '<td>' + item[10] + '</td>';
                        tableHeader += '</tr>';
                    })
                    tableHeader += ' </tbody> </table>';
                    $('#resbox').html(tableHeader);
                }
            },
            fail:function(){
                    myAlert("What's wong....");
            }
        });
    }

    function processInput(){
        if ($('#keyword').val().length == 0) {
            $('#keyword').focus();
        } else {
            if($('#keyword').is(":focus")){
                if ($('#lastKwd').data('val') == $('#keyword').val()) {
                //关键词没有改变,不用做任何动作
                } else {
                    sendQuery();
                    $('#lastKwd').data('val',$('#keyword').val());
                }
            } else {
                $('#keyword').focus();
            }
        }
    }
    /**
     *  点击she后触发,搜索ajax
     */
    $('#she').click(function(){
        processInput();
    })

    $(document).keydown(function(e){
        var key =  e.which;
        /**
         *  send query when input is not empty
         */
        if(key == 13){
            processInput();
        } else if (key == 73) {
        }
	});

});
