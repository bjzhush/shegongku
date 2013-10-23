<!DOCTYPE html>
<!--STATUS OK-->
<html>
    <head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>ShegongKu</title>
    <link href="./css/style.css" rel="stylesheet" type="text/css"/>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/messenger.css" rel="stylesheet">
    <link href="./css/messenger-theme-future.css" rel="stylesheet">
    <script type="text/javascript" src="./js/jquery.js"></script>
    <script type="text/javascript" src="./js/she.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/messenger.min.js"></script>
    <script src="./js/json2Table.js"></script>
    </head>
<body>
<input type="hidden" id="jsDb">

<div id ="main" class="container-fluid">
    <div class="row-fluid">

        <div class="span12">
            <div>
                <h2>
                    <div align="center">

              
                    <em>
                        <button class="btn btn-primary btn-large" id="tips">?</button>
                        <button class="btn btn-info btn-large" id="history">H</button>
                        <select id='searchMode' class="selectpicker">
                            <option value='SPH_MATCH_FULLSCAN'>完整扫描</option>
                            <option value='SPH_MATCH_EXTENDED2'>扩展匹配模式(V2)</option>
                            <option value='SPH_MATCH_BOOLEAN'>布尔查询</option>
                            <option value='SPH_MATCH_PHRASE'>短语匹配</option>
                            <option value='SPH_MATCH_ANY'>任意查询词</option>
                            <option value='SPH_MATCH_ALL'>所有查询词</option>
                        </select>
                        <input id="keyword" class="input-medium search-query" type="text" />
                        <input type="submit" class="btn btn-success btn-large active" id="she" value="搜"/>
                        <input type="submit" class="btn btn-warning btn-large" id="she16" value="MD5^16"/>
                        <input type="submit" class="btn btn-danger btn-large" id="she32" value="MD5^32"/>
                    </em>
                    <p id="info"></p>
                    </div>
                </h2>
                <div id="tipsInfo" class="hero-unit" contenteditable="true">
                  <h3>使用说明</h3>
                  <p>1. 共有6种匹配模式,具体可以参见CoreSeek手册(V4.1)</p>
                  <p>2. 目前暂时显示搜索结果的前1000条</p>
                </div>
            </div>
            <span id="hisData"></span>
            <div id='resbox'>
            </div>



        </div>
    </div>
</div>
</body>
</html>
