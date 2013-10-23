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
 * getMTime 
 * 获取当前时间(含毫秒)
 * @access public
 * @return void
 */
function getMTime()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
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
if (!isset($_POST['mode']) || !isset($_POST['keyword']) || !isset($_POST['useMd5'])) {
    response('error','bad Data Posted');
}
if (!in_array($_POST['useMd5'], array(0,16,32))) {
    response('error','post field useMd5 should be one of 0, 16, 32');
}

switch ($_POST['useMd5'])
{
    case 0:
        $keyToSearch = $_POST['keyword'];
        break;
    case 16:
        $keyToSearch = substr(md5($_POST['keyword']), 8, 16);
        break;
    case 32:
        $keyToSearch = md5($_POST['keyword']);
        break;
}

if (isset($_POST['limit'])) {
    $searchLimit = (int) $_POST['limit'];
} else {
    $searchLimit = 0;
}

/**
 *  由于sphinx配置等原因,目前暂时只展示前1000个
 */
if ($searchLimit >979) {
    response('error','由于sphinx原因,目前暂时只展示前1000个,你可以换一下关键词!');
}

require('./sphinxapi.php');

$t_start = getMTime();
$cl= new SphinxClient();
$cl->SetServer('localhost', 9312);
$cl->SetArrayResult(true);                                  //设置 显示结果集方式
$cl->SetLimits($searchLimit, 20);                            //同sql语句中的LIMIT
$cl->SetMatchMode($_POST['mode']);


$result=$cl->Query($keyToSearch, "*");                 //执行搜索
$t_aftSphinx = getMTime();
if ($result !== FALSE) {
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

        $keyArr = explode(' ', $keyToSearch);

        /**
         *  从mysql取出对应的记录         
         */
        foreach ($result['matches'] as $k => $v) {
            $tableId = getTableNameById($k);
            $sql = 'select * from data_'.$tableId.' where id = '.$k;
            $res = mysql_query($sql);
            while ($row = mysql_fetch_array($res, MYSQL_NUM)) {
                foreach ($row as $kb => $vb) {
                    $row[$kb] = str_ireplace($keyToSearch, "<font color='#ff0000'>".$keyToSearch.'</font>', $vb);
                    if (count($keyArr) > 1) {
                        foreach ($keyArr as $kc => $vc) {
                            $row[$kb] = str_ireplace($vc, "<font color='#bf0060'>".$vc.'</font>', $vb);
                        }
                    }
                }
                $data['rows'][$k] = $row;
            }
        }
        mysql_close($con);
        /**
         *  统计时间
         */
        $t_aftMysql = getMTime();
        $data['sphinxCost'] = number_format($t_aftSphinx - $t_start, 4, '.', '');
        $data['mysqlCost']  = number_format($t_aftMysql  - $t_aftSphinx, 4, '.', '');
        $data['totalCost']  = number_format($t_aftMysql  - $t_start, 4, '.', '');
        response('success', $data);
    }
} else {
    response('error',$cl->GetLastError());
}
