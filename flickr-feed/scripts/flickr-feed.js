$(function(){
    
    //HTML objects
    var $mainContent;
    var $searchTermTxt;
    var $searchFlickrBtn;
    
    //Flickr API url
    var flickrUrl ="http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    
    //init
    var init = function(){
        
        var setHTMLObjects = function(){
            $mainContent = $("#mainContent");
            $searchTermTxt = $("#searchTermTxt");
            $searchFlickrBtn = $("#searchFlickrBtn");
            
        }();//--end setHTMLObjects
        
        var setEvents = function(){
            $searchFlickrBtn.on("click", function(){
               var $searchTerm = $searchTermTxt.val();
               getAjaxFlickrFeed(flickrUrl, $searchTerm);
            });
            
        }();//--end setEvents
        
    }();//--end init
    
    //GET Ajax Flickr
    function getAjaxFlickrFeed(url, searchTerm){
        
        var flickrConfig = {
            tags: searchTerm,
            tagMode: "any",
            format: "json"
        };
        
        $.getJSON(url, flickrConfig)
            .done(function(resultJSONObject){
                showFlickrFeed(resultJSONObject);

            })
            .fail(function(){
                console.log("Error");
            });
    }
    
    //Show flickr feed
    function showFlickrFeed(feed){
        
        $mainContent.html("");
        
        $(feed.items).each(function(){
            
            var title = this.title;
            var imageUrl = this.media.m;
            
            var $article = $("<article>");
            
            var $thumbnail = $("<div>")
                .addClass("thumbnail");
            
            var $caption = $("<div>")
                .addClass("caption");
            
            var $image = $("<img>")
                .attr({src: imageUrl, alt: title})
                .addClass("img-responsive");
            
            var $title = $("<h3>").html(title);
            
            $article
                .append(
                    $thumbnail
                        .append(
                            $image,
                            $caption
                                .append($title)
                        )
                );
            
            $mainContent.append($article);
            
        });//--end each loop
            $("article", $mainContent)
                .addClass("col-md-6");
        
    }//--end function showFlickrFeed

});