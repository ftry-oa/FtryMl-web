$(document).ready(function(){

  const image = document.getElementById('image');

  const bootbox = {}
  bootbox.commonBehavior = ($bootbox, { duration }) => {
    const createTimeout = () => {
      return setTimeout(() => {
        $bootbox.remove()
      }, duration)
    }
    let timer = createTimeout()
    $bootbox.hover(function () {
      timer && clearTimeout(timer)
      timer = null
    }, function () {
      timer = createTimeout()
    })

    $bootbox.find('.close').bind('click', function () {
      $(this).closest('.bootbox').remove()
    })
  }
  bootbox.modal = (title, content, options) => {
    options = options || {}
    const { bootboxClassName, duration = 3000 } = options
    const $bootbox = $(`<div class="bootbox modal ${bootboxClassName}">
                          <span class="close">×</span>
                          <span>${title}</span>
                          <p>
                            <i class=""></i>
                            ${content}
                          </p>
                        </div>`)
    $('body').append($bootbox)

    bootbox.commonBehavior($bootbox, { duration })
  }

  bootbox.message = (content, { type = 'success', duration = 3000, bootboxClassName = '' }) => {
    const $bootbox = $(`<div class="bootbox message ${bootboxClassName}">
                          <span class="close">×</span>
                          <p>
                            <i class="message-icon ${type}"></i>
                            ${content}
                          </p>
                        </div>`)
    $('body').append($bootbox)

    bootbox.commonBehavior($bootbox, { duration })
  }

  let cropper = null

  const initCropper = function (image) {
    cropper && cropper.destroy()
    cropper = new Cropper(image, {
      // aspectRatio: 16 / 9,
      preview: document.querySelectorAll('.preview-box'),
      crop(event) {
        // console.log(event.detail.x);
        // console.log(event.detail.y);
        // console.log(event.detail.width);
        // console.log(event.detail.height);
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);
      },
    });
  }
  const $image = $('#image')
  $image.attr('src', './assests/5.jpg')
  $image.load(function(){
    $('.img-loading').hide()
    $image.css('display', 'block')
    initCropper(image)
  })

  $('.ev-rotate-box').bind('click', function () {
    if (!cropper) {
      return
    }
    const $this = $(this)
    const type = $this.data('type')
    if (type === 'back') {
      cropper.rotate(-90)
      return
    }
    cropper.rotate(90)
  })

  document.getElementById('file-input').addEventListener('change', function (e) {
    var reader = new FileReader()
    reader.onload = function (e) {
      image.src = e.target.result
      initCropper(image)
    }
    reader.onerror = function (e) {
      console.log('eee', e)
    }
    reader.readAsDataURL(this.files[0])
  }, false)

  const submiter = {
    submiting: false,
    loading: function () {
      this.submiting = true
      const $submitBtn = $('#submit-btn')
      $submitBtn.find('.loading').css('display', 'inline-block')
      $submitBtn.addClass('disabled')
      $submitBtn.attr('disabled', 'disabled')
    },
    loaded: function () {
      this.submiting = false
      const $submitBtn = $('#submit-btn')
      $submitBtn.find('.loading').css('display', 'none')
      $submitBtn.removeClass('disabled')
      $submitBtn.removeAttr('disabled')
    }
  }

  document.getElementById('submit-btn').addEventListener('click', function () {
    if (submiter.submiting) {
      return
    }
    submiter.loading()
    cropper.getCroppedCanvas().toBlob((blob) => {

      const formData = new FormData();

      formData.append('image', blob);


      // Use `jQuery.ajax` method
      $.ajax('/ftryml/uploadFileJson', {
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        headers: { 'X-CSRFtoken': $.cookie('csrftoken') },
        success(res) {
          submiter.loaded()
          res = JSON.parse(res)
          if (res.success) {
            bootbox.modal('预测结果为:', `<span style="font-size:40px;">${res.data}</span>`, {
              bootboxClassName: 'set-top'
            })
            return
          }
          bootbox.message(res.data || res.msg || '预测失败', {type: 'error'})
        },
        error(err) {
          submiter.loaded()
          bootbox.message(err.data || err.msg || '预测失败', {type: 'error'})
        },
      });
    });
  })
});