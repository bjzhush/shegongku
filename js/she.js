$().ready(function(){
    $('#keyword').focus();
    $('#tipsInfo').hide();
    $('#jsDb').data('itemPrePage', 20);

    function easterEgg(randomTime) 
    {
            var id = Math.floor(Math.random()*randomTime+1); 
            if (id == 3){
                $('body').css("background-image", "url(./back.jpg)");  
                $('#main').hide();
            } else  {
                $('body').css("background-image", "url('')");  
                $('#main').show();
            }
    }

    function stuffHistory()
    {
        var keyHistory = localStorage.getItem('history');
        var arrHis = $.parseJSON(keyHistory);
        if  (arrHis !== null) {
            var str = '';
            var count = 0;
            $.each(arrHis.reverse(),function(key,item){
                if (count%5 == 0) {
                    str +=  item + '<br>';
                } else {
                    str +=  item ;
                }
                count++;
            });
            $('#hisData').html(str);
        }
    }

    function getStamp() {
        var d = new Date();
        var mm = d.getMilliseconds(), hh = d.getHours(),
            MM = d.getMinutes(), ss = d.getSeconds();
        return  d.getDate() +'日 ' + (hh < 10 ? "0" : "") + hh + (MM < 10 ? ":0" : ":") + MM + (ss < 10 ? ":0" : ":") + ss ;
    };

    function myAlert(message)
    {
        $._messengerDefaults = {
            extraClasses: 'messenger-fixed messenger-theme-ice messenger-on-bottom'
        }
        $.globalMessenger().post(message);
    }

    function sendQuery(limit, useMd5){
        if ($('#keyword').val().length == 0) {
            return;
        }
       // record query history via html5 localStorage
       if (limit == 0) {
           var jsonFromStorage = localStorage.getItem('history');
            if (jsonFromStorage == undefined ) {
                keyHistory = [];
            } else {
                keyHistory = $.parseJSON(jsonFromStorage);
            }
            if (keyHistory.length >20) {
                keyHistory.shift();
            }

            keyHistory.push('<font color="#f00078">' + $('#keyword').val() + '</font> | ' + getStamp());
            var jsonStr = JSON.stringify(keyHistory);
            localStorage.setItem('history', jsonStr); 
       }

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
                    $('#resultTable').remove();
                    myAlert(data.data);
                } else {
                    /**
                     *  show the result
                     */
                    var rows = data.data.rows;
var tableHeader = ' <table id="resultTable" class="table"> <thead> <tr><th>Id</th> <th> 来源 </th> <th> 用户名 </th> <th> 密码 </th> <th> 邮箱 </th> <th> 真名 </th> <th> 手机 </th> <th> 固话 </th> <th> 身份证 </th> <th> QQ </th> <th> 其它 </th> </tr> </thead> <tbody>';
                    var count = 0;
                    $.each(rows,function(index, item){
                        if (count%2 == 0) {
                            tableHeader += '<tr>';
                        } else {
                            tableHeader += '<tr class="success">';
                        }
                        count++;
                        tableHeader += '<td><font color="#BEBEBE">' + item[0] + '</font></td>';
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
                    $('#resbox').hide();
                    $('#resbox').html(tableHeader);
                    $('#resbox').fadeIn("slow");
                    $('#info').hide();
                    $('#info').html('Sphinx: <font color="#ff0000">' + data.data.sphinxCost + '</font> S!' + ' Mysql :<font color="#ff0000">' + data.data.mysqlCost + ' </font>S!' + ' Total : <font color="#ff0000">' + data.data.totalCost + ' </font>S! TotalFound <font color="#04b431">'+data.data.resultCount +'</font>, Now start at No. <font color="#04b431">' + data.data.currentLimit + "</font>");
                    $('#info').fadeIn("normal");
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
            easterEgg(10000);
            processInput();
        /**
         *  Left button
         */
        } else if (key == 37) {
            easterEgg(10000);
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
            easterEgg(10000);
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
        /**
         *  cursor down 
         */
        } else if (key == 38) {
            if ($('#keyword').is(':focus')) {
                //should do nothing here
            } else {
                // toggle history
                easterEgg(10000);
                stuffHistory();
                $('#hisData').toggle();
            }
        /**
         *  彩蛋... 随机显示和隐藏***图片
         */
        } else if (key == 40) {
            easterEgg(10);
        }
	});

    $('#history').mouseover(function(){
        stuffHistory();
        $('#hisData').show();
    });

    $('#history').mouseout(function(){
        stuffHistory();
        $('#hisData').hide();
    });

    $('#tips').mouseover(function(){
        $('#tipsInfo').show();
    });

    $('#tips').mouseout(function(){
        $('#tipsInfo').hide();
    });
});
