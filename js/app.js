/**
 * app.js This file contains routing, configuration as well as pages specific code.
 * 
 * @project Backbone.js
 * @date 2013-10-05 (YYYY-MM-DD)
 * @author Gurpreet Singh, gSingh.in <gurupreetsingh2000@gmail.com>
 * @licensor Open Source
 * @dependency lib/jquery-1.10.2.min.js, lib/backbone-min.js, lib/underscore-min.js
 * 
 */
var CONFIG = {
    data: {
        title: {'':'', 'mr':'Mr', 'mrs':'Mrs', 'ms':'Ms', 'miss':'Miss', 'dr':'Dr'},
        packages: {'standard':'Standard', 'protective':'Protective', 'gift-wrap':'Gift Wrap'},
        paymentOptions: {'credit-card':'Credit Card', 'cash-on-delivery':'Cash On Delivery'},
        cardTypes: {'':'', 'visa':'Visa', 'master':'Master', 'amex':'Amex', 'discover':'Discover'}
    },
    errorMsgs : {
        requiredText: "Please enter a value",
        requiredSelect: "Please select a value",
        validEmail: "Please enter a valid email address"
    },
    webService: {
        baseURL: 'http://rest.loc/',
        username: 'frank', 
        password: 'apassword'
    },
    version: '1.0',
    author: 'Gurpreet Singh <gurupreetsingh2000@gmail.com>'
};
(function($){
    $.fn.serializeObject = function(){
        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };
        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };
        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };
        $.each($(this).serializeArray(), function(){
            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }
            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;
            while((k = keys.pop()) !== undefined){
                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }
                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }
                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }
            json = $.extend(true, json, merge);
        });
        return json;
    };
})(jQuery);
var AppRouter = Backbone.Router.extend({
    /* route the pages according to URL change */
    routes: {
        "": "contactDetails",
        "page/delivery-details": "deliveryDetails",
        "page/payment-details": "paymentDetails",
        "page/result": "resultPage"
    },
    initialize: function(){
        return orderFormView = new OrderFormView({
            heading: "Contact Details",
            model: orderFormModel, 
            title: "Backbone Project | Contact Details"
        });
    },
    contactDetails: function(){
        $('.nav li').removeClass('active');
        $('.nav li a[href$="#"]').parent('li').addClass('active');
        $("#app>#delivery-form").html(orderFormView.contact().el);
    },
    deliveryDetails: function(){
        $('.nav li').removeClass('active');
        $('.nav li a[href$="delivery-details"]').parent('li').addClass('active');
        var orderFormView = new OrderFormView({
            heading: "Delivery Details", 
            model: orderFormModel, 
            title: "Backbone Project | Delivery Details"
        });
        $("#app>#delivery-form").html(orderFormView.delevery().el);
    },
    paymentDetails: function(){
        $('.nav li').removeClass('active');
        $('.nav li a[href$="payment-details"]').parent('li').addClass('active');
        var orderFormView = new OrderFormView({
            heading: "Payment Details", 
            model: orderFormModel, 
            title: "Backbone Project | Payment Details"
        });
        $("#app>#delivery-form").html(orderFormView.payment().el);
    },
    resultPage: function(){
        orderFormModel.save('save-user');
    }
});

function validateDeliveryForm(thisObj, router){
    var isError = false;
    $(thisObj).find('input.required').each(function(){
        $(this).parents('div.control-group').removeClass('error');
        $(this).next('span').remove();
        if($.trim($(this).val()) == "" && $(this).is(":visible")){
            $(this).parents('div.control-group').addClass('error');
            $(this).after('<span class="help-inline">'+CONFIG.errorMsgs.requiredText+'</span>');
            isError = true;
        }
    });
    $(thisObj).find('select.required').each(function(){
        if($.trim($(this).val()) == "" && $(this).is(":visible")){
            $(this).parents('div.control-group').addClass('error');
            $(this).next('span').remove();
            $(this).after('<span class="help-inline">'+CONFIG.errorMsgs.requiredSelect+'</span>');
            isError = true;
        }
    });
    if(isError === false){
        orderFormModel.adopt(thisObj.serializeObject());
        window.location.hash = router;
    }
}
var app = new AppRouter();
$(function(){
    $(document).delegate('.doSubmit', 'click', function(e){
        e.preventDefault();
        validateDeliveryForm($(this).parents('form'), $(this).attr('href'));
    });
    $(document).delegate('.paymentOption', 'click', function(e){
        if($(this).val() == 'credit-card'){
            $('.cc-fields').show("slow");
        }else{
            $('.cc-fields').hide("slow");
        }
    });
    /* App Initializer */
    Backbone.history.start();
});