$(document).ready(function() {
    //--> 구글 맞춤 검색용
    var cx = '016454467786616656749:vax7bhci9ma';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
    //--> 구글 맞춤 검색용

    $.each($('#searchSelector').find('a'), function(){
        $(this).click(function(e) {
            e.preventDefault();
            $(this).parent().prev().text($(this).text());
            common.ajaxCall('GET', $(this).attr('href'), {partials: $(this).attr('href')}
                , function success(result) {
                    $('#searchLayout').html(result);
                }, function fail(error) {
                    // [common.js] server message 를 받아서 뿌려줌.
                }, function always(){
                });
        });
    });

    $.each($('#alSelector').find('a'), function(){
        $(this).click(function(e) {
            e.preventDefault();
            $(this).parent().prev().text($(this).text());
            $('#alSelector a').removeClass('isSelect');
            $(this).addClass('isSelect');
        });
    });

    $('form[name=pwdForm]').submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        var type = ($form.attr('method') || 'GET').toUpperCase();
        common.ajaxCall(type, $form.attr('action'), $form
            , function success(result) {
                showSuccess('사용가능한 패스워드입니다.');
            }, function fail(error) {
                // [common.js] server message 를 받아서 뿌려줌.
            }, function always(){
                $form[0].reset();
            });
    });

    $('#collapseExample').collapse('hide');

    $('form[name=alForm]').submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        var type = ($form.attr('method') || 'GET').toUpperCase();

        var params = [$form.serialize(), 'eCode=' + $('#alSelector').find('.isSelect').data('eventname')].join('&');
        common.ajaxCall(type, $form.attr('action'), params
            , function success(result) {
                var printStr = 'event: ' + result.data.eCode + '<br />';
                printStr += 'result: ' + result.data.response.join(' ')
                $('#alLayout').html(printStr);
                $('#collapseExample').collapse('show');
            }, function fail(error) {
                // [common.js] server message 를 받아서 뿌려줌.
            }, function always(){
                $form[0].reset();
            });
    });
});