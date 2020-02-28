'use strict';

function SuperCart() {
 
    [{
        product__id: 12121,
        count: 1,
        type: 1
    },
    {
        product__id: 12121,
        count: 2,
        type: 2
    },
    {
        product__id: 145416546,
        count: 1,
        type: 1
    }];
    
    this.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    this.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    this.checkCookie = function() {
        var user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    }
    
}

let instance = new SuperCart();

instance.setCookie('supercart', [{ id: 1 }], 1);

console.log(instance.getCookie('supercart'));