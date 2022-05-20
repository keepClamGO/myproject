/**
 * @author 王宇
 * @date 2020/1/2
 * @Description: 校验公共方法
 */
// 账号
let codeReg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/

// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/

// 八位整数 小数点两位
let memFeeReg = /^\d{0,8}(\.\d{0,2})?$/

// 不带小数点的纯数字
let number = /^\d+$/

// ID
let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// email
let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

// 邮件服务器端口
let port = /^\d{2,4}$/
// 邮箱密码
let pwd = /[^\u4e00-\u9fa5]+$/

// 登陆密码
// let password = /^[\da-zA-Z~!@#$%^&*.]{4,20}$/

// 管理员账号密码
let Account = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*.])[\da-zA-Z~!@#$%^&*.]{4,20}$/

// 税号
let dutyNumber = /^([0-9ABCDEFGHJKLMNPQRTUWXY]{2})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{10})$/

// 座机号
let landline = /^([0-9]{3,4}-)?[0-9]{7,8}$/ // 0571-86295197

// 座机1
let landline1 = /^\d{3,4}-\d{3,4}-\d{3,4}$/ // 4001-550-520

// 营业执照注册号15位营业执照
// let License registration number = /^\d{15}$/

// 营业执照注册号验证18位的正则表达式
// let License registration number = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/

// 营业执照注册号一起兼容验证就是
let registrationReg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/

