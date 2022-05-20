<template>
    <div style="width: 100%">
        <div id="editor" style="height: 450px">
            <p></p>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editorElem',
  data () {
    return {
      editor: null,
      editorContent: '',
      flag: true
    }
  },
  watch: {
    content () {
      if (this.flag) {
        this.editor.$txt.html(this.content)
        this.flag = false
      }
    }
  },
  props: ['catchData', 'content'],
  mounted () {
    let _this = this
    _this.editor = new E('editor')
    _this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
    _this.editor.config.menus = [
      'head',
      'blod',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'foreColor',
      'backColor',
      'list',
      'justify',
      'quote',
      'table',
      'alignleft',
      'aligncenter',
      'alignright',
      'link',
      'unlink',
      'img',
      'insertcode',
      'undo',
      'redo',
      'fullscreen'
    ]
    // uploadUrl: this.BASEURL + '/o/file/upload', // 上传
    _this.editor.config.uploadImgUrl = this.BASEURL + '/o/file/wangEditor-upload'
    _this.editor.config.hideLinkImg = true
    _this.editor.onchange = function () {
      let that = this
      _this.editorContent = that.$txt.html()
      _this.catchData(_this.editorContent)
    }
    if (Number(_this.$route.query.dotype) === 1) {
      _this.editor.disable()
    }
    _this.editor.create()
  }
}
</script>
