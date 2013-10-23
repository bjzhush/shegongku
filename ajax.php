<?php
/**
 * response 
 * 返回json格式的数据,本页面所有返回都走这个函数 
 */
function response($status, $data)
{
    echo json_encode(array(
                'status' => $status,
                'data'   => $data,
                ));
    exit;
}

/**
 * getTableNameById 
 * 由于做了分表,这里需要根据sphinx返回的id计算出数据处于哪个表里
 */
function getTableNameById($rowId)
{
    return floor($rowId/10000000)+1;
}

/**
 *  判断提交数据合法性
 */
if (!isset($_POST['mode']) || !isset($_POST['keyword'])) {
    response('error','bad Data Posted');
}
if (isset($_POST['limit'])) {
    $searchLimit = (int) $_POST['limit'];
} else {
    $searchLimit = 0;
}

require('./sphinxapi.php');

$cl= new SphinxClient();
$cl->SetServer('localhost', 9312);
$cl->SetArrayResult(true);                                  //设置 显示结果集方式
$cl->SetLimits($searchLimit,10);                            //同sql语句中的LIMIT
$cl->SetMatchMode($_POST['mode']);

$result=$cl->Query($_POST['keyword'], "*");                 //执行搜索
if ($result !== FALSE) {
//    print_r($result);                      //输出
    /**
     *  没有搜到结果
     */
    if ($result['total_found'] == 0) {
        response('error','没有找到结果!');
    } else {
        // 返回结果
        $data = array(
                'resultCount' => $result['total_found'],
                'rows'        => $result['matches'],
                'currentLimit'=> $searchLimit,
                );

        /**
         *  连接 mysql
         */
        $con = mysql_connect('localhost', 'root', 'i');
        mysql_select_db('shegong');
        mysql_set_charset('utf8',$con);

        foreach ($result['matches'] as $k => $v) {
            $tableId = getTableNameById($k);
            $sql = 'select * from data_'.$tableId.' where id = '.$k;
            $res = mysql_query($sql);
            while ($row = mysql_fetch_array($res, MYSQL_NUM)) {
                $data['rows'][$k] = $row;
            }
        }
        mysql_close($con);
        response('success', $data);
    }
} else {
    response('error',$cl->GetLastError());
}
