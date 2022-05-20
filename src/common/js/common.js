// import { post } from '@/common/js/http'
// import { gainDictionary } from '@/api/index'
// import globalDict_ from '@/store/global_dict'
// const Json2csvParser = require('json2csv').Parser
// 字典表
export default {
  DownloadFileFn (Response, blobType) {
    console.log(Response)
    let fileName = Response.headers['content-disposition'].split(';')[1].split('filename=')[1]
    let fileNameUnicode = Response.headers['content-disposition'].split('filename*=')[1]
    if (fileNameUnicode) { // 当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
      fileName = decodeURIComponent(fileNameUnicode.split("''")[1])
    }
    let blob = new Blob([Response.data], {
      type: blobType // 将会被放入到blob中的数组内容的MIME类型
    })
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // ie兼容性
      navigator.msSaveBlob(blob, fileName)
    } else {
      let objectUrl = URL.createObjectURL(blob) // 生成一个url
      let downloadElement = document.createElement('a')
      downloadElement.href = objectUrl
      downloadElement.download = fileName
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(objectUrl)
    }
  }
}
