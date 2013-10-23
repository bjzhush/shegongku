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

<div class="container-fluid">
    <div class="row-fluid">

        <div class="span12">
            <div>
                <h2>
                    <div align="center">
                    <p id="info" contenteditable="true"></p>
                    <em>
                        <span id="history" >H</span>
                        <select id='searchMode' class="selectpicker">
                            <option value='SPH_MATCH_EXTENDED2'>Extend</option>
                            <option value='SPH_MATCH_BOOLEAN'>Boolean</option>
                            <option value='SPH_MATCH_PHRASE'>短语匹配</option>
                            <option value='SPH_MATCH_ANY'>任意查询词</option>
                            <option value='SPH_MATCH_ALL'>所有查询词</option>
                        </select>
                        <input id="keyword" class="input-medium search-query" type="text" /><button id="she" class="btn" type="submit">查找</button>||<button id="she16" class="btn" type="submit">搜Md5(16)</button>||<button id="she32" class="btn" type="submit">搜Md5(32)</button>


                    </em>
                    </div>
                </h2>
            </div>
            <span id="hisData"></span>
            <div id='resbox'>
            </div>



        </div>
    </div>
</div>
</body>
</html>
