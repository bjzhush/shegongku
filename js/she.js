$().ready(function(){
    $('#keyword').focus();
    $('#jsDb').data('itemPrePage', 20);

    function myAlert(message)
    {
        $._messengerDefaults = {
            extraClasses: 'messenger-fixed messenger-theme-ice messenger-on-bottom'
        }
        $.globalMessenger().post(message);
    }

    function sendQuery(limit, useMd5){
        $.ajax({
            url : './ajax.php',
            type : 'post',
            dataType: "json",
            data : {'mode':$('#searchMode').val(), 'keyword':$('#keyword').val(), 'limit': limit, 'useMd5': useMd5},// use json here
            success : function(data){
                if (data.status == 'error') {
                    /**
                     *  show error tips from server
                     */
                    myAlert(data.data);
                } else {
                    /**
                     *  show the result
                     */
                    var rows = data.data.rows;
var tableHeader = ' <table id="resultTable" class="table"> <thead> <tr> <th> 来源 </th> <th> 用户名 </th> <th> 密码 </th> <th> 邮箱 </th> <th> 真名 </th> <th> 手机 </th> <th> 固话 </th> <th> 身份证 </th> <th> QQ </th> <th> 其它 </th> </tr> </thead> <tbody>';
                    var count = 0;
                    $.each(rows,function(index, item){
                        if (count%2 == 0) {
                            tableHeader += '<tr>';
                        } else {
                            tableHeader += '<tr class="success">';
                        }
                        count++;
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
                    $('#info').html('Sphinx: <font color="#ff0000">' + data.data.sphinxCost + '</font> S!' + ' Mysql :<font color="#ff0000">' + data.data.mysqlCost + ' </font>S!' + ' Total : <font color="#ff0000">' + data.data.totalCost + ' </font>S! TotalFound <font color="#04b431">'+data.data.resultCount +'</font>, Now start at No. <font color="#04b431">' + data.data.currentLimit + "</font>");
                    $('#jsDb').data('resultCount', data.data.resultCount);
                    $('#jsDb').data('nowLimit', data.data.currentLimit);
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
                    sendQuery('0', 0);
                    $('#jsDb').data('nowLimit', 0);
                    $('#jsDb').data('useMd5', 0);
                    $('#keyword').blur();
            } else {
                $('#keyword').focus();
            }
        }
    }
    /**
     *  send query and update local storage 
     */
    $('#she').click(function(){
        sendQuery('0', '0');
        $('#jsDb').data('nowLimit', 0);
        $('#jsDb').data('useMd5', 0);
    })
    $('#she16').click(function(){
        sendQuery('0', '16');
        $('#jsDb').data('nowLimit', 0);
        $('#jsDb').data('useMd5', 16);
    })
    $('#she32').click(function(){
        sendQuery('0', '32');
        $('#jsDb').data('nowLimit', 0);
        $('#jsDb').data('useMd5', 32);
    })

    $(document).keydown(function(e){
        var key =  e.which;
        /**
         *  send query when input is not empty
         */
        if(key == 13){
            processInput();
        /**
         *  Left button
         */
        } else if (key == 37) {
            if ($('#keyword').is(':focus')) {
            //should do nothing here
            } else {
                if ($('#jsDb').data('nowLimit') < $('#jsDb').data('itemPrePage')) {
                //now is first page do nothig
                } else {
                    var newLimit = $('#jsDb').data('nowLimit') - $('#jsDb').data('itemPrePage');
                    sendQuery(newLimit, $('#jsDb').data('useMd5'));
                }
            // page Up
            }
        /**
         *  Right button
         */
        } else if (key == 39) {
            if ($('#keyword').is(':focus')) {
            //should do nothing here
            } else {
            // page Down action
                    if ($('#jsDb').data('nowLimit') + $('#jsDb').data('itemPrePage') > $('#jsDb').data('resultCount')) {
                    // now is last page, do nothing
                    } else {
                        var newLimit = $('#jsDb').data('nowLimit') + $('#jsDb').data('itemPrePage');
                        sendQuery(newLimit, $('#jsDb').data('useMd5'));
                    }
            }
        }
	});

});
