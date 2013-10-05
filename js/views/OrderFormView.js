/**
 * OrderFormView.js This file contains all views of order form.
 * 
 * @project Backbone.js
 * @date 2013-10-05 (YYYY-MM-DD)
 * @author Gurpreet Singh, gSingh.in <gurupreetsingh2000@gmail.com>
 * @licensor Open Source
 * @dependency lib/jquery-1.10.2.min.js, lib/backbone-min.js, lib/underscore-min.js, app.js
 * 
 */
var OrderFormView = Backbone.View.extend({
    contact: function(){
        $(document).attr('title', this.options.title);
        var markup, selected;
        markup = '<fieldset>' + 
        '<legend>' + this.options.heading + '</legend>' +
        '<div class="control-group">' + 
        '<label class="control-label" for="title">Title</label>' + 
        '<div class="controls">' + 
        '<select name="title" id="title" class="input-small">';
        for(var prop in CONFIG.data.title){
            selected = '';
            if(this.model.get("title") == prop){
                selected = 'selected="selected"';
            }
            markup += '<option value="'+prop+'" '+selected+'>'+CONFIG.data.title[prop]+'</option>';
        }
        markup += '</select>';
        markup += '</div></div>' + 
        '<div class="control-group">' + 
        '<label class="control-label" for="name">Name</label>' + 
        '<div class="controls">' + 
        '<input type="text" name="name" id="name" value="'+this.model.get("name")+'" class="input-medium required">' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<label class="control-label" for="contactNumber">Contact Number</label>' + 
        '<div class="controls">' + 
        '<input type="text" name="contactNumber" value="'+this.model.get("contactNumber")+'" id="contactNumber" class="input-medium required">' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<label class="control-label" for="email">Email Address</label>' + 
        '<div class="controls">' + 
        '<input type="text" name="email" id="email" value="'+this.model.get("email")+'" class="input-medium required">' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<div class="controls">' + 
        '<a href="#/page/delivery-details" class="btn btn-primary doSubmit">Next <i class="icon-white icon-chevron-right"></i></a>' + 
        '</div>' + 
        '</div>' + 
        '</fieldset>';
        this.$el.html(markup);
        return this;
    },
    delevery: function(){
        $(document).attr('title', this.options.title);
        var markup, selected;
        markup = '<fieldset>' + 
        '<legend>' + this.options.heading + '</legend>' +
        '<div class="control-group">' + 
        '<label class="control-label" for="deliveryAddress">Delivery Address</label>' + 
        '<div class="controls">' + 
        '<textarea name="deliveryAddress" id="deliveryAddress">'+this.model.get("deliveryAddress")+'</textarea>' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<label class="control-label" for="deliveryDate">Delivery Date</label>' + 
        '<div class="controls">' + 
        '<input type="text" name="deliveryDate" value="'+this.model.get("deliveryDate")+'" id="deliveryDate" class="input-medium">' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<label class="control-label">Packaging</label>' + 
        '<div class="controls">';
        for(var prop in CONFIG.data.packages){
            selected = '';
            if(this.model.get("packaging") == prop){
                selected = 'checked="checked"';
            }
            markup += '<label class="radio inline"><input type="radio" name="packaging" class="packaging" value="'+prop+'" '+selected+'>'+CONFIG.data.packages[prop]+'</label>';
        }
        markup += '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<div class="controls">' + 
        '<a href="#" class="btn btn-secondary"><i class="icon-black icon-chevron-left"></i> Back</a>&nbsp;<a href="#page/payment-details" class="btn btn-primary doSubmit">Next <i class="icon-white icon-chevron-right"></i></a>' + 
        '</div>' + 
        '</div>' + 
        '</fieldset>';
        this.$el.html(markup);
        return this;
    },
    payment: function(){
        $(document).attr('title', this.options.title);
        var markup, selected;
        markup = '<fieldset>' + 
        '<legend>' + this.options.heading + '</legend>' +
        '<div class="control-group">' + 
        '<label class="control-label">Payment Option</label>' + 
        '<div class="controls">';
        for(var prop in CONFIG.data.paymentOptions){
            selected = '';
            if(this.model.get("paymentOption") == prop){
                selected = 'checked="checked"';
            }
            markup += '<label class="radio inline"><input type="radio" name="paymentOption" class="paymentOption" value="'+prop+'" '+selected+'>'+CONFIG.data.paymentOptions[prop]+'</label>';
        }
        markup += '</div>' + 
        '</div>' + 
        '<div class="control-group cc-fields">' + 
        '<label class="control-label" for="cardName">Card Name</label>' + 
        '<div class="controls">' + 
        '<input type="text" id="cardName" name="cardName" class="input-medium" value="'+this.model.get("cardName")+'">' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group cc-fields">' + 
        '<label class="control-label" for="cardNumber">Card Number</label>' + 
        '<div class="controls">' + 
        '<input type="text" id="cardNumber" name="cardNumber" class="input-medium" value="'+this.model.get("cardNumber")+'">&nbsp;' + 
        '<select id="card-type" name="cardType" class="input-small">';
        for(var prop in CONFIG.data.cardTypes){
            selected = '';
            if(this.model.get("cardType") == prop){
                selected = 'selected="selected"';
            }
            markup += '<option value="'+prop+'" '+selected+'>'+CONFIG.data.cardTypes[prop]+'</option>';
        }
        markup += '</select>' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group cc-fields">' + 
        '<label class="control-label">Expiry</label>' + 
        '<div class="controls">' + 
        '<input type="text" id="expiry" name="expiry" class="input-mini" value="'+this.model.get("expiry")+'">' + 
        '</div>' + 
        '</div>' + 
        '<div class="control-group">' + 
        '<div class="controls">' + 
        '<a href="#page/delivery-details" class="btn btn-secondary"><i class="icon-black icon-chevron-left"></i> Back</a>&nbsp;<a href="#page/result" class="btn btn-primary doSubmit">Finish <i class="icon-white icon-ok"></i></a>' + 
        '</div>' + 
        '</div>' + 
        '</fieldset>';
        this.$el.html(markup);
        return this;
    },
    result: function(){
        $(document).attr('title', this.options.title);
        var markup;
        markup = '<fieldset>' + 
        '<legend>' + this.options.heading + '</legend>' + 
        '<p>'+ this.options.message +'</p>'
        '</fieldset>';
        this.$el.html(markup);
        return this;
    }
});