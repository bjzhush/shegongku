$().ready(function(){
    $('#keyword').focus();

    function sendQuery(){
        alert('she!');
    }
    /**
     *  点击she后触发,搜索ajax
     */
    $('#she').click(function(){
        sendQuery();
    })

    $(document).keydown(function(e){
        var key =  e.which;
        /**
         *  send query when input is not empty
         */
        if(key == 13){
            if ($('#keyword').val().length == 0) {
                $('#keyword').focus();
            } else {
                if($('#keyword').is(":focus")){
                    if ($('#lastKwd').data('val') == $('#keyword').val()) {
                        $._messengerDefaults = {
                            extraClasses: 'messenger-fixed messenger-theme-future messenger-on-top'
                        }
                        $.globalMessenger().post("saved successfully !");
                    } else {
                        sendQuery();
                        $('#lastKwd').data('val',$('#keyword').val());
                    }
                } else {
                    $('#keyword').focus();
                }
            }
            console.log($('#keyword').val().length);
        } else if (key == 73) {
        }
	});

});
