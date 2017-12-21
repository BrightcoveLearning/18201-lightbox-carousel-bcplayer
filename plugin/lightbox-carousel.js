videojs.registerPlugin('lightboxCarousel', function() {
    var myPlayer = this,
        $lightbox = $("#BCLSlightbox"),
        $carousel = $("#feature-carousel"),
        $close = $(".BCLSclose"),
        // Vars for Handlebars
        videosTemplate = "{{#each this}}<div class=\"carousel-feature\"><img alt=\"{{name}}\" class=\"carousel-image\" src=\"{{thumbnailURL}}\" width=\"180\" height=\"96\" data-id=\"{{id}}\" /><div class=\"carousel-caption\"><p>{{name}}</p></div></div>{{/each}}",
        carouselNavigation = "<div id=\"carousel-left\"><img src=\"/en/scripts/jQuery-Feature-Carousel/images/arrow-left.png\" /></div><div id=\"carousel-right\"><img src=\"/en/scripts/jQuery-Feature-Carousel/images/arrow-right.png\" /></div>",
        template,
        data,
        results,
        i = 0,
        max = 0,
        currentVideo,
        playlistData,
        videoItem = {},
        videoArray = [];

      var buildPlaylistData = function () {
        // Build the video data array
        for (var i in playlistData) {
        	videoItem = {id: playlistData[i].id, name: playlistData[i].name, thumbnailURL: playlistData[i].thumbnail, shortDescription: playlistData[i].description};
        	videoArray.push(videoItem);
        }
      };

      var buildCarousel = function () {
        // Build the videos carousel
        template = Handlebars.compile(videosTemplate);
        results = template(videoArray);
        $carousel.prepend(results);
        // Instantiate the carousel
        $carousel.featureCarousel({
            smallFeatureWidth:    .9,
            smallFeatureHeight:		.9,
            "trackerIndividual" : false
         });
        // Add event listener for clicks on videos
        $(".carousel-image").on("click", showAndLoad);
        $("#but_prev").click(function () {
            $carousel.prev();
        });
        $("#but_pause").click(function () {
            $carousel.pause();
        });
        $("#but_start").click(function () {
            $carousel.start();
        });
        $("#but_next").click(function () {
            $carousel.next();
        });
        $close.on("click", hideAndStop);

        // Let the video selector know the player is loaded
        playerLoaded = true;
      };

	    var showAndLoad = function (e) {
	      // Make sure the player is loaded
        if (playerLoaded) {
          // Load the video
          var currentID = $(this).attr("data-id");
          var index = videoArray.map(function(el) {
            return el.id;
          }).indexOf(currentID);

          // Load the selected video
          myPlayer.playlist.currentItem(index);

          // Reveal the lightbox
          $lightbox.attr("class", "BCLSshow");
          // Play the video
          myPlayer.play();
        }
	    };

	    var hideAndStop = function () {
	      // Pause the video
	      myPlayer.pause();

	      // Hide the lightbox
	      $lightbox.attr("class", "BCLShide");
	    };

	    videojs("myPlayerID").ready(function(){
	      myPlayer = this;

        myPlayer.one('loadedmetadata', function() {
        	 playlistData = myPlayer.playlist();
        	 buildPlaylistData();
        	 buildCarousel();
        })
	    });

});
