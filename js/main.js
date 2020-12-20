$('.toggle-menu').on('click',function(){
    $('.header__bottom').toggleClass('is-active');
    $('.toggle-menu').toggleClass('is-active');
    $('body,html').toggleClass('locksroll');
});

$('.header__bottom nav a').hover(function(){
    //mouseenter
    $(this).siblings().addClass('is-not-hover');
    $('.nav-mid a').addClass('is-not-hover');
},function(){
    //mouseleave
    $(this).siblings().removeClass('is-not-hover');
    $('.nav-mid a').removeClass('is-not-hover');
});
$('.header__bottom .nav-mid a').hover(function(){
    
    $('.header__bottom nav a').addClass('is-not-hover');
    $(this).removeClass('is-not-hover');
},function(){
    $('.header__bottom nav a').removeClass('is-not-hover');
})
///back to top
$('.copyright .back-to-top').on('click', function() {
    $("html, body").animate({scrollTop: 
    0}, 1000);
});
//tab
$('.project__tab a').on('click',function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');

    let current_tab = $(this).attr("data-list");
    $('.project .row').hide();
    $('.'+current_tab).show();
});

//box number
$('.box-number span').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
});

//slider studio-details
$('.image-wrap').flickity({
    cellAlign:'left',
    contain:true,
    prevNextButtons:false,
    wrapAround:true,
    lazyLoad:true,
})
let $carousel = $('.image-wrap');
$('.btn-prev').on('click',function(){
    $carousel.flickity('previous');
})
$('.btn-next').on('click',function(){
    $carousel.flickity('next');
})

//slider cafe
$('.carousel-gallery').flickity({
    cellAlign:'left',
    contain:true,
    prevNextButtons:false,
    wrapAround:true,
    lazyLoad:true,
})
let $carousel_cafe = $('.carousel-gallery');
$('.btn-prev').on('click',function(){
    $carousel_cafe.flickity('previous');
    console.log(111);
})
$('.btn-next').on('click',function(){
    $carousel_cafe.flickity('next');
    console.log(111);

})
//menu fixed
var positionTop = $('.header__bottom').position().top
var prevScrollpos = window.pageYOffset;
console.log(prevScrollpos)
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if(window.innerWidth > 768) {
    if(currentScrollPos > positionTop) {
        document.getElementsByClassName("header__bottom")[0].classList.add('menu-fixed');
        if(prevScrollpos > currentScrollPos) {
            document.getElementsByClassName("menu-fixed")[0].style.top="0";
        }
        else {
          document.getElementsByClassName("menu-fixed")[0].style.top="-70px";
        }
        prevScrollpos = currentScrollPos;
    }
    else {
      document.getElementsByClassName("header__bottom")[0].classList.remove('menu-fixed');
    }
  }
}

var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
      
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
        
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 
  
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        console.log(pswpElement)
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
  };
  //init photoswipe
$(window).on('load',function(){
    initPhotoSwipeFromDOM('.carousel-img');
})
//page loader
const preloadImages = () => {
    return new Promise((resolve,reject) => {
        imagesLoaded($('img'),resolve);
    })
};
preloadImages().then(() => {
    //remove the loader
    $('body').removeClass('loading');
})

// function timX(arr,x)
// {
//     a = x%10
//     b=parseInt(x/10)
//     for(let i=0;i<arr.length;i++)
//     {
//         if((arr[i]+"").indexOf(a) !=-1 && (arr[i]+"").indexOf(b) !=-1)
//         {
//             console.log(arr[i])

//         }
//     }
    
// }
// timX([208,382,200,508,35829,15298],20);
