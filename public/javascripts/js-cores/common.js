$(function() {
    common.init();
});

common = {
    common: this,
    init: function() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    },
    showToast: function(type, title, message, callback) {
        toastr[type](message, title);
        if(callback) {
            callback();
        }
    },
    alert: function(message, callback) {
        bootbox.alert(message, callback);
    },
    confirm: function(message, callback) {
        bootbox.confirm(message, callback);
    },
    prompt: function(message, callback) {
        bootbox.prompt(message, callback);
    },
    ajaxCall: function(method, action, params, success, fail, always) {
        if(isNotPointer(params)) {
            params = {};
        }
        if(!isString(params)) {
            params = $(params).is('form') ? params.serialize() : params;
        }

        if( !isFunction(success) || (!isFunction(fail)) ) {
            showError('Method params이 올바르지 않습니다.', function() {
                return false;
            });
        }

        return $.ajax({
            type: method.toUpperCase(),
            url: action,
            data: params,
            async: false,
            success: function (res) {
                var data = res;
                if(success){
                    success(data);
                }
            }
        }).fail(function (error) {
            console.log(error);
            var message = '통신에 장애가 발생하였습니다.'; // FIXME:
            if( error && error.responseJSON && error.responseJSON.message ) {
                message = error.responseJSON.message;
            }
            showError(message, fail);
        }).always(function () {
            if( always ){
                always();
            }
        });
    }
};

// 0인지 체크
var isZero = function(i) {
    if(i == 0) {
        return true;
    }
    return false;
};

// 빈공간인지 체크 (빈문자열 포함)
var isEmpty = function(str){
    if(isNotPointer(str) || str == '') {
        return true;
    }
    return false;
};

// 빈공간인지 체크 (빈문자열 비포함)
var isNotPointer = function(str){
    if(str == undefined || str == null) {
        return true;
    }
    return false;
};

// type check : 문자열
var isString = function(str){
    if( str && typeof str == 'string') {
        return true;
    }
    return false;
};

// type check : function
var isFunction = function(func){
    if( func && typeof func == 'function') {
        return true;
    }
    return false;
};

var showInfo = function(message, callback) {
    return common.showToast('info', 'Information', message, callback);
};

var showWarn = function(message, callback) {
    return common.showToast('warning', 'Warning', message, callback);
};

var showError = function(message, callback) {
    return common.showToast('error', 'Error', message, callback);
};

var showSuccess = function(message, callback) {
    return common.showToast('success', 'Success', message, callback);
};

var alert = function(message, callback) {
    common.alert(message, callback);
};

var confirm = function(message, callback) {
    common.confirm(message, callback);
};

var prompt = function(message, callback) {
    common.prompt(message, callback);
};