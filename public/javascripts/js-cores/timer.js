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
        if(timer.syncTime == null) {
            timer.syncTime = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        if (moment(timer.syncTime).format('ss') % 60 == 0) {
            // 60초마다 서버와 싱크 맞춤.
            timer.serverTimeSync = true;
        } else {
            timer.serverTimeSync = false;
        }
        if (timer.serverTimeSync) {
            var callbackResult = null;
            var callbackError = null;
            common.ajaxCall('GET', '/time', {}
                , function success(result) {
                    timer.serverTimeSync = false;
                    callbackResult = result.data;
                    console.log("server 시간:", callbackResult.time);
                    
                    callback(callbackError, callbackResult);
                }, function fail(error) {
                    return timer.fLocalSyncTime(callback);
                });
        } else {
            timer.fLocalSyncTime(callback);
        }
    },
    fLocalSyncTime: function(callback) {
        var result = {
            time: moment(timer.syncTime).add(timer.intervalSec, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
            format: timer.format

        };
        callback(null, result);
    }
};