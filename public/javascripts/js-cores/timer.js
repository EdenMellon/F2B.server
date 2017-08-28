$(function() {
    timer.fDisplayTime();
});

var timer = {
    timer: this,
    intervalSec: 1,
    localTimeSync: true,
    serverTimeSync: true,
    format: 'YYYY년 MM월 DD일 HH시 mm분 ss초',
    syncTime: null,
    fDisplayTime: function() {
        setInterval(function() {
            timer.fSyncTime(function(error, result) {
                if(error) {
                    timer.serverTimeSync = false;
                }

                timer.syncTime = result.time;
                timer.format = result.format;

                $('.display-time').text(moment(timer.syncTime).format(timer.format));
            });
        }, timer.intervalSec * 1000);

    },
    fSyncTime: function(callback) {
        // 서버시간과 동기화
        if (timer.serverTimeSync) {
            var callbackResult = null;
            var callbackError = null;
            common.ajaxCall('GET', '/time', {}
                , function success(result) {
                    timer.serverTimeSync = false;
                    callbackResult = result.data;
                    console.log("server 시간:", callbackResult.time);
                }, function fail(error) {
                    callbackError = error;
                }, function always() {
                    callback(callbackError, callbackResult);
                });
        } else {
            var thisTime = timer.syncTime;
            if(thisTime == null) {
                thisTime = moment().format('YYYY-MM-DD HH:mm:ss');
            }
            if(moment(thisTime).format('ss') % 59 == 0) {
                // 60초마다 서버와 싱크 맞춤.
                timer.serverTimeSync = true;
            }

            var result = {
                time: moment(thisTime).add(timer.intervalSec, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
                format: timer.format

            };
            callback(null, result);
        }
    }
};