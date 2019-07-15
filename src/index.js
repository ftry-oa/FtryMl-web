
const image = document.getElementById('image');

cropper = null

const initCropper = function (image) {
    cropper && cropper.destroy()
    cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        preview: document.querySelectorAll('.preview-box'),
        crop(event    ) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      });
}
initCropper(image)

document.getElementById('file-input').addEventListener('change', function (e) {
    console.log('@@@@', this.files[0])
    var reader = new FileReader()
    reader.onload = function(e) {
        image.src = e.target.result
        initCropper(image)
    }
    reader.onerror = function (e) {
        console.log('eee', e)
    }
    reader.readAsDataURL(this.files[0])
}, false)

document.getElementById('submit-btn').addEventListener('click', function () {
    cropper.getCroppedCanvas().toBlob((blob) => {
        console.log('@@@blob', blob)
        // const formData = new FormData();
      
        // formData.append('croppedImage', blob);
      
        // // Use `jQuery.ajax` method
        // $.ajax('/path/to/upload', {
        //   method: "POST",
        //   data: formData,
        //   processData: false,
        //   contentType: false,
        //   success() {
        //     console.log('Upload success');
        //   },
        //   error() {
        //     console.log('Upload error');
        //   },
        // });
      });
})