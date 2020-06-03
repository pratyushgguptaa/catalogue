var bill =0, totalPrice =199,k=1;
      var codes = {"VISION":150,"CODE100":100,"VEER":125,"BAHADUR":99,"LAUNDE":50,"MANIT":200,"PMC007":70,"BHOPAL50":50};
      var coupons ="";
      var keys = Object.keys(codes);
      keys.forEach(key=>{
        coupons+=key + '  --> ₹' + codes[key]+' Off\n';
      });

      //showing sidebar
      function show(){
        $(".fa-times").fadeIn();
        $(".overlay").fadeIn();
        $(".sidebar").fadeIn();
      }
      //hiding sidebar
      function hide(){
        $(".fa-times").hide();
        $(".sidebar").fadeOut();
        $(".overlay").fadeOut();
      }
      function addToCart(){
        $(".item-card").append("<a class=\"btn btn-lg\" href=\"#cart\" role=\"button\"><i class=\"fas fa-cart-plus\"></i>&nbsp&nbspAdd to Cart</a>");
      }
      //add the favourite button to each item card
      $(".item-card").prepend("<i class=\"fas fa-heart\"></i>");
      //on click fa-heart toggle class favourite
      $(".fa-heart").click(function(){
        $(this).toggleClass("favourite");
      });

      //add add to cart button to each item-card
      addToCart();

      

      //onclick of add to card button
      $(".item-card a").click(function(){
        $(this).html("<i class=\"fas fa-cart-arrow-down\"></i>&nbsp&nbspAdded to Cart").css({
          "cursor":"wait"
        });
        var itemName = $(this).siblings("p").html().split("<br>")[0];

        var priceTag = $(this).siblings("p").children("b").html();

        var itemPrice = parseInt(priceTag.replace( /[^\d]/g, '' ));
        
        var classPriceTag = "<span class=\"each-price\">"+priceTag +"</span>";
        var removeTag = "<b>&nbspREMOVE</b>";

        bill += itemPrice;
        totalPrice += itemPrice;


        $("ol").append("<li>"+itemName+""+classPriceTag+"</li>");
        $("#items").text($("#item-list").children().length);
        $("#price").text("₹"+bill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#total").text("₹"+totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

      });

      //on REMOVE of an itme from the lists
     /* $('#item-list').on('click','b', function(event){
        var removeLi = $(this).parent().parent();
        var itemPrice = parseInt(removeLi.text().replace( /[^\d]/g, '' ));
        bill-=itemPrice;
        totalPrice-=itemPrice;
        $("#price").text("₹"+bill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#total").text("₹"+totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        
        var cards = $(".item-card");

        var i = 0;
        for (; i < 8; i++)
          if(cards[i].innerHTML.split('<br>')[0].split('<p>')[1] == removeLi.text().split('₹')[0])
            break;

        //alert($(".item-card")[i].innerHTML);          

        $(".item-card")[i].innerHTML = cards[i].innerHTML.split('</p>')[0]+"</p><a class=\"btn btn-lg\" href=\"#cart\" role=\"button\" style=\"cursor:pointer;pointer-events:auto !important;\"><i class=\"fas fa-cart-plus\"></i>&nbsp&nbspAdd to Cart</a>";

        removeLi.slideUp();
      });
      */

      //on enter coupon code and submit
      $("form").submit(function(e) {
        e.preventDefault();
        var input = $("#code").val();

      

        if(codes[input] !== undefined){
          $(".valid-feedback").slideDown();
          $(".invalid-feedback").slideUp();
          $("#code").prop('disabled', true);
          $("#check").prop('disabled','disabled');
          $("#check").html("APPLIED&nbsp <i class=\"fas fa-qrcode\">");
          $("h5").slideDown();

          var discount = codes[input];
          totalPrice -= discount;
          $("h5 span").text("-₹"+discount);
          $("#total").text("₹"+totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

        }
        else{
          $(".valid-feedback").slideUp();
          $(".invalid-feedback").slideDown();
          if(k==1){
            alert("Coupon Codes and Offers:\n"+coupons);
            k++;
          }
        }



      });

      //checks every 2 sec whether the bill is empty and will show
      //the empty cart div
      setInterval(function(){
        if(bill==0){
          $(".pricing").hide();
          $(".empty-cart").show();
          $(".item-card a").html("<i class=\"fas fa-cart-plus\"></i>&nbsp&nbspAdd to Cart").css({
            "cursor" : "pointer",
            "pointerEvents" : "auto"
          });
        }
        else{
          $(".pricing").show();
          $(".empty-cart").hide();
        }
      },2000);
      
      // media query event handler
      if (matchMedia) {
      const mq = window.matchMedia("(min-width: 992px)");
      mq.addListener(WidthChange);
      WidthChange(mq);
      }

      // media query change
      function WidthChange(mq) {
        if (mq.matches) {
          $(".fa-times").hide();
          $(".overlay").fadeOut();
          $(".sidebar").fadeIn();
        } else {
          $(".sidebar").fadeOut();
        }
      }