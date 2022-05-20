<!--
 * @Author: tianxin,
 * @Date: 2021-04-02 15:48:26,
 * @lastTime: 2021-04-02 15:48:26,
 * @LastEditors: wangyu
 * @Description: '商品管理'
 -->
<template>
  <div class="goods_page main_wrap">
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ModuleTitle>
      <p>{{ title }}商品</p>
      <p v-if="Number(this.$route.query.dotype) === 1">
        <el-button size="small" class="backBtn" @click="cancelAdd">返回</el-button>
      </p>
      <p v-else>
        <el-button size="small" class="cancel" @click="cancelAdd">取消</el-button>
        <el-button size="small" type="primary" @click="doGoodsAdd">保存</el-button>
      </p>
    </ModuleTitle>
    <div class="form_wrap">
    <el-form
      :model="didiForm"
      ref="didiForm"
      :rules="rules"
      class="didiForm"
      size="small"
      label-width="130px"
      :disabled="Number(this.$route.query.dotype) === 1">
        <div class="row">
          <el-form-item label="商品频道" prop="releaseChannel">
            <el-select v-model="didiForm.releaseChannel"
                       placeholder="请选择商户频道"
                       clearable
                       :disabled = "Number(this.$route.query.dotype) === 3"
                       @change="releaseChange">
              <el-option
                v-for="item in releaseChannelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商名称" prop="merchantId" required>
            <el-select
              :disabled = "didiForm.releaseChannel === ''"
              v-model="didiForm.merchantId"
              placeholder="请选择供应商名称"
              clearable>
              <el-option
                v-for="item in userLists"
                :key="item.merchantId"
                :label="item.merchantName"
                :value="item.merchantId"
                ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row tooltip_tips_parent">
          <el-form-item prop="name" label="商品名称" required >
            <el-input
              maxlength="1000"
              v-model="didiForm.name"
              placeholder="请输入1-1000字的商品名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="category" label="商品类目" required>
            <el-select
              :disabled = "didiForm.releaseChannel === ''"
              v-model="didiForm.category"
              placeholder="请选择商品类目"
              filterable
              clearable>
              <el-option
                v-for="item in typeLists"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="tooltip_tips">
            <el-tooltip v-if="didiForm.category === '6' || didiForm.category === '4'" class="operation_item" popper-class="operation_tooltip"  placement="bottom">
              <div v-if="didiForm.category === '6'" slot="content">包含特惠商品、外包装破损商品、限期内商品<br/>（要求限期一年有效期以上）</div>
              <div v-if="didiForm.category === '4'" slot="content">包含限量版商品、限制数量商品</div>
              <i class="icon iconfont icongantanhao-quan"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="selectTime" v-if="didiForm.releaseChannel === '6' && didiForm.category !== ''">
          <el-form-item prop="startTime" label="时间段" required>
            <el-date-picker
              v-model="didiForm.startTime"
              type="datetime"
              placeholder="选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="endTime" required class="endTimeClass">
            <el-date-picker
              v-model="didiForm.endTime"
              type="datetime"
              placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item
            label="商品介绍"
            class="proDes">
            <span class="red error_mes">*</span>
            <editor
              class="editor"
              :catchData="catchData"
              :content="didiForm.description">
            </editor>
            <div class="error_mes" v-if="isShowErr">请您输入商品介绍</div>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item prop="originalPrice" label="原价格(元)">
            <el-input
              v-model="didiForm.originalPrice"
              placeholder="请填写商品原价格"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="sellingPrice" label="售卖价(元)">
            <el-input
              v-model="didiForm.sellingPrice"
              placeholder="请填写商品售卖价"
              clearable
            ></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item prop="listPageImage" label="商品列表图片" required>
            <div style="width: 400px">
              <el-upload
                class="upload"
                :action="uploadUrl"
                list-type="picture-card"
                :show-file-list="false"
                style="width: 57px"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess('listPageImage', res, file);
                  }
                "
                :before-upload="beforeAvatarUpload"
              >
                <img
                  :src="didiForm.listPageImagePath"
                  v-if="didiForm.listPageImage"
                  alt=""
                  style="width: 55px; height: 55px"
                />
                <div v-else class="uplaod_add_wrap">
                  <i class="iconfont iconjiahao avatar-uploader-icon"></i>
                </div>
              </el-upload>
              <div slot="tip" class="el-upload__tip upload_tip">
                图片尺寸为700*360
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="orderListPageImage" label="订单列表图" required>
            <div style="width: 400px">
              <!-- beforeAvatarUpload1暂时先用1的校验，如果后续有更新再进行替换 -->
              <el-upload
                class="upload task"
                :action="uploadUrl"
                list-type="picture-card"
                :show-file-list="false"
                style="width:57px"
                :on-success="
                  (res, file) => {
                    handleAvatarSuccess('orderListPageImage', res, file);
                  }
                "
                :before-upload="beforeAvatarUpload2"
              >
                <img
                  :src="didiForm.orderListPageImagePath"
                  v-if="didiForm.orderListPageImage"
                  alt=""
                  style="width: 55px; height: 55px"
                />
                <div v-else class="uplaod_add_wrap">
                  <i class="iconfont iconjiahao avatar-uploader-icon"></i>
                </div>
              </el-upload>
              <div slot="tip" class="el-upload__tip upload_tip">
                图片尺寸为120*120
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item prop="detailsPageImage" label="商品详情banner图" required>
            <div style="width: 300px">
              <el-upload
                class="upload task"
                :action="uploadUrl"
                list-type="picture-card"
                :show-file-list="false"
                style="width:57px"
                :on-success="
                    (res, file) => {
                      handleAvatarSuccess('detailsPageImage', res, file);
                    }
                  "
                :before-upload="beforeAvatarUpload1"
              >
                <div class="details-list" style="display: flex">
                  <div
                    v-for="(item3, index3) in didiForm.detailsPageImagePath"
                    :key="index3"
                    style="
                        width: 57px;
                        height: 57px;
                        margin-right: 4px;
                        position: relative;
                      ">
                    <img :src="item3" style="width: 57px; height: 57px"/>
                    <span class="cover" @click.stop="handleRemove(index3)">
                        <i class="el-icon-delete avatar-uploader-icon delete-img"></i>
                      </span>
                  </div>
                  <div v-if="didiForm.detailsPageImage.length < 5" class="uplaod_add_wrap">
                    <i class="iconfont iconjiahao avatar-uploader-icon"></i>
                  </div>
                </div>
              </el-upload>
              <div slot="tip" class="el-upload__tip upload_tip">
                图片尺寸为750*350
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="address" label="城市">
            <div class="my_cascader">
              <el-cascader
                size="small"
                :options="options"
                v-model="didiForm.addressCode"
                placeholder="请选择城市"
                @change="addressChange"
                clearable
              >
              </el-cascader>
            </div>
          </el-form-item>
        </div>
    </el-form>
    </div>
  </div>
