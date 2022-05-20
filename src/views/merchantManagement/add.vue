<!--
 * @Descripttion: 供应商管理
 * @Author: huangfuchunmei
 * @Date: 2021-03-31 13:57:29
 * @LastEditors: wangyu
 * @LastEditTime: 2021-05-11 10:40:00
-->
<template>
  <div id="merchant" class="main_wrap">
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{routerName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ModuleTitle>
      <p slot="title">{{routerName}}</p>
      <p slot="btnGroup">
        <el-button size="small" class="cancel" v-if="type === 'new'" @click="goback">取消</el-button>
        <el-button size="small" type="primary" v-if="type === 'new' || type == 'update' " @click="saveMerchant()">保存</el-button>
        <el-button size="small" class="backBtn" v-if="type === 'update' || type === 'view'" @click="goback">返回</el-button>
      </p>
    </ModuleTitle>
    <div class="content_box">
       <el-form
        :model="merchantForm"
        :rules="rules"
        ref="merchantForm"
        class="merchantForm"
        label-width="120px"
        label-position="right">
        <div class="row">
          <el-form-item label="商户频道" prop="releaseChannel">
            <el-select v-model="merchantForm.releaseChannel" placeholder="请选择商户频道" clearable>
              <el-option
                v-for="item in releaseChannelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户名称" prop="merchantName">
            <el-input v-model.trim="merchantForm.merchantName"
                      maxlength='20'
                      placeholder="请填写1-20位供应商名称"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="营业执照名称" prop="businessCertificateName">
            <el-input v-model.trim="merchantForm.businessCertificateName"
                      maxlength='20'
                      placeholder="请填写1-20位营业执照名称"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
          <el-form-item label="主营业务" prop="mainBusiness">
            <el-tooltip popper-class="tooltip_box_wrap"
                        effect="dark"
                        :content="merchantForm.mainBusiness"
                        placement="top-start"
                        v-if="merchantForm.mainBusiness.length > 1000 && disabled">
              <el-input v-model.trim="merchantForm.mainBusiness"
                        maxlength='1000'
                        placeholder="请填写1-1000位的主营业务"
                        :disabled="disabled">
              </el-input>
            </el-tooltip>
            <el-input v-else
                      v-model.trim="merchantForm.mainBusiness"
                      maxlength='1000'
                      placeholder="请填写1-1000位的主营业务"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="营业执照注册号" prop="businessCertificateNumber">
            <el-input v-model.trim="merchantForm.businessCertificateNumber"
                      maxlength='18'
                      placeholder="请填写最大18位的营业执照注册号"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
          <el-form-item label="LOGO" prop="logo">
             <el-upload
              class="upload"
              :action="uploadUrl"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="(res,file)=>{handleAvatarSuccess('logo',res,file)}"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
            >
              <img :src="merchantForm.logoFullPath"
                   v-if="merchantForm.logo"
                   alt="LOGO"
                   style="width:55px;height:55px" />
              <i v-else class="iconfont iconjiahao avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="经营许可证" prop="businessLicense">
             <el-upload
              class="upload"
              :action="uploadUrl"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="(res,file)=>{handleAvatarSuccess('businessLicense',res,file)}"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
            >
              <img :src="merchantForm.businessLicenseFullPath"
                   v-if="merchantForm.businessLicense"
                   alt="经营许可证"
                   style="width:55px;height:55px" />
              <i v-else class="iconfont iconjiahao avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业执照照片"
                        prop="businessCertificatePhoto">
             <el-upload
              class="upload"
              :action="uploadUrl"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="(res,file)=>{handleAvatarSuccess('businessCertificatePhoto',res,file)}"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
            >
              <img :src="merchantForm.businessCertificatePhotoFullPath"
                   v-if="merchantForm.businessCertificatePhoto"
                   alt="营业执照照片"
                   style="width:55px;height:55px" />
              <i v-else class="iconfont iconjiahao avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="营业许可证" prop="manageLicense">
             <el-upload
              class="upload"
              :action="uploadUrl"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="(res,file)=>{handleAvatarSuccess('manageLicense',res,file)}"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
            >
              <img :src="merchantForm.manageLicenseFullPath"
                   v-if="merchantForm.manageLicense"
                   alt="营业许可证"
                   style="width:55px;height:55px" />
              <i v-else class="iconfont iconjiahao avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!--<el-form-item label="经营执照注册号"-->
                        <!--prop="manageCertificateNumber">-->
            <!--<el-input v-model.trim="merchantForm.manageCertificateNumber"-->
                      <!--maxlength='18'-->
                      <!--placeholder="请填写最大18位的经营执照注册号"-->
                      <!--:disabled="disabled">-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="营业执照所在地"
                        prop="businessCertificateAddress">
            <el-input v-model.trim="merchantForm.businessCertificateAddress"
                      maxlength='20'
                      placeholder="请填写1-20位的营业执照所在地"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="商户地址" prop="merchantAddressCode">
            <el-cascader v-model.trim="merchantForm.merchantAddressCode"
                         placeholder="请选择商户地址"
                         :options="options"
                         @change="addressChange"
                         :disabled="disabled"/>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobilePhone">
            <el-input v-show="phoneShow"
                      v-model.trim="merchantForm.mobilePhone"
                      placeholder="请填写联系电话"
                      maxlength="13"
                      :disabled="disabled"
                      @blur="phoneBlur">
            </el-input>
            <span v-show="!phoneShow" class="phoneTxt" @click="phoneFocus">
              {{merchantForm.mobilePhone | phone}}
            </span>
          </el-form-item>
        </div>
         <div class="row">
           <el-form-item label="支付分账账号" prop="payMerchantId">
             <el-input v-model.trim="merchantForm.payMerchantId" placeholder="请输入支付中台分账账号" :disabled="disabled"></el-input>
           </el-form-item>
           <el-form-item label="支付分润比例" prop="profitSharingRatio">
             <el-input v-model.trim="merchantForm.profitSharingRatio" maxlength='2' placeholder="请填写比例,如：分润比例为3%，则填写3" :disabled="disabled"></el-input>
           </el-form-item>
         </div>
        <div class="row">
          <el-form-item class="remark" label="业务简介" prop="businessProfile">
            <el-tooltip popper-class="tooltip_box_wrap"
                        effect="dark"
                        :content="merchantForm.businessProfile"
                        placement="top-start"
                        v-if="merchantForm.businessProfile.length > 21 && disabled">
              <el-input type="textarea"
                        v-model.trim="merchantForm.businessProfile"
                        maxlength='50'
                        placeholder="请填写1-50位的业务简介"
                        :disabled="disabled">
              </el-input>
            </el-tooltip>
            <el-input type="textarea"
                      v-else
                      v-model.trim="merchantForm.businessProfile"
                      maxlength='50'
                      placeholder="请填写1-50位的业务简介"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
          <el-form-item class="remark" label="提供服务范围" prop="serviceScope">
            <el-tooltip popper-class="tooltip_box_wrap"
                        effect="dark"
                        :content="merchantForm.serviceScope"
                        placement="top-start"
                        v-if="merchantForm.serviceScope.length > 21 && disabled">
              <el-input type="textarea"
                        v-model.trim="merchantForm.serviceScope"
                        maxlength='200'
                        placeholder="请填写1-200位提供服务范围"
                        :disabled="disabled"></el-input>
            </el-tooltip>
            <el-input type="textarea" v-else
                      v-model.trim="merchantForm.serviceScope"
                      maxlength='200'
                      placeholder="请填写1-200位提供服务范围"
                      :disabled="disabled">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
import rules from '@/api/rules.js'
import {regionData, CodeToText} from 'element-china-area-data'
export default {
  data () {
    return {
      merchantForm: {
        merchantName: null, // 商户名称
        logo: '', // 供应商LOGO
        mainBusiness: '', // 主营业务
        businessLicense: '', // 营业许可证
        manageLicense: '', // 经营许可证
        businessCertificatePhoto: '', // 营业执照照片
        businessCertificateName: null, // 营业执照名称
        businessCertificateNumber: null, // 营业执照注册号
        manageCertificateNumber: null, // 经营执照注册号
        businessCertificateAddress: '', // 营业执照所在地
        merchantAddress: null, // 供应商地址
        merchantAddressCode: [], // 供应商地址编码
        mobilePhone: null, // 联系电话
        payMerchantId: '', // 分账账号
        profitSharingRatio: null, // 分润比例
        businessProfile: '', // 业务简介
        serviceScope: '', // 提供服务范围
        releaseChannel: [], // 发布渠道
        userIds: [], // 管理员id
        logoFullPath: '', // 供应商LOGO
        businessLicenseFullPath: '', // 营业许可证
        manageLicenseFullPath: '', // 经营许可证
        businessCertificatePhotoFullPath: '' // 营业执照照片
      },
      type: 'new',
      disabled: false,
      rules: {
        releaseChannel: [{required: true, message: '请选择商户频道', trigger: ['blur']}],
        merchantName: [{required: true, message: '请您输入商户名称', trigger: ['blur', 'change']}],
        mainBusiness: [{required: true, message: '请您输入主营业务', trigger: ['blur', 'change']}], // 主营业务
        businessLicense: [{required: true, message: '请您上传经营许可证', trigger: ['blur', 'change']}], // 营业许可证
        manageLicense: [{required: true, message: '请您上传营业许可证', trigger: ['blur', 'change']}], // 经营许可证
        businessCertificatePhoto: [{required: true, message: '请您上传营业执照照片', trigger: ['blur', 'change']}], // 营业执照照片
        businessCertificateName: [{required: true, message: '请您输入营业执照名称', trigger: ['blur', 'change']}], // 营业执照名称
        businessCertificateNumber: [{required: true, validator: rules.FormValidate.Form('营业执照注册号').validateCertificateNumber, trigger: ['blur', 'change']}], // 营业执照注册号
        manageCertificateNumber: [{required: true, validator: rules.FormValidate.Form('经营执照注册号').validateCertificateNumber, trigger: ['blur', 'change']}], // 经营执照注册号
        businessCertificateAddress: [{required: true, message: '请您输入营业执照所在地', trigger: ['blur', 'change']}], // 营业执照所在地
        merchantAddressCode: [{required: true, message: '请您选择商户地址', trigger: ['blur', 'change']}], // 供应商地址
        mobilePhone: [{required: true, validator: rules.FormValidate.Form().validateContactInfo, trigger: ['blur', 'change']}], // 联系电话格
        businessProfile: [{required: true, message: '请您输入业务简介', trigger: ['blur', 'change']}], // 业务简介
        serviceScope: [{required: true, message: '请您输入提供服务范围', trigger: ['blur', 'change']}]//, // 提供服务范围
      },
      releaseChannelList: [],
      options: regionData,
      userLists: [],
      checkAllReportType: false,
      uploadUrl: this.BASEURL + '/o/file/upload', // 上传
      limitCount: 1,
      phoneShow: true,
      routerName: '创建供应商'
    }
  },
  methods: {
    // 上传图片之前
    beforeAvatarUpload (file) {
      let FileExt = file.name.replace(/.+\./, '').toLowerCase()
      let flag = ['png', 'jpeg', 'jpg'].includes(FileExt)
      let isPixel = file.size
      if (!flag) {
        this.$message.warning('允许上传图片格式jpg、png、jpeg')
        return false
      }
      if (isPixel > 2 * 1024 * 1024) {
        this.$message.warning('请您上传小于等于2MB的图片')
        return false
      }
      return flag && isPixel
    },

    // 上传成功
    handleAvatarSuccess (name, res, file) {
      console.log(name)
      switch (name) {
        case 'logo':
          this.merchantForm.logoFullPath = file.response.data.fileUrl
          this.merchantForm.logo = file.response.data.fileId
          break
        case 'businessLicense':
          this.merchantForm.businessLicenseFullPath = file.response.data.fileUrl
          this.merchantForm.businessLicense = file.response.data.fileId
          break
        case 'manageLicense':
          this.merchantForm.manageLicenseFullPath = file.response.data.fileUrl
          this.merchantForm.manageLicense = file.response.data.fileId
          break
        case 'businessCertificatePhoto':
          this.merchantForm.businessCertificatePhotoFullPath = file.response.data.fileUrl
          this.merchantForm.businessCertificatePhoto = file.response.data.fileId
          break
      }
      this.$refs.merchantForm.clearValidate(name)
    },

    // 处理图片预览效果
    handlePreview (file) {
      this.previewPath = file.url
      this.previewVisible = true
    },

    // 选择供应商管理员
    selectedItemChange (val) {
      if (val.length === this.userLists.length) {
        this.checkAllReportType = true
      } else {
        this.checkAllReportType = false
      }
    },

    // 供应商地址
    addressChange (arr) {
      console.log(arr)
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]])
      this.merchantForm.merchantAddress = `${CodeToText[arr[0]]}${CodeToText[arr[1]]}${CodeToText[arr[2]]}`
    },

    // 联系电话加密
    phoneBlur () {
      // 电话
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      // 座机号
      let landline = /^([0-9]{3,4}-)?[0-9]{7,8}$/ // 0571-86295197
      // 座机1
      let landline1 = /^\d{3,4}-\d{3,4}-\d{3,4}$/ // 4001-550-520
      let val = this.merchantForm.mobilePhone
      if (val && (phoneReg.test(val) || landline.test(val) || landline1.test(val))) {
        this.rules.mobilePhone[0].validator = rules.FormValidate.Form().validateContactInfo
        this.phoneShow = false
      } else {
        this.phoneShow = true
      }
    },

    phoneFocus () {
      this.phoneShow = true
    },

    // 点击全选
    checkAllClick (val) {
      this.merchantForm.userIds = val ? this.userLists.map(item => item.id) : []
    },

    // 查看详情
    getMerchantDetail () {
      this.type = this.$route.query.type
      // let routerArr = this.$route.matched
      if (this.$route.query.id && this.type === 'view') {
        // this.$route.matched[routerArr.length - 1].meta.routerName = '查看供应商'
        this.routerName = '查看供应商'
        this.phoneShow = false
        this.disabled = true
        this.merchantDetail(this.$route.query.id).then(res => {
          this.merchantForm = res
          this.logo = res.logo
          this.businessLicense = res.businessLicense
          this.manageLicense = res.manageLicense
          this.businessCertificatePhoto = res.businessCertificatePhoto
        })
      } else if (this.$route.query.id && this.type === 'update') {
        // this.$route.matched[routerArr.length - 1].meta.routerName = '查看供应商'
        this.routerName = '编辑供应商'
        this.phoneShow = false
        this.disabled = false
        this.merchantDetail(this.$route.query.id).then(res => {
          this.merchantForm = res
          this.logo = res.logo
          this.businessLicense = res.businessLicense
          this.manageLicense = res.manageLicense
          this.businessCertificatePhoto = res.businessCertificatePhoto
        })
      } else {
        this.routerName = '创建供应商'
        // this.$route.matched[routerArr.length - 1].meta.routerName = '新建供应商'
        this.disabled = false
      }
    },

    // 保存供应商
    saveMerchant () {
      this.$refs.merchantForm.validate(valid => {
        if (valid) {
          var payload = {}
          Object.keys(this.merchantForm).forEach(key => {
            if (this.merchantForm[key] != null) {
              payload[key] = this.merchantForm[key]
            }
          })
          if (this.type === 'update') {
            this.updateMerchant(payload)
          } else if (this.type === 'new') {
            this.newmerchant(payload)
          }
        }
      })
    },

    // 新增供应商
    newmerchant (data) {
      this.merchantAdd(data).then(res => {
        if (!res) {
          this.$message.success('新增成功')
          this.goback()
        }
      })
    },

    // 编辑供应商
    updateMerchant (data) {
      this.merchantUpdate(data).then(res => {
        this.$message.success('编辑成功')
        this.goback()
      })
    },

    // 返回
    goback () {
      this.$router.back()
    },

    // 商户频道类目列表
    _getDictionariesByType () {
      let payload = {type: 0}
      this.getDictionariesByType(payload).then(res => {
        this.releaseChannelList = res
      })
    },
    ...mapActions(['userList', 'merchantAdd', 'merchantDetail', 'merchantUpdate', 'getDictionariesByType'])
  },
  created () {
    this.getMerchantDetail()
    this._getDictionariesByType()
  }
}
</script>
<style lang="less" scoped>
  #merchant{
    width: 100%;
    // height: 100%;
    font-size: 12px;
    color: #333;
    .content_box{
      max-width: 980px;
    }
    .row {
      display: flex;
      justify-content: space-between;
    }
    .merchantForm {
      // width: 980px;
      // display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
      .el-form-item.asterisk {
        /deep/.el-form-item__label::before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
      }
      .remark{
        /deep/ .el-textarea__inner{
          background-color: #f6f6f6;
          border:1px solid #fff;
          font-family: 微软雅黑;
        }
      }
      .el-form-item {
        width: 450px;
        position: relative;
        /deep/ .el-form-item__content {
          line-height: 1;
        }
        /deep/ .el-form-item__label {
          line-height: 34px;
          text-align: right;
          font-size: 12px;
        }
        /deep/ .el-input__inner {
          font-size: 14px;
          border: none;
          background: #f6f6f6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1;
        }
        /deep/ .el-select {
          width: 100%;
        }
      }
      .release_channel{
        .release_channel_item{
          /deep/ .el-checkbox__inner{
            display: none !important;
          }
          /deep/ .el-checkbox__label{
            border: 1px solid #fd9054;
            padding: 5px 20px;
            border-radius: 3px;
          }
          /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
            background: #fff4ee;
            &::after{
              content: '';
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
      .el-cascader{
        width: 330px;
      }
    }
  }
  .phoneTxt{
    display: inline-block;
    width:330px;
    padding: 0 15px;
    color: #666;
    font-size:14px;
    height: 34px!important;
    line-height: 34px;
    border-radius: 2px;
    // margin-top: 10px;
    background: #f6f6f6;
    // border: 1px solid #f6f6f6;
  }
  .upload /deep/ .el-upload--picture-card{
    background-color: #f6f6f6;
    border: 1px solid #f6f6f6;
    border-radius: 2px;
    width: 57px !important;
    height: 57px !important;
    line-height: 57px !important;
  }
  .avatar-uploader-icon {
    font-size: 24px;
    line-height: 57px;
    text-align: center;
    width: 57px;
    height: 57px;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item{
    width: 55px !important;
    height: 55px !important;
  }
  .img_style{
    width: 55px !important;
    height: 55px !important;
    border-radius: 2px;
  }
  .checkAll {
    position: relative;
    color: #fd9054;
    line-height: 34px;
    padding: 0 20px;
    font-size: 12px;
    .el-checkbox {
      margin: 0;
      display: inline-block;
      width: 100%;
    }
    /deep/.el-checkbox__input {
      position: absolute;
      left: 0;
      opacity: 0;
    }
    /deep/ .el-checkbox__label {
      padding-left: 0;
      font-size: 12px !important;
    }
    .check-icon::after {
      position: absolute;
      right: 20px;
      font-family: element-icons;
      content: '\E611';
      font-size: 12px;
      font-weight: 700;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .avatar {
      width: 55px;
      height: 55px;
      display: block;
    }
  }
</style>
<style>
.tooltip_box_wrap{
  max-width: 420px;
}
</style>