let FormValidate = (function () {
  function FormValidate () {}
  // From表单验证规则  可用于公用的校验部分
  // errorTip 提示文案变量
  FormValidate.Form = function (errorTip) {
    return {
      noEmpty (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error(`${errorTip}不可为空`))
        } else {
          callback()
        }
      },
      // 登陆密码
      validateUserPassword (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error(`请输入${errorTip}`))
        } else if (!Account.test(value)) {
          callback(new Error(`请输入最大20位字符的大小写字母数字和特殊符号的${errorTip}`))
        } else {
          callback()
        }
      },
      // 管理员账号
      validateAccount (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error('请您输入管理员账号'))
        } else if (!Account.test(value)) {
          callback(new Error('请您输入4-20位大小写字母数字和特殊符号的管理员账号'))
        } else {
          callback()
        }
      },
      // 管理员密码
      validatePassword (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error('请您输入密码'))
        } else if (!Account.test(value)) {
          callback(new Error('请您输入4-20位大小写字母数字和特殊符号的密码'))
        } else {
          callback()
        }
      },
      // 账号的验证规则
      validateCode (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        if (!codeReg.test(value)) {
          callback(new Error('账号必须为6-20位字母和数字组合'))
        } else {
          callback()
        }
      },

      // 只能数字的验证
      validateNumber (rule, value, callback) {
        if (value !== '') {
          if (!numberReg.test(value)) {
            callback(new Error('只允许输入数字'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 账号邮箱必填的验证规则
      validateEmailAccount (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入公司邮箱'))
        }
        if (!emailReg.test(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      },

      // 邮箱的验证规则 非必填
      validateEmail (rule, value, callback) {
        if (value) {
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式不正确'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhone (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      },

      // 电话号码的验证，非必填
      validatePhoneNoRequired (rule, value, callback) {
        if (value && value !== '') {
          if (!phoneReg.test(value)) {
            callback(new Error('请输入正确的手机号码'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 身份证的验证规则
      ID (rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },

      // 税号的验证规则
      validateDutyNumber (rule, value, callback) {
        if (!value) {
          return callback(new Error('税号不可为空'))
        }
        if (!dutyNumber.test(value)) {
          callback(new Error('税号格式不正确'))
        } else {
          callback()
        }
      },

      // 座机号码验证
      validateLandline (rule, value, callback) {
        if (value) {
          if (!landline.test(value)) {
            callback(new Error('座机号码格式不正确'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 联系方式校验
      validateContactInfo (rule, value, callback) {
        if (!value) {
          return callback(new Error('请您输入联系电话'))
        }
        if (value) {
          if (phoneReg.test(value) || landline.test(value) || landline1.test(value)) {
            callback()
          } else {
            callback(new Error('请您输入正确的座机或手机号码'))
          }
        } else {
          callback()
        }
      },

      // 营业执照/经营执照号码
      validateCertificateNumber (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error(`请您输入${errorTip}`))
        } else if (!registrationReg.test(value)) {
          callback(new Error(`请您输入正确的${errorTip}`))
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhones (rule, value, callback) {
        if (!value) {
          return callback(new Error('登录账号不可为空'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('登录账号格式不正确'))
        } else {
          callback()
        }
      },

      // 数字类型
      validateNumbers (rule, value, callback) {
        if (!value) {
          return callback(new Error('用户编码不可为空'))
        }
        if (!number.test(value)) {
          callback(new Error('用户编码格式不正确'))
        } else {
          callback()
        }
      },

      // 账号邮箱必填的验证规则
      validateEmailAccounts (rule, value, callback) {
        if (!value) {
          return callback(new Error('电子邮箱不可为空'))
        }
        if (!emailReg.test(value)) {
          callback(new Error('电子邮箱格式错误'))
        } else {
          callback()
        }
      },

      // 邮箱端口
      validatePort (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error('请输入邮件发送端口'))
        } else if (!port.test(value)) {
          callback(new Error('请输入正确的邮件发送端口'))
        } else {
          callback()
        }
      },

      // 密码
      validatePwd (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error('请输入密码'))
        } else if (!pwd.test(value)) {
          callback(new Error('密码不正确'))
        } else {
          callback()
        }
      },

      // 邮箱格式
      validateMail (rule, value, callback) {
        if (value === '' || value === null) {
          callback(new Error('请输入测试邮箱地址'))
        } else if (!emailReg.test(value)) {
          callback(new Error('测试邮箱地址格式不正确，请输入正确的测试邮箱地址'))
        } else if (value.length > 50) {
          callback(new Error('测试邮箱地址不可超过50个字符'))
        } else {
          callback()
        }
      },
      number (rule, value, callback) {
        if (!number.test(value) && !(value === '' || value === null || value === undefined)) {
          callback(new Error(`请您输入最大20位数字的${errorTip}，支持整数不支持小数`))
        } else {
          callback()
        }
      },
      numberPoint (rule, value, callback) {
        if (!numberReg.test(value) && !(value === '' || value === null || value === undefined)) {
          callback(new Error(`请您输入最大20位数字的${errorTip}，支持整数和小数`))
        } else {
          callback()
        }
      },
      numberPoint1 (rule, value, callback) {
        if (!numberReg.test(value) && !(value === '' || value === null || value === undefined)) {
          callback(new Error(`请您输入最大8位数字的${errorTip}，支持整数和小数`))
        } else {
          callback()
        }
      },
      mustNumber (rule, value, callback) {
        if (value === '' || value === null || value === undefined) {
          callback(new Error(`请您输入${errorTip}`))
        } else if (!number.test(value)) {
          callback(new Error(`请您输入最大8位数字的${errorTip}，支持整数不支持小数`))
        } else {
          callback()
        }
      },
      mustNumberPoint (rule, value, callback) {
        if (value === '' || value === null || value === undefined) {
          callback(new Error(`请您输入${errorTip}`))
        } else if (!numberReg.test(value)) {
          callback(new Error(`请您输入最大8位数字的${errorTip}，支持整数和小数`))
        } else {
          callback()
        }
      },
      NumberPrice (rule, value, callback) {
        if (value && Number(value) <= 0) {
          callback(new Error(`不能输入负数和0`))
        } else if (value && !memFeeReg.test(value)) {
          callback(new Error(`只能输入数字，支持8位整数，小数点后两位`))
        } else {
          callback()
        }
      },
      mustNumberPrice (rule, value, callback) {
        if (value === '' || value === null || value === undefined) {
          callback(new Error(`请您输入${errorTip}`))
        } else if (value && Number(value) <= 0) {
          callback(new Error(`不能输入负数和0`))
        } else if (!memFeeReg.test(value)) {
          callback(new Error(`只能输入数字，支持8位整数，小数点后两位`))
        } else {
          callback()
        }
      }
    }
  }
  return FormValidate
}())

exports.FormValidate = FormValidate
