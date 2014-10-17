var buildAlbumThumbnail = function() {
  var template =
        '<div class="collection-album-container col-md-2">'
      + '  <img src="/images/album-placeholder.png"/>'
      + '  <div class="caption album-collection-info">'
      + '    <p>'
      + '      <a class="album-name" href="/album.html"> Album Name </a>'
      + '      <br/>'
      + '      <a href="/album.html"> Artist name </a>'
      + '      <br/>'
      + '      X songs'
      + '      <br/>'
      + '      X:XX total length'
      + '      <br/>'
      + '    </p>'
      + '  </div>'
      + '</div>';

    return $(template);  
};

var updateCollectionView = function() {
   var $collection = $(".collection-container .row");
   $collection.empty();

   for (i = 0; i < Math.floor(Math.random() * 75) + 25; i++) {
      $collection.append(buildAlbumThumbnail());
   };
}

if (document.URL.match(/\/collection.html/)) {
  $(document).ready(function() {
      updateCollectionView();
  });
};

