var SNS_NEW = function () {
  var pin_page = false;
  var snsObjList = [];
  var main_url, site_name, subject, content, image_url, link_url, security_link_url;
  var api_url;
  var ace_counter_plus_switch = false;
  var kakao_loaded = false;
  var share_type;
  var social = {};
  var additional = {};

  function SnsObjects () {
    this.name = '';
    this.show = true;
    this.order = 0;
    this.iconClass = '';
    this.type = '';
  }

  var loadKakaoApi = function (key) {
    // 카카오 이미 호출되어있으면 호출하지 않음 추가
    if (kakao_loaded) return false;
    if (LIMIT_API_LIST.indexOf('kakao_link') === -1) {
      try {
        if (key != undefined) {
          key = key.trim();
          if (key != '' && Kakao) {
            Kakao.init(key);
            kakao_loaded = true;
          }
        }
      } catch (e) {
      }
    }
  };

  var init = function (d) {
    // 상품&예약 상세페이지 데이터는 고정
    if (pin_page) return false;
    var data = d;
    if (data.kakao_api_key != undefined) {
      loadKakaoApi(data.kakao_api_key);
    }

    main_url = data._main_url;
    site_name = data._site_name;
    subject = data._subject;
    content = data._body === null ? '' : makeShareContent(data._body);
    image_url = data._img;
    link_url = data._post_url;
    security_link_url = data._security_post_url;
    api_url = "https://sns.imweb.me/?url=";
    ace_counter_plus_switch = d.ace_counter_plus_switch;

    social = data._social;
    additional = data._additional;
    share_type = data._share_type;
    if (data._pin_page != undefined) {
      pin_page = true;
    }
  };

  var makeShareContent = function (s) {
    s = removeHtmlTag(s);
    s = s.replace(/&nbsp;/ig, " ");
    s = s.replace(/&lt;/ig, "<");
    s = s.replace(/&gt;/ig, ">");
    var content_max_len = 110;
    s = (s.length > content_max_len) ? s.substring(0, content_max_len) : s;
    return s;
  };

  var setSnsObj = function () {
    snsObjList = [];
    if (SITE_COUNTRY_CODE === KOREA_COUNTRY_CODE) {
      if (LIMIT_API_LIST.indexOf('kakao_link') === -1) {
        var snsObj = new SnsObjects();
        snsObj.name = LOCALIZE.버튼_카카오톡();
        snsObj.show = true;
        snsObj.order = 1;
        snsObj.iconClass = "kakao";
        snsObj.type = "kakaotalk";
        snsObjList.push(snsObj);
      }
    }
    if (LIMIT_API_LIST.indexOf('facebook_link') === -1) {
      snsObj = new SnsObjects();
      snsObj.name = LOCALIZE.버튼_페이스북();
      snsObj.show = true;
      snsObj.order = 1;
      snsObj.iconClass = "face";
      snsObj.type = "facebook";
      snsObjList.push(snsObj);
    }
    if (LIMIT_API_LIST.indexOf('instagram') === -1) {
      snsObj = new SnsObjects();
      snsObj.name = '인스타그램';
      snsObj.show = false;
      snsObj.order = 1;
      snsObj.iconClass = 'instagram';
      snsObj.type = 'instagram';
      snsObjList.push(snsObj);
    }
  };

  var copyToClipboard = function () {
    var html = "<input id='clip_target' type='text' value='' style='position:absolute;top:-9999em;'/>";
    $('body').append(html);
    var input_clip = document.getElementById("clip_target");
    input_clip.value = location.href;
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      var editable = input_clip.contentEditable;
      var readOnly = input_clip.readOnly;
      input_clip.contentEditable = true;
      input_clip.readOnly = false;
      var range = document.createRange();
      range.selectNodeContents(input_clip);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      input_clip.setSelectionRange(0, 999999);
      input_clip.contentEditable = editable;
      input_clip.readOnly = readOnly;
    } else {
      input_clip.select();
    }
    try {
      var successful = document.execCommand('copy');
      input_clip.blur();
      if (successful) {
        alert("URL이 복사 되었습니다. 원하시는 곳에 붙여넣기 해 주세요.");
      } else {
        alert('이 브라우저는 지원하지 않습니다.');
      }
    } catch (err) {
      alert('이 브라우저는 지원하지 않습니다.');
    }
  };

  var setSnsApi = function (type) {
    switch (type) {
      case 'kakaotalk':
        shareKakaoTalk();
        break;
      case 'facebook':
        shareFacebook();
        break;
      case 'instagram':
        shareInstagram();
        break;
    }
  };

  /***
   * 카카오톡 공유하기
   * https://developers.kakao.com/docs/js/kakaotalklink
   */
  var shareKakaoTalk = function () {
    if (LIMIT_API_LIST.indexOf('kakao_link') === -1) {
      var type = share_type;
      var kakao_link = location.href;
      var kakao_send_data = {
        content: {
          title: subject,
          description: content,
          imageUrl: image_url,
          imageWidth: 300,
          imageHeight: 200,
          link: {
            mobileWebUrl: kakao_link,
            webUrl: kakao_link
          }
        },
        buttons: [
          {
            title: '자세히보기',
            link: {
              mobileWebUrl: kakao_link,
              webUrl: kakao_link
            }
          }
        ]
      };
      switch (share_type) {
        case 'booking':
          kakao_send_data.buttons[0]['title'] = '예약하기';
          type = 'feed';
          break;
        case 'commerce':
          if (additional == undefined || additional.commerce == undefined) {
            type = 'feed';
            break;
          }
          kakao_send_data.buttons[0]['title'] = '구매하기';
          kakao_send_data.commerce = {};
          kakao_send_data.commerce.regularPrice = additional.commerce.orig_price;			// 정상가격
          if (additional.commerce.sale_price != undefined)
            kakao_send_data.commerce.discountPrice = additional.commerce.sale_price;	// 할인가격
          break;
        case 'feed':
        case 'location':
          if (social) {
            kakao_send_data.social = {};
            for (key in social) {
              kakao_send_data.social[key] = parseInt(social[key]);
            }
          }
          if (share_type == 'location') {
            if (additional == undefined || additional.location == undefined) {
              type = 'feed';
              break;
            }
            kakao_send_data.address = additional.location.address;
            kakao_send_data.addressTitle = subject;
          }
          break;
        default:
          type = 'feed';
          break;
      }
      kakao_send_data.objectType = type;
      Kakao.Link.sendDefault(kakao_send_data);
    } else {
      alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
    }

  };

  /***
   * 페이스북 공유하기
   */
  var shareFacebook = function () {
    if (LIMIT_API_LIST.indexOf('facebook_link') === -1) {
      shareSnsMetatag('facebook');
    } else {
      alert('사이트관리자설정에의해차단된콘텐츠입니다');
    }
  };

  /***
   * 인스타그램 공유하기
   */
  var shareInstagram = function () {
    if (IS_MOBILE) {

    } else {

    }
  };

  var shareSnsMetatag = function (type) {
    switch (type) {
      case 'facebook':
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href));
        break;
      default:
        alert('공유에실패하였습니다');
        break;
    }
  };

  function set (type, target) {
    init(MENU_SNS_INIT_DATA);
    var appendHtml = ''
    var socialHtml = '<div class="social-share">' +
                     '  <ul>' +
                     '    <li class="social-share__kakao">' +
                     '      <button type="button">카카오톡</button>' +
                     '    </li>' +
                     '    <li class="social-share__facebook">' +
                     '      <button type="button">페이스북</button>' +
                     '    </li>' +
                     '    <li class="social-share__url">' +
                     '      <button type="button">URL복사</button>' +
                     '    </li>' +
                     '  </ul>' +
                     '</div>'
    if (type === 'popup') {
      appendHtml = '<div class="popup-social show_alerts">' +
                   '  <div class="popup-social__wrap">' +
                   '    <div class="popup-social__body">' +
                   '      <p class="popup-social__title">공유하기</p>' +
                          socialHtml +
                   '    </div>' +
                   '  </div>' +
                   '</div>'
      $('body').append(appendHtml)
    } else {
      appendHtml = socialHtml
      target.append(appendHtml)
    }
    $('.social-share__kakao button').off('click').on('click', function () {
      setSnsApi('kakaotalk')
    });
    $('.social-share__facebook button').off('click').on('click', function () {
      setSnsApi('facebook')
    });
    $('.social-share__url button').off('click').on('click', function () {
      copyToClipboard()
    });
    $('.popup-social__wrap').click(function (e) {
      $('.popup-social').remove();
    });
    $('.popup-social__body').click(function (e) {
      e.stopPropagation();
    });
  }


  return {
    set: set,
    setSnsApi: function (_type) {
      if (ace_counter_plus_switch) ACE_COUNTER_PLUS.ShareSns(_type);
      return setSnsApi(_type);
    },
    shareKakaoTalk: function (_type) {
      return shareKakaoTalk(_type);
    },
    shareFacebook: function () {
      return shareFacebook();
    },
    copyToClipboard: function (text) {
      return copyToClipboard(text);
    },
    loadKakaoApi: function (key) {
      loadKakaoApi(key);
    },
    init: function (d) {
      return init(d);
    }
  };
}();
