/**
 * OrderFormModel.js This file contains all pages model code.
 * 
 * @project Backbone.js
 * @date 2013-10-05 (YYYY-MM-DD)
 * @author Gurpreet Singh, gSingh.in <gurupreetsingh2000@gmail.com>
 * @licensor Open Source
 * @dependency lib/jquery-1.10.2.min.js, lib/backbone-min.js, lib/underscore-min.js, app.js
 * 
 */
var OrderFormModel = Backbone.Model.extend({
    defaults: {
        title: '', 
        name: '', 
        contactNumber: '', 
        email: '', 
        deliveryAddress: '', 
        deliveryDate: '',
        packaging: '', 
        paymentOption: '', 
        cardName: '', 
        cardNumber: '', 
        cardType: '', 
        expiry: ''
    },
    adopt: function(newData){
        this.set(newData);
    },
    save: function(serviceName){
        if(serviceName == 'save-user'){
            $.ajax({
                url: CONFIG.webService.baseURL+'?service_name='+serviceName,
                type: 'post', 
                data: {data : { title: this.get("title"), name: this.get("name"), contact_number: this.get("contactNumber"), email: this.get("email")}}, 
                dataType: 'jsonp', 
                jsonp: 'callback', 
                jsonpCallback: 'tempCallBack', 
                username: CONFIG.webService.username, 
                password: CONFIG.webService.password
            });
        }
    },
    saveCallback: function(data){
        if(data.responseCode == 200 && data.responseMessage == 'OK'){
            var orderFormView = new OrderFormView({
                heading: "Payment Successful", 
                message: "Thanks, Your request has been processed successfully.", 
                title: "Backbone Project | Payment Successful"
            });
        }else{
             var orderFormView = new OrderFormView({
                heading: "Payment Fail", 
                message: "Sorry, Some problem occured while processing your request.", 
                title: "Backbone Project | Payment Fail"
            });
        }
        $("#app>#delivery-form").html(orderFormView.result().el);
        this.unset(this.defaults)
    }
});
var orderFormModel = new OrderFormModel();
function tempCallBack(data){
    orderFormModel.saveCallback(data);
}