</template>
<script>
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import FormValidate from '@/api/rules.js'
import {mapActions} from 'vuex'
import editor from '@/components/wangEditor'
let commonRule = FormValidate.FormValidate
export default {
  components: {
    editor: editor
  },
  data () {
    const validateStartTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请您选择开始时间'))
      } else {
        if (new Date(this.didiForm.startTime).getTime() <= new Date().getTime()) {
          callback(new Error('开始时间必须大于当前时间'))
        } else {
          callback()
        }
      }
    }
    const validateEndTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请您选择结束时间'))
      } else {
        if (
          new Date(this.didiForm.startTime).getTime() >=
          new Date(this.didiForm.endTime).getTime()
        ) {
          callback(new Error('结束时间必须大于开始时间'))
        } else {
          callback()
        }
      }
    }
    const checkdetailsPageImage = (rule, value, callback) => {
      let that = this
      if (that.didiForm.detailsPageImage.length === 0) {
        callback(new Error('请您上传商品详情页图片'))
      } else {
        callback()
      }
    }
    return {
      releaseChannelList: [],
      isShowErr: false,
      title: '',
      didiForm: {
        startTime: '',
        endTime: '',
        category: '',
        releaseChannel: '',
        merchantId: '',
        detailsPageImage: [],
        detailsPageImagePath: [],
        description: ''
      },
      dotype: this.$route.query.dotype,
      tableData: [],
      options: regionDataPlus,
      typeLists: [],
      userLists: [],
      rules: {
        releaseChannel: [{required: true, message: '请选择商品频道', trigger: ['blur', 'change']}],
        merchantId: [{required: true, message: '请您选择供应商名称', trigger: ['blur', 'change']}],
        name: [{required: true, message: '请您输入商品名称', trigger: ['blur', 'change']}],
        category: [{required: true, message: '请您选择商品类目', trigger: ['blur', 'change']}],
        startTime: [
          {required: true, message: '请您选择开始时间', trigger: ['blur', 'change']},
          {type: 'string', required: true, trigger: ['blur', 'change'], validator: validateStartTime}],
        endTime: [
          {required: true, message: '请您选择结束时间', trigger: ['blur', 'change']},
          {type: 'string', required: true, trigger: ['blur', 'change'], validator: validateEndTime}],
        address: [{required: false, trigger: ['blur', 'change']}],
        originalPrice: [{required: false, validator: commonRule.Form('原价格').NumberPrice, trigger: ['blur', 'change']}],
        sellingPrice: [{required: true, validator: commonRule.Form('售卖价格').mustNumberPrice, trigger: ['blur', 'change']}],
        description: [{required: true, message: '请您输入商品介绍', trigger: ['blur', 'change']}],
        listPageImage: [{required: true, message: '请您上传商品列表页图片', trigger: ['blur', 'change']}],
        orderListPageImage: [{required: true, message: '请您上传订单列表页图片', trigger: ['blur', 'change']}],
        detailsPageImage: [{required: true, validator: checkdetailsPageImage, trigger: ['blur', 'change']}]
      },
      uploadUrl: this.BASEURL + '/o/file/upload'
    }
  },
  methods: {
    // 商品介绍
    catchData (val) {
      this.didiForm.description = val
      this.checkValid()
    },

    // 商品详情banner图
    handleRemove (index) {
      if (this.dotype === '1') {
        return false
      }
      this.didiForm.detailsPageImage.splice(index, 1)
      this.didiForm.detailsPageImagePath.splice(index, 1)
    },
    // 上传图片之前
    beforeAvatarUpload (file) {
      let FileExt = file.name.replace(/.+\./, '').toLowerCase()
      let flag = ['png', 'jpeg', 'jpg', 'gif'].includes(FileExt)
      if (!flag) {
        this.$message.warning('允许上传图片格式jpg、png、jpeg、gif')
        return false
      }
      // 限制图片尺寸
      const isSize = new Promise(function (resolve, reject) {
        let width = 700
        let height = 360
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = img.width === width && img.height === height
          valid ? resolve(true) : reject(new Error('err'))
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return true
      }, () => {
        this.$message.warning('请您上传尺寸为700*360的图片')
        return Promise.reject(new Error('err'))
        // return false
      })
      return flag && isSize
    },

    // 上传图片之前
    beforeAvatarUpload1 (file) {
      let FileExt = file.name.replace(/.+\./, '').toLowerCase()
      let flag = ['png', 'jpeg', 'jpg', 'gif'].includes(FileExt)
      if (!flag) {
        this.$message.warning('允许上传图片格式jpg、png、jpeg、gif')
        return false
      }
      // 限制图片尺寸
      const isSize = new Promise(function (resolve, reject) {
        let width = 750
        let height = 350
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = img.width === width && img.height === height
          valid ? resolve(true) : reject(new Error('err'))
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return true
      }, () => {
        this.$message.warning('请您上传尺寸为750*350的图片')
        return Promise.reject(new Error('err'))
        // return false
      })
      return flag && isSize
    },

    // 上传图片之前
    beforeAvatarUpload2 (file) {
      let FileExt = file.name.replace(/.+\./, '').toLowerCase()
      let flag = ['png', 'jpeg', 'jpg', 'gif'].includes(FileExt)
      if (!flag) {
        this.$message.warning('允许上传图片格式jpg、png、jpeg、gif')
        return false
      }
      // 限制图片尺寸
      const isSize = new Promise(function (resolve, reject) {
        let width = 120
        let height = 120
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = img.width === width && img.height === height
          valid ? resolve(true) : reject(new Error('err'))
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return true
      }, () => {
        this.$message.warning('请您上传尺寸为120*120的图片')
        return Promise.reject(new Error('err'))
        // return false
      })
      return flag && isSize
    },

    // 提交成功之后
    handleAvatarSuccess (name, res, file) {
      console.log(name)
      let fileUrl = file.response.data.fileUrl
      let fileId = file.response.data.fileId
      switch (name) {
        case 'detailsPageImage':
          this.didiForm.detailsPageImagePath.push(fileUrl)
          this.didiForm.detailsPageImage.push(fileId)
          break
        case 'businessLicense':
          this.$set(this.didiForm, 'businessLicensePath', fileUrl)
          this.$set(this.didiForm, 'businessLicense', fileId)
          break
        case 'listPageImage':
          this.$set(this.didiForm, 'listPageImagePath', fileUrl)
          this.$set(this.didiForm, 'listPageImage', fileId)
          break
        case 'orderListPageImage':
          this.$set(this.didiForm, 'orderListPageImagePath', fileUrl)
          this.$set(this.didiForm, 'orderListPageImage', fileId)
          break
        case 'businessCertificate':
          this.$set(this.didiForm, 'businessCertificatePath', fileUrl)
          this.$set(this.didiForm, 'businessCertificate', fileId)
          break
      }
      this.$refs.didiForm.clearValidate(name)
    },

    // 取消
    cancelAdd () {
      this.$router.push({
        path: '/GoodsManagelist'
      })
    },

    // 校验富文本编辑器是否空
    checkValid () {
      let str = this.didiForm.description
      str = str.replace(/(\n|\t|\r|&nbsp;)/g, function ($0, $1) {
        return {
          '\n': '',
          '\t': '',
          '\r': '',
          '&nbsp;': ''
          // '<\/?[^>]*>': '',
          // '\s*': ''
        }[$1]
      })
      str = str.replace(/[()]/g, '')
      str = str.replace(/:/g, '')
      str = str.replace(/(&nbsp;)/g, '')
      // 去除HTML标签,但不去除img标签
      str = str.replace(/<\/?((?!img).)*?\/?>/g, '')
      str = str.replace(/\s*/g, '')
      console.log('str:', str)
      if (str === '') {
        this.isShowErr = true
        return false
      } else {
        this.isShowErr = false
        return true
      }
    },

    // 保存
    doGoodsAdd () {
      let payload = {
        ...this.didiForm
      }
      this.$refs['didiForm'].validate((valid) => {
        if (this.checkValid() && valid) {
          if (this.$route.query.dotype === '0') {
            this.goodsAdd(payload).then(res => {
              this.$message.success('添加成功')
              this.$router.push({
                path: '/GoodsManagelist'
              })
            })
          }
          if (this.$route.query.dotype === '2') {
            this.goodsUpdate(payload).then(res => {
              if (res.code !== '200') {
                this.$message.error(res.mesg)
              } else {
                this.$message.success('编辑成功')
                this.$router.push({
                  path: '/GoodsManagelist'
                })
              }
            })
          }
          if (this.$route.query.dotype === '3') {
            this.goodsCopy(payload).then(res => {
              if (res.code !== '200') {
                this.$message.error(res.mesg)
              } else {
                this.$message.success('复制成功')
                this.$router.push({
                  path: '/GoodsManagelist'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },

    // 查看
    async getGoodsView () {
      if (this.$route.query.dotype !== '0') {
        let payload = {
          id: this.$route.query.id
        }
        this.goodsView(payload).then(res => {
          if (res) {
            this.didiForm = res
            this.getTypeList()
            this.getUserList()
          }
        })
      }
    },

    // 选择城市
    addressChange (arr) {
      let _arr = []
      arr.map((item, index) => {
        if (item !== '') {
          _arr.push(item)
        }
      })
      if (_arr.length === 0) { this.didiForm.address = '' }
      if (_arr.length === 1) { this.didiForm.address = `${CodeToText[_arr[0]]}` }
      if (_arr.length === 2) { this.didiForm.address = `${CodeToText[_arr[0]]}/${CodeToText[_arr[1]]}` }
      if (_arr.length === 3) { this.didiForm.address = `${CodeToText[_arr[0]]}/${CodeToText[_arr[1]]}/${CodeToText[_arr[2]]}` }
    },

    // 商品频道类目列表
    _getDictionariesByType () {
      let payload = {
        type: 0
      }
      this.getDictionariesByType(payload).then(res => {
        this.releaseChannelList = res
      })
    },

    // 商户频道change事件
    releaseChange () {
      // 清空类目和供应商
      this.didiForm.category = ''
      this.didiForm.merchantId = ''
      this.getTypeList()
      this.getUserList()
    },

    // 获取供应商名称
    getUserList () {
      let payload = {
        releaseChannel: this.didiForm.releaseChannel
      }
      this.selectForReleaseChannel(payload).then(res => {
        this.userLists = res
      })
    },

    // 商品类目
    getTypeList () {
      let payload = {
        type: this.didiForm.releaseChannel
      }
      this.getDictionariesByType(payload).then(res => {
        this.typeLists = res
      })
    },
    ...mapActions(['goodsAdd', 'goodsView', 'goodsUpdate', 'goodsCopy', 'goodsCategory', 'merchantSelectList', 'getDictionariesByType', 'selectForReleaseChannel'])
  },
  created () {
    switch (this.$route.query.dotype) {
      case '0':
        this.title = '创建'
        break
      case '1':
        this.title = '查看'
        break
      case '2':
        this.title = '编辑'
        break
      case '3':
        this.title = '复制'
        break
    }
    console.log('title', this.title)
    let temp = regionDataPlus.filter(item => {
      return item.label !== '全部'
    })
    this.options = temp
    this.getGoodsView()
    this._getDictionariesByType()
  }
}
</script>
<style lang="less" scoped>
.tooltip_tips_parent{
  position: relative;
  .tooltip_tips{
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: -26px;
    .icongantanhao-quan{
      color:#fd9054;
    }
  }
}
.red{
  margin-left: -70px;
  display: inline-block;
}
.editor{
  margin-top: -25px;
}
.error_mes{
  color:#F56C6C;
  font-size:12px;
}
.goods_page {
  width: 100%;
  padding: 0 30px;
  margin-bottom: 50px;
}
.form_wrap {
  width: 1000px;
  display: flex;
  align-content: space-between;
  justify-content: space-between;
  flex-wrap: wrap;
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-input__inner {
    font-size: 12px;
  }
}
.goods_blocks_wrap {
  border: 1px solid #dddddd;
}
.goods_blocks {
  width: 100%;
  padding: 16px 20px 40px;
  .goods_blocks_item {
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    // justify-content: space-between;
    /deep/ .el-form-item__label {
      text-align: right;
    }
  }
  .goods_blocks_title {
    font-weight: 600;
    margin-bottom: 30px;
  }
}
.goods_blocks_edit {
  height: 40px;
  width: 100%;
  background: #f8f8f8;
  line-height: 40px;
  .goods_blocks_edit_block {
    width: 90px;
    display: flex;
    justify-content: space-around;
    font-size: 17px;
    height: 100%;
    align-items: center;
    float: right;
    .red {
      color: #ff6868;
      font-size: 24px;
      cursor: pointer;
    }
    .green {
      color: #36e3d9;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
/deep/ .el-input--small, /deep/ .el-input__inner {
  width: 400px;
  line-height: 1;
}
/deep/ .c12-input, /deep/ .el-input__inner {
  width: 100%;
  line-height: 1;
}

/deep/ .el-select,
/deep/ .el-select--mini {
  width: 400px;
}
/deep/ .el-tooltip__popper.is-light {
  background: #fff;
  border: 1px solid #fff;
}
.tips_wrap {
  width: 300px;
  display: flex;
  height: 100%;
  font-size: 12px;
  color: #fd9054;
  height: 32px;
  align-items: center;
  justify-content: space-between;
  .tips {
    padding: 0 18px;
    display: inline-block;
    border: 1px solid #fd9054;
    height: 32px;
    line-height: 32px;
    position: relative;
    cursor: pointer;
    background: #fff4ee;
    border-radius: 3px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      border: 5px solid;
      border-radius: 3px;
      border-color: transparent #fd9054 #fd9054 transparent;
    }
  }
  .intips {
    padding: 0 18px;
    display: inline-block;
    border: 1px solid #fd9054;
    height: 32px;
    line-height: 32px;
    position: relative;
    cursor: pointer;
    border-radius: 3px;
  }
  .tips_text {
    color: #fd9054;
    width: 210px;
    display: inline-block;
  }
}
.el-icon-more {
  transform: rotate(90deg);
  cursor: pointer;
}
.upload_block {
  width: 52px;
  height: 52px;
  line-height: 52px;
  display: inline-block;
  background: #f6f6f6;
}
.upload_tip {
  color: #fd9054;
}
.upload /deep/ .el-upload--picture-card {
  display: flex;
  background-color: #fff;
  border: 0;
  width: 100%;
  height: 100%;
}
.uplaod_add_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
  border: 1px solid #f6f6f6;
  border-radius: 2px;
  width: 57px !important;
  height: 57px !important;
  line-height: 57px !important;
}
.cover {
  position: absolute;
  width: 57px;
  height: 57px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.cover:hover {
  opacity: 1;
}
.avatar-uploader-icon {
  font-size: 24px;
  line-height: 57px;
  text-align: center;
  width: 57px;
  height: 57px;
}
.delete-img {
  color: #fff;
  font-size: 18px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 57px !important;
  height: 57px !important;
  border-radius: 0;
  border: 0;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 57px !important;
  height: 57px !important;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-actions {
  font-size: 14px;
}
/deep/ .el-form-item.proDes{
  width: 880px;
  height: auto
}
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.release_channel {
  .release_channel_item {
    /deep/ .el-checkbox__inner {
      display: none !important;
    }
    /deep/ .el-checkbox__label {
      border: 1px solid #fd9054;
      padding: 5px 20px;
      border-radius: 3px;
      color: #fd9054;
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      background: #fff4ee;
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 5px solid;
        border-color: transparent #fd9054 #fd9054 transparent;
      }
    }
  }
}
.selectTime{
  .endTimeClass{
    margin-left: -115px;
  }
  .el-form-item{
    display: inline-block;
  }
  .el-date-editor{
    width: 190px;
  }
}
</style>
<style>
.el-cascader-panel {
  font-size: 12px !important;
}
input {
  line-height: normal;
}
</style>
