/* global html2canvas */
/**
 * Created by FARA- on 07/11/2015.
 */

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-29237910-10', 'auto');
  ga('send', 'pageview');


$('.mustache-tooltip').tooltip();

var inicio = 0;
var imgHeight, imgWidth;

if(inicio == 0){
    $(".btn-guardar").hide();
    $(".btn-partilhar").hide();
}

$(".btn-carregar").on('change', function () {

    //Get count of selected files
    var countFiles = $(this)[0].files.length;

    var imgPath = $(this)[0].value;
    var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
    var image_holder = $("#image-holder");
    image_holder.empty();

    if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
        if (typeof (FileReader) != "undefined") {

            //loop for each file selected for uploaded.
            for (var i = 0; i < countFiles; i++) {

                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                        "src": e.target.result,
                        "class": "thumb-image"
                    }).appendTo(image_holder);
                }

                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);
                $(".jumbotron-content").hide();
                inicio = 1;
                $(".btn-guardar").show();
                $(".btn-partilhar").show();
                imgHeight =  $(".thumb-image").height(); 
                imgWidth = $(".thumb-image").width(); 
            }

        } else {
            alert("This browser does not support FileReader.");
        }
    } else {
        alert("Pls select only images");
    }
});

var imgPreview = document.getElementById("preview");

$(".btn-guardar").click(function() {
    document.getElementById('download').click();
});

$(".btn-guardar").mouseover(function() {
  render();
});

$(".btn-guardar").mouseleave(function() {
  //cleanRender();
});

$(".btn-carregar-top").click(function() {
     location.reload();
});

function render(){
        html2canvas($("#image-holder"), {
            onrendered: function(canvas) {
              //  console.log(canvas);
              //  document.body.appendChild(canvas);
                var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                document.getElementById("download").href=data;
                imgPreview.src = data;
            },
            width: imgWidth,
            height: imgHeight
        });
}

$( ".draggable" ).draggable({ 
    revert: "valid", 
    helper: function() {
            return jQuery(this).clone().appendTo('body').css({
                'zIndex': 5
            });
        },
        cursor: 'move',
        containment: "document"
    });
    
$( "#image-holder" ).droppable({
    greedy: true,
    accept: '.draggable',
    drop: function(event, ui) {
      //  $(this).append($(ui.draggable).clone());
        if (!ui.draggable.hasClass("dropped")){
            jQuery(this).append(
                jQuery(ui.draggable).clone()
                    .addClass("dropped").draggable());
        }
    }
});

