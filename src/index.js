$(document).ready(function(){

  const image = document.getElementById('image');

  const bootbox = {}
  bootbox.message = (title, content, options) => {
    options = options || {}
    const { bootboxClassName, duration = 3000 } = options
    const $bootbox = $(`<div class="bootbox message ${bootboxClassName}">
                          <span class="close">×</span>
                          <span>${title}</span>
                          <p>
                            <i class=""></i>
                            ${content}
                          </p>
                        </div>`)
    $('body').append($bootbox)
    // duration = duration || 3000
    const createTimeout = () => {
      return setTimeout(() => {
        $bootbox.remove()
      }, duration)
    }
    // let timer = createTimeout()

    $bootbox.find('.close').bind('click', function () {
      $(this).closest('.bootbox').remove()
    })
    // $bootbox.hover(function () {
    //   timer && clearTimeout(timer)
    //   timer = null
    // }, function () {
    //   timer = createTimeout()
    // })
  }

  bootbox.message('预测结果为:', '<span style="font-size:40px;">5</span>', {
    bootboxClassName: 'set-top'
  })

  cropper = null

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
            bootbox.message('预测结果为:', res.data, {
              bootboxClassName: 'set-top'
            })
          }
        },
        error(err) {
          submiter.loaded()
          console.log('Upload error', err);
        },
      });
    });
  })
});