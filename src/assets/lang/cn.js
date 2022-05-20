/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:16:17
 * @LastEditTime: 2019-10-16 10:22:51
 * @LastEditors: Please set LastEditors
 */
// 登录页
const login = {
  'key_copyright': '© 2018 博彦科技股份有限公司 版权所有',
  'key_account_login': '账号登录',
  'key_account': '账号',
  'key_password': '密码',
  'key_qiehuanyuyan': '中文',
  'key_user_verification_code_not_send_error': '验证码获取失败',
  'key_user_captcha_code_not_such_error': '图形验证码不匹配',
  'key_user_info_not_such_error': '输入的用户信息不匹配',
  'key_user_verification_code_time_out_error': '验证码超时请重新获取',
  'key_user_verification_code_not_such_error': '验证码不匹配',
  'key_user_tenant_lock_error': '用户已被锁定，请联系管理员！',
  'key_user_ip_address_not_allow_error': '您正在没有授权的设备上登录,登录失败',
  'key_xiugaimima': '修改密码',
  'key_company_expiry_date_error': '到期提醒日不能小于开始日期并且不能大于结束日期',
  'key_company_start_end_time_error': '开始日期不能大于结束日期',
  'key_user_username_error': '请输入正确的账号',
  'key_user_password_error': '请输入正确的密码',
  'key_maohao': '：',
  'key_not_in_force': '账号未生效',
  'key_out_time': '该管理员已过期，请联系系统管理员',
  'key_employee_count_is_exceed': '部门已满编',
  'key_dept_plan_employee_count_is_exceed': '部门编制人数超编',
  'key_plan_employee_count_is_exceed': '公司编制人数超编',
  'key_payroll_not_publish': '该工资单未发布',
  'key_company_start_time_invalid': '开始日期不能小于租户开始日期',
  'key_company_end_time_invalid': '结束日期不能大于租户结束日期',
  'key_employee_company_email_is_repeat': '公司邮箱重复',
  'key_employee_personal_email_is_repeat': '个人邮箱重复',
  'key_become_full_worker_month_not_adjust': '转正当月不可调薪'
}
// 首页
const mainIndex = {
  'key_peizhi': '配置',
  'key_sui': '岁',
  'key_nian': '年',
  'key_nianyixia': '年以下',
  'key_suiyixia': '岁以下',
  'key_doctor': '博士',
  'key_master': '硕士',
  'key_undergraduate': '本科',
  'key_junior_college': '大专',
  'key_high_school': '高中',
  'key_other_qualification': '其他',
  'key_other_marriage_sex': '其他',
  'key_nianyishang': '年以上',
  'salary_calculation_error': '薪资计算异常',
  'key_suiyishang': '岁以上',
  'key_unmarried_male': '未婚-男',
  'key_unmarried_female': '未婚-女',
  'key_married_male': '已婚-男',
  'key_married_female': '已婚-女',
  'key_xingbieyuhunyin': '性别婚姻统计',
  'key_yuangongnianlintongji': '年龄统计',
  'key_yuangongxuelitongji': '学历统计',
  'key_yuangongnianxiantongji': '入职年限统计',
  'key_yuangongshutongji': '员工信息',
  'key_liuchengzhongxin': '通知中心',
  'key_dangqianzaizhi': '当前在职',
  'key_benyueruzhi': '本月入职',
  'key_benyuelizhi': '本月离职',
  'key_bank offer': '银行报盘',
  'key_salary_book_manage': '薪资账套管理',
  'key_attendance_manage': '考勤管理',
  'key_payroll_management': '工资单管理',
  'key_payroll_template': '工资单模板',
  'key_personal_center': '个人中心',
  'key_personal_data': '个人资料',
  'key_personal_shortcut': '快捷方式',
  'key_payroll_processing': '薪资核算',
  'key_salary_setup': '薪资设置',
  'key_payroll': '工资单',
  'key_salary_manager': '薪酬管理',
  'key_employee_salary_manger': '员工薪资管理',
  'key_salary_archives': '薪资方案',
  'key_salary_manager_setting': '薪酬设置',
  'key_salary_items_setting': '薪资项设置',
  'key_organization': '组织架构',
  'key_organization_manager': '组织管理',
  'key_department_manager': '部门管理',
  'key_salary_calculation': '薪资计算',
  'key_default_template_not_exists': '不存在该薪资方案默认工资单模板',
  'key_salary_calculation_list': '薪资计算结果',
  'key_employee_changes': '员工异动',
  'key_time_manage': '时间管理',
  'key_attendance': '考勤计算管理',
  'key_organize_snapshot': '组织架构图',
  'key_social_security_manager': '福利管理',
  'key_housing_fund_programme': '公积金方案',
  'key_social_security_setting': '社保管理设置',
  'key_social_calculation': '社保计算',
  'key_social_calculation_info': '社保计算明细',
  'key_employee_manager': '员工管理',
  'key_employee': '员工档案',
  'key_fund_policy_setting': '公积金管理设置',
  'key_employee_roster_report_list_company': '花名册报表',
  'key_org': '职位架构',
  'key_system_setup': '系统设置',
  'key_report_management': '报表管理',
  'key_dictionary': '数据字典',
  'key_social_calculation_result_calculation': '社保计算',
  'key_social_security_scheme': '社保方案',
  'key_social_account_set': '社保账套',
  'key_field_config': '字段配置',
  'key_baocunchenggong': '保存成功',
  'key_renyuanfenbu': '人员分布',
  'key_rulizhirenyuanfenbu': '入离职人员分布',
  'key_rulizhiqushi': '入离职趋势',
  'key_lizhisilingfenbu': '离职司龄分布',
  'key_ruzhirenyuanbumenfenbu': '入职人员部门分布',
  'key_lizhirenyuanbumenfenbu': '离职人员部门分布',
  'key_employee_welfare': '员工福利管理',
  'key_welfare_movement': '福利异动',
  'key_welfare_supplement': '福利补缴',
  'key_welfare_programme': '福利方案',
  'key_welfare_account': '福利帐套',
  'batchNo_data_not_exists': '不存在该批次号数据',
  'snapshot_data_empty': '计算快照数据为空',
  'social_calculation_error': '社保计算异常',
  'key_bank_offer_manage': '报盘管理',
  'key_payroll_setup': '工资单设置',
  'key_log_manage': '日志管理',
  'key_log_operate': '操作日志',
  'key_login_log': '登录日志',
  'key_employee_entry': '员工关系',
  'key_emp_set': '员工设置',
  'key_workflow': '审批管理',
  'key_workflow_manager': '审批管理',
  'key_social_management': '社保管理',
  'key_house_management': '公积金管理',
  'key_welfare_social_security_move': '社保异动',
  'key_housing_fund_security_move': '公积金异动',
  'key_employee_welfare_settings': '福利设置'
}
// 修改密码
const changePassword = {
  'key_user_old_password_error': '旧密码错误'
}
// 员工管理
const employee = {
  'key_yuangongguanli': '员工管理',
  'key_yuangongdangan': '员工档案',
  'key_zhongwenxingming': '中文姓名',
  'key_yingwenxingming': '英文姓名',
  'key_xinbie': '性别',
  'key_suoshubumen': '所属部门',
  'key_gangwei': '岗位',
  'key_zaizhizhuangtai': '在职状态',
  'key_yuangongleixing': '员工类型',
  'key_yonggongxingshi': '用工形式',
  'key_ruzhiriqi': '入职日期',
  'key_bangongdidian': '办公地点',
  'key_shoujihaoma': '手机号码',
  'key_bangongyouxiang': '办公邮箱',
  'key_yuangongbianhao': '员工编号',
  'key_gerenxinxi': '个人信息',
  'key_cengyongming': '曾用名',
  'key_guoji': '国籍',
  'key_minzu': '民族',
  'key_jiguan': '籍贯',
  'key_hunyinzhuangkuang': '婚姻状况',
  'key_zhengjianleixing': '证件类型',
  'key_zhengjianhaoma': '证件号码',
  'key_huzhaohaoma': '护照号码',
  'key_huzhaoyouxiaoqi': '护照有效期',
  'key_hukouleixing': '户口类型',
  'key_hujidizhi': '户籍地址',
  'key_xianjuzhudizhi': '现居住地址',
  'key_tongxundizhi': '通讯地址',
  'key_gongzuodi': '工作地',
  'key_jiaruqiangongling': '加入前工龄',
  'key_zhengzhimianmao': '政治面貌',
  'key_zuigaoxueli': '最高学历',
  'key_zuigaoxuewei': '最高学位',
  'key_jiankangzhuangkuang': '健康状况',
  'key_shengao': '身高',
  'key_tizhong': '体重',
  'key_dangandizhi': '档案地址',
  'key_shifoucanji': '是否残疾',
  'key_shifouwaiji': '是否外籍',
  'key_chushengriqi': '出生日期',
  'key_touxiang': '头像',
  'key_wenjiangeshibuzhengque': '文件格式不正确',
  'key_shangchuanwenjiandaxiaobunengchaoguo1mb': '上传文件大小不能超过1MB',
  'key_shangchuanshibaiqingshaohouzaishi': '上传失败请稍后在试',
  'key_shangchuanchenggong': '上传成功',
  'key_hetongxinxi': '合同信息',
  'key_qiandingdanwei': '签订单位',
  'key_kaishishijian': '开始时间',
  'key_hetongbianhao': '合同编号',
  'key_jiezhishijian': '截止时间',
  'key_hetongleixing': '合同类型',
  'key_qiandingleibie': '签订类别',
  'key_hetongzhuangtai': '合同状态',
  'key_qiandingcishu': '签订次数',
  'key_shiyongqiyue': '试用期(月)',
  'key_jiaoyujingli': '教育经历',
  'key_xuexiao': '学校',
  'key_zhuanye': '专业',
  'key_xueli': '学历',
  'key_xuewei': '学位',
  'key_qingshuruzhengquegeshideyouxiang': '请输入正确格式的邮箱',
  'key_shengyuzhuangkuang': '生育状况',
  'key_gerenyouxiang': '个人邮箱',
  'key_youxiao': '有效',
  'key_wuxiao': '无效',
  'key_cicaozuojiangshanchugaijiaoyujinglishifoujixu': '此操作将删除该教育经历, 是否继续?',
  'key_qingwanshanxinxihouzaijinxingtianjia': '请完善信息后在进行添加',
  'key_qingzhishaoshuruyixiang': '请至少输入一项，在进行提交',
  'key_jiatinggaikuang': '家庭概况',
  'key_xingming': '姓名',
  'key_guanxi': '关系',
  'key_lianxidizhi': '联系地址',
  'key_suozaidanwei': '所在单位',
  'key_lianxidianhua': '联系电话',
  'key_qingshurulianxirenxingming': '请输入联系人姓名',
  'key_qingshuruguanxi': '请输入关系',
  'key_qingshuruzhengquegeshidedianhua': '请输入正确格式的电话',
  'key_jinjilianxiren': '紧急联系人',
  'key_lianxirenxingming': '联系人姓名',
  'key_lianxirendianhua': '联系人电话',
  'key_bumenxinxi': '部门信息',
  'key_qiehuanzuzhi': '切换组织',
  'key_zanwushuju': '暂无数据',
  'key_zaizhi': '在职',
  'key_zhengshi': '正式',
  'key_paiqian': '派遣',
  'key_lizhi': '离职',
  'key_xinzengyuangong': '新增员工',
  'key_bianjiyuangong': '编辑员工',
  'key_daoru': '导入',
  'key_yuangongbianhaoxingmingshoujihaoshenfenzhenghao': '员工编号/姓名/手机号/身份证号',
  'key_gengduolie': '更多列',
  'key_yaungongguanli': '员工管理',
  'key_yuangonghuamingce': '员工花名册',
  'key_yuangongshezhi': '员工设置',
  'key_employee_roster': '员工花名册',
  'key_yuangong': '员工',
  'key_jichuxinxi': '基础信息',
  'key_qingxuanzexingbie': '请选择性别',
  'key_danganbianhao': '档案编号',
  'key_shenfenzhenghao': '身份证号',
  'key_shenfenzhengyouxiaoqi': '身份证有效期',
  'key_zhaopinqudao': '招聘渠道',
  'key_shijizhuanzhengriqi': '实际转正日期',
  'key_daizhuanzhengriqi': '待转正日期',
  'key_jinjilianxirendianhua': '紧急联系人电话',
  'key_zhiwei': '职位',
  'key_zhiji': '职级',
  'key_nianling': '年龄',
  'key_hukousuozaidi': '户口所在地',
  'key_gonglingnian': '工龄/年',
  'key_silingnian': '司龄/年',
  'key_zuigaozhuanye': '最高专业',
  'key_qingxuanzezuzhi': '请选择组织',
  'key_qingxuanzebumen': '请选择部门',
  'key_qingshuruyuangongbianhao': '请输入员工编号',
  'key_qingxuanzezaizhizhuangtai': '请选择在职状态',
  'key_qingxuanzezaizhiriqi': '请选择入职日期',
  'key_qingshuruzhongwenxingming': '请输入中文姓名',
  'key_qingshurushenfenzhenghao': '请输入身份证号',
  'key_qingxuanzeminzu': '请选择民族',
  'key_qingxuanzeguoji': '请选择国籍',
  'key_qingxuanzeyonggongxingshi': '请选择用工形式',
  'key_qingxuanzebangongdidian': '请选择办公地点',
  'key_qingtianxiejinjilianxiren': '请填写紧急联系人',
  'key_yuangongxinxi': '员工信息',
  'key_qingzhishaoxuanzeyixiangyidong': '请至少选择一项移动',
  'key_ziduanpeizhichenggong': '字段配置成功',
  'key_huamingcebaobiao': '花名册报表',
  'key_employee_set': '员工设置',
  'key_baobiaoyuefen': '报表月份',
  'key_renshu': '人数',
  'key_shengchengshijian': '生成时间',
  'key_xiangqing': '详情',
  'key_huamingceqitaziduan': '花名册其他字段',
  'key_yixuanziduan': '已选字段',
  'key_weixuanziduan': '未选字段',
  'key_chenggong': '成功',
  'key_xitongtishi': '系统提示',
  'key_ninquedingdaochuyuangonghuamingcema': '您确定导出员工花名册吗？',
  'key_daoruhuamingce': '导入花名册',
  'key_xiazaimoban': '下载模板',
  'key_certificate_num_is_repeat': '员工身份证号重复',
  'key_role_is_inexistence': '角色不存在',
  'key_send_entry_notice_error': '发送入职通知邮件失败,员工邮件不能为空'
}
// 员工花名册
const employeRoster = {
  'key_xinzengyuangong': '新增员工',
  'key_employeRoster_bianji': '花名册编辑',
  'key_qingshurugerenyouxiang': '请输入个人邮箱',
  'key_gongsiyouxiang': '公司邮箱',
  'key_qingshurugongsiyouxiang': '请输入公司邮箱',
  'key_qingshuru_employee_salary_kind': '请选择用工形式',
  'key_input_zhengjianhaoma': '请输入证件号码',
  'key_select_hukouleixing': '请选择户口类型',
  'key_input_shiyongqi': '请输入试用期',
  'key_input_phone': '请输入手机号码',
  'key_select_zhengjianleixing': '请选择证件类型',
  'key_select_ruzhiriqi': '请选择入职日期',
  'key_mendian': '所属门店',
  'key_select_mendian': '请选择门店',
  'key_leader': '直属领导',
  'key_select_leader': '请选择直属领导',
  'key_zhiwei': '所属职位',
  'key_select_zhiwei': '请选择职位',
  'key_zhiji': '所属职级',
  'key_select_zhiji': '请选择职级',
  'key_zhiwu': '所属职务',
  'key_select_zhiwu': '请选择职务',
  'key_qingxuanzexingbie': '请选择性别',
  'key_remarks': '备注',
  'key_input_remarks': '请输入备注'
}
// 组织架构
const organization = {
  'key_zuzhijiagou': '组织架构',
  'key_zuzhiguanli': '组织管理',
  'key_zuzhijiagouxiangqing': '组织架构详情',
  'key_company_end_time_error': '公司的结束日期不能大于父级的结束日期',
  'key_department_end_time_error': '部门的结束日期不能大于父级的结束日期',
  'key_department_end_time_error_company': '部门的结束日期不能大于该组织的结束日期'
}
// 部门管理
const department = {
  'key_bumenguanli': '部门管理',
  'department_has_employees': '部门内部有员工，无法删除'
}
// 薪资核算
const salaryaccount = {
  'key_xinzihesuan': '薪资核算',
  'key_employee_info_is_none': '员工信息不存在',
  'key_yijisuan': '已计算',
  'key_gongzidanguanli': '工资单管理',
  'key_gongzidanxiangqing': '工资单详情',
  'key_yishenhe': '已审核',
  'key_yitijiao': '已提交',
  'key_guanbi': '关闭',
  'key_employee_salary_post': '岗位名称',
  'key_employee_salary_entry_time': '入职日期',
  'key_employee_salary_actual_correction_time': '实际转正日期',
  'key_employee_salary_leave_time': '离职日期',
  'key_employee_salary_household_type': '户口类型',
  'key_chehuichenggong': '撤回成功',
  'key_chehuishibai': '撤回失败',
  'key_xinzijisuanjieguo': '薪资计算结果',
  'key_zhunbeijisuan': '准备计算',
  'key_jisuanzhong': '计算中',
  'key_chakanxinzijisuanjieguoxiangqing': '查看计算结果详情',
  'key_zhangtaoyuefen': '账套月份',
  'key_jisuanpicihao': '计算批次号',
  'key_xinziqijian': '薪资期间',
  'key_zhangtaozhuangtai': '账套状态',
  'key_xinzimingxi': '薪资明细',
  'key_tijiao': '提交',
  'key_chehui': '撤回',
  'key_shengchenggongzidan': '生成工资单',
  'key_shengchengbaopan': '生成报盘',
  'key_salary_calculate_delete_error': '计算状态为为已提交的计算批次不能删除',
  'key_salary_calculate_batch_delete': '成功删除{0}条，{1}条为以提交状态不允许删除',
  'key_yitijiaodexinzijisuanjieguocainengshengchenggongzidan': '已提交的薪资计算结果才能生成工资单。同一账套多次提交时，以最新数据为准，旧数据将被覆盖。请确认提交？',
  'key_batch_update_employee_repeat': '该账套中存在重复人员，请检查',
  'key_role_name_is_repeat': '角色名称重复',
  'key_no_top_company_error': '请先分配顶级公司',
  'key_options_check_calculate_error': '校验失败',
  'key_special_manager': '专项税附加扣除'
}
// 薪酬管理
const salary = {
  'key_salary_item_add_check': '校验不合法，请重新输入',
  'key_employee_salary_modelfyed_error': '该员工的薪资已经被修改,请刷新页面后重新修改',
  // 'key_employee_employee_source': '来源',
  'key_employee_salary_entry_time': '入职日期',
  'key_employee_salary_leave_time': '离职日期',
  'key_employee_salary_actual_correction_time': '实际转正日期',
  'key_employee_salary_household_type': '户口类型',
  'key_xinzidangan': '薪资方案',
  'key_employee_salary_code': '员工编号',
  'key_employee_salary_name': '员工姓名',
  'key_employee_salary_department': '所属部门',
  'key_employee_salary_company': '所属组织',
  'key_employee_salary_working_status': '在职状态',
  'key_employee_salary_kind': '用工形式',
  'key_employee_salary_created_by': '创建者',
  'key_employee_salary_create_time': '创建时间',
  'key_employee_salary_edit': '编辑薪资项',
  'key_xinchouguanli': '薪酬管理',
  'key_shuibiaoshezhi': '税表设置',
  'key_xinzixiang': '薪资项',
  'key_shuibiao': '税表',
  'key_changyongcanshu': '常用参数',
  'key_shuilvbianma': '税率编码',
  'key_shuiqianshouruxiaxian': '税前收入下限（不含）',
  'key_shuiqianshourushangxian': '税前收入上限（含）',
  'key_mianshuibiaozhungudingzhi': '免税标准固定值',
  'key_mianshuibiaozhunbili': '免税标准比例（%）',
  'key_yingnashuisuodeexiaxian': '应纳税所得额下限（不含）',
  'key_yingnashuisuodeeshangxian': '应纳税所得额上限（含）',
  'key_shuilv': '税率（%）',
  'key_susuankouchushu': '速算扣除数',
  'key_xinjianshuizhong': '新建税种',
  'key_bianjishuizhong': '编辑税种',
  'key_shuizhongbianma': '税种编码',
  'key_shuizhongmingcheng': '税种名称',
  'key_qingshurushuizhongbianma': '请输入税种编码',
  'key_qingshurushuizhongmingcheng': '请输入税种名称',
  'key_qingxianxuanzeshuizhong': '请先选择税种',
  'key_shifouyaoshanchugaishuizhong': '是否要删除该税种',
  'key_chakanshuilv': '查看税率',
  'key_bianjishuilv': '编辑税率',
  'key_xinjianshuilv': '新建税率',
  'key_mianshuibiaozhun': '免税标准',
  'key_gudingzhi': '固定值',
  'key_bili': '比例',
  'key_shuilvmingcheng': '税率名称',
  'key_qingshurushuilvmingcheng': '请输入税率名称',
  'key_qingshurushuilvbianma': '请输入税率编码',
  'key_qingshurumianshuibiaozhun': '请输入免税标准'
}
// 福利管理
const welfare = {
  'key_social_programme_in_use': '该社保方案正在使用中，不允许删除',
  'key_social_programme_batch_delete': '成功删除{0}条，{1}条正在使用不允许删除',
  'key_fund_programme_batch_delete': '成功删除{0}条，{1}条正在使用不允许删除',
  'key_fund_programme_in_use': '该公积金方案正在使用中，不允许删除',
  'key_salary_period_delete_error': '该薪资期间正在使用中，不允许删除',
  'key_salary_period_batch_delete': '成功删除{0}条，{1}条正在使用不允许删除',
  'key_fuliguanli': '福利管理',
  'key_social_programme_same_name_exist': '社保方案名称重复',
  'key_fund_programme_same_name_exist': '公积金方案名称重复',
  'key_shebaozhengceshezhi': '社保政策设置',
  'key_welfare_book_submit_tip': '只有已计算的账套允许提交',
  'key_welfare_book_recall_tip': '只有已提交的账套允许撤回',
  'key_welfare_book_name_is_exist': '该月已有相同名字的福利账套',
  'checking_no_emp_key': '系统查找不到该福利账套下员工数据',
  'calculation_data_not_exists': '该账套不存在计算结果数据',
  'key_gongjijinzhengceshezhi': '公积金政策设置',
  'key_shebaozhengce': '社保政策',
  'key_gongjijinzhengce': '公积金政策',
  'key_youxiaoqizi': '有效期自',
  'key_youxiaoqizhi': '有效期至',
  'key_gongjijindanweijiaonabili': '公积金单位缴纳比例(%)',
  'key_gongjijingerenjiaonabili': '公积金个人缴纳比例(%)',
  'key_buchonggongjijindanweijiaonabili': '补充公积金单位缴纳比例(%)',
  'key_buchonggongjijingerenjiaonabili': '补充公积金个人缴纳比例(%)',
  'key_yanglaobaoxianjishushangxian': '养老保险基数上限',
  'key_yanglaobaoxianjishuxiaxian': '养老保险基数下限',
  'key_yanglaobaoxiandanweijiaonabili': '养老保险单位缴纳比例(%)',
  'key_yanglaobaoxiangerenjiaonabili': '养老保险个人缴纳比例(%)',
  'key_yiliaobaoxianjishushangxian': '医疗保险基数上限',
  'key_yiliaobaoxianjishuxiaxian': '医疗保险基数下限',
  'key_jibenyiliaobaoxiandanweijiaonabili': '基本医疗保险单位缴纳比例(%)',
  'key_jibenyiliaobaoxiangerenjiaonabili': '基本医疗保险个人缴纳比例(%)',
  'key_yiliaobaoxiandanweijiaonabili': '医疗保险单位缴纳比例(%)',
  'key_yiliaobaoxiangerenjiaonabili': '医疗保险个人缴纳比例(%)',
  'key_dabingbaoxianjishushangxian': '大病保险基数上限',
  'key_dabingbaoxianjishuxiaxian': '大病保险基数下限',
  'key_dabingbaoxiandanweijiaonabili': '大病保险单位缴纳比例(%)',
  'key_dabingbaoxiangerenjiaonabili': '大病保险个人缴纳比例(%)',
  'key_dabingyiliaobaoxiandanweijiaonabili': '大病医疗保险单位缴纳比例(%)',
  'key_dabingyiliaobaoxiangerenjiaonabili': '大病医疗保险个人缴纳比例(%)',
  'key_shiyebaoxianjishushangxian': '失业保险基数上限',
  'key_shiyebaoxianjishuxiaxian': '失业保险基数下限',
  'key_shiyebaoxiandanweijiaonabili': '失业保险单位缴纳比例(%)',
  'key_shiyebaoxiangerenjiaonabili': '失业保险个人缴纳比例(%)',
  'key_gongshangbaoxianjishushangxian': '工伤保险基数上限',
  'key_gongshangbaoxianjishuxiaxian': '工伤保险基数下限',
  'key_gongshangbaoxiandanweijiaonabili': '工伤保险单位缴纳比例(%)',
  'key_gongshangbaoxiangerenjiaonabili': '工伤保险个人缴纳比例(%)',
  'key_shengyubaoxianjishushangxian': '生育保险基数上限',
  'key_shengyubaoxianjishuxiaxian': '生育保险基数下限',
  'key_shengyubaoxiandanweijiaonabili': '生育保险单位缴纳比例(%)',
  'key_shengyubaoxiangerenjiaonabili': '生育保险个人缴纳比例(%)',
  'key_xinjianshebaozhengce': '新建社保政策',
  'key_bianjishebaozhengce': '编辑社保政策',
  'key_chakanshebaozhengce': '查看社保政策',
  'key_qingxuanzeshengfen': '请选择省份',
  'key_qingxuanzechengshi': '请选择城市',
  'key_qingxuanzequxian': '请选择区县',
  'key_qingxuanzedengji': '请选择等级',
  'key_xinjiangongjijinzhengce': '新建公积金政策',
  'key_bianjigongjijinzhengce': '编辑公积金政策',
  'key_chakangongjijinzhengce': '查看公积金政策',
  'key_shebaojisuanmingxi': '社保计算明细',
  'key_shebaojisuanpicihao': '社保计算批次号',
  'key_zhangtaomingcheng': '账套名称',
  'key_jiaonayuefen': '缴纳月份',
  'key_jisuanzhuangtai': '计算状态',
  'key_shifoujisuanshebao': '是否计算社保',
  'key_shebaojiaonafangan': '社保缴纳方案',
  'key_shifoujisuangongjijin': '是否计算公积金',
  'key_gongjijinjiaonafangan': '公积金缴纳方案',
  'key_jisuanshijian': '计算时间',
  'key_chuangjianzhe': '创建者',
  'key_chuangjianshijian': '创建时间',
  'key_caozuo': '操作',
  'key_qingxuanzeyaochakandegongjijinzhengce': '请选择要查看的公积金政策',
  'key_qingxuanzeyaobianjidegongjijinzhengce': '请选择要编辑的公积金政策',
  'key_qingxuanzeyitiaoshujujinxingchakan': '请选择一条数据进行查看',
  'key_qingxuanzeyitiaoshujujinxingbianji': '请选择一条数据进行编辑',
  'key_qingxuanzeyitiaoshujujinxingshanchu': '请选择一条数据进行删除',
  'key_employee_social_security_household_registration_type_is_blank': '该社保账套中有员工的户口性质为空，请检查并修正',
  'key_employee_social_security_level_and_base_is_blank': '该社保账套中有员工的社保缴纳级别和基数均为空，将使用方案中缴纳级别或基数进行计算',
  'key_employee_social_security_payment_city_discrepancy': '该社保账套中有员工的社保缴纳地区与方案中的社保缴纳地区不符，请检查并修正',
  'key_employee_social_security_payment_status_is_blank': '该社保账套中有员工的社保缴纳状态为空，将使用方案中的社保缴纳方案进行计算',
  'key_the_number_is_not_check_status_warning': '该社保账套中参保人数与顶级组织员工人数不符',
  'key_social_security_is_incomplete_error': '该社保账套的社保方案中不完整，请检查并修正',
  'key_employee_social_security_payment_city_is_blank': '该社保账套中有员工的社保缴纳地区与方案中的社保缴纳地区不符，请检查并修正',
  'key_xiazaishebaocuowujieguobaobiao': '下载社保错误结果报表',
  'key_xiazaishebaojisuanmingxi': '下载社保计算明细',
  'key_jianchabaobiao': '检查报表',
  'key_shebaomingxi': '社保明细',
  'key_weijiancha': '未检查',
  'key_jianchashibai': '检查失败',
  'key_jianchatongguo': '检查通过',
  'key_jisuanwancheng': '计算完成',
  'key_jisuanyichang': '计算异常',
  'key_shebaofangan': '社保方案',
  'key_gongjijinfangan': '公积金方案',
  'key_zhufanggongjijinjiaonajishushangxian': '住房公积金缴纳基数上限',
  'key_zhufanggongjijinjiaonajishuxiaxian': '住房公积金缴纳基数下限',
  'salaryAccountingBookNumCheckedKey': '计算人数为{0}，与当前组织人数不符。请确认是否继续计算？',
  'key_gongjijinjiaonajishushangxian': '公积金缴纳基数上限',
  'key_gongjijinjiaonajishuxiaxian': '公积金缴纳基数下限',
  'key_zuidigongzibiaozhun': '最低工资标准',
  'key_employee_welfare': '员工福利管理',
  'key_user_verification_code_limit_control': '今日发送验证码条数已达上限'
}
// 系统设置
const systemSettings = {
  'key_xitongshezhi': '系统设置',
  'key_baobiaoguanli': '报表管理',
  'key_bianhao': '编号',
  'key_baobiaomingcheng': '报表名称',
  'key_baobiaoleibie': '报表类别',
  'key_miaoshu': '描述',
  'key_dingyuezhuangtai': '订阅状态',
  'key_daochu': '导出',
  'key_jiangyaodaochuxuanzhongdebaobiao': '将要导出选中的报表，请确认导出格式。',
  'key_shaixuan': '筛选',
  'key_chakanbaobiaoxiangqing': '查看报表详情',
  'key_baobiaoxiangqing': '报表详情',
  'key_zuzhijiancheng': '组织简称',
  'key_bumenquancheng': '部门全称',
  'key_chengbenzhongxin': '成本中心',
  'key_bumenfuzeren': '部门负责人',
  'key_lianxifangshi': '联系方式',
  'key_jihuagangweishu': '计划岗位数',
  'key_jihuarenshu': '计划人数',
  'key_zuzhiyouxiaoqizi': '组织有效期自',
  'key_zuzhiyouxiaoqizhi': '组织有效期至',
  'key_suoshuzuzhi': '所属组织',
  'key_lizhiriqi': '离职日期',
  'key_jieshuriqi': '结束日期',
  'key_kaishiriqi': '开始日期',
  'key_zhi': '至',
  'key_zuzhiyouxiaoqi': '组织有效期',
  'key_yuangongweiyihao': '员工编号',
  'key_xingbie': '性别',
  'key_fanhui': '返回'
}
// 银行报盘
const bankOffer = {
  'key_bank_offer_merge_error': '已经合并过的银行报盘不能互相合并',
  'key_bank_offer_repeat_merge_error': '该银行报盘不能重复合并，请重新选择',
  'key_different_salary_month_merge_error': '不同的薪资月份不能合并银行报盘',
  'key_bank_offer_merged_repeat_error': '报盘文件已经合并过数据，不允许再次合并'
}
// 工资单
const payroll = {
  'key_password_error': '密码错误'
}

// 公共
const common = {
  'key_dangqianweizhi': '当前位置',
  'key_shengfen': '省份',
  'key_quxian': '区县',
  'key_chengshi': '城市',
  'key_dengji': '等级',
  'key_chakan': '查看',
  'key_xinjian': '新建',
  'key_bianji': '编辑',
  'key_shanchu': '删除',
  'key_qingkong': '清空',
  'key_sousuo': '搜索',
  'key_baocun': '保存',
  'key_quxiao': '取消',
  'key_zhinengxuanzhongyitiaobianji': '只能选中一条编辑',
  'key_zhinengxuanzhongyitiaochakan': '只能选中一条查看',
  'key_xuanzeshengfen': '选择省份',
  'key_xuanzechengshi': '选择城市',
  'key_xuanzequxian': '选择区县',
  'key_xuanzeriqi': '选择日期',
  'key_xuanzeyuefen': '选择月份',
  'key_kaishishijianbunengdayujieshushijian': '开始时间不能大于结束时间',
  'key_qingxuanze': '请选择',
  'key_quanbu': '全部',
  'key_qingzhishaoxuanzhongyitiaoshuju': '请至少选中一条数据',
  'key_quedingyaoshanchusuoxuanxiangma': '确定要删除所选项吗?',
  'key_tishi': '提示',
  'key_queding': '确定',
  'key_shanchuchenggong': '删除成功',
  'key_tianjiachenggong': '添加成功',
  'key_tijiaochenggong': '提交成功',
  'key_tijiaoshibai': '提交失败',
  'key_bianjichenggong': '编辑成功',
  'key_shujuqingqiushibai': '数据请求失败',
  'key_qingxuanzeriqi': '请选择日期',
  'key_qingshuruzhengquegeshideshoujihao': '请输入正确格式的手机号',
  'key_qingxuanzeguoji': '请选择国籍',
  'key_qingxuanzeminzu': '请选择民族',
  'key_zhiyunxushurushuzi': '只允许输入数字',
  'key_shoujihaomageshibuzhengque': '手机号码格式不正确',
  'key_baocunchenggong': '保存成功',
  'key_platform_setup': '平台设置',
  'key_tenant_setup': '租户设置'
}
// 错误提示信息4001
const error = {
  'key_phone_is_repeat': '员工手机号重复',
  'key_field_class_is_repeat': '字段名称重复',
  'key_social_account_set_name_is_exist': '账套名称不能重复',
  'key_code_is_repeat': '员工编号重复',
  'key_department_has_employees': '部门内部有员工，不允许删除！',
  'key_working_status_is_incumbency': '该员工处于在职状态，无法删除',
  'key_Data_is_null': '暂无数据',
  'key_salary_book_same_name_is_exist': '薪资账套名称重复，请重新输入',
  'key_name_is_repeat': '薪资期间名称重复，请重新输入',
  'The company is still a subsidiary': '该组织下有子组织或部门，不能删除',
  'key_illegal_access': '非法访问',
  'key_salary_items_must_error': '缺少必需的薪资项',
  'key_tax_code_is_repeat': '税种编码重复',
  'key_tax_name_is_repeat': '税种名称重复',
  'key_tax_rate_code_is_repeat': '税率编码重复',
  'key_tax_rate_name_is_repeat': '税率名称重复',
  'key_sysconfig_dictionary_type_model_key_exist': '字典类型代码重复',
  'key_sysconfig_dictionary_data_model_key_exist': '字典数据代码重复',
  'key_employee_attendance_data_exist': '当前员工在此考勤月份内已存在数据',
  'key_salary_archives_name_repeat': '薪资方案名称不允许重复',
  'key_employee_non_existent': '员工信息不存在',
  'key_attendance_template_download_fail': '下载模板失败',
  'key_attendance_template_upload_fail': '上传失败',
  'key_social_calculate_delete_error': '账套状态已提交不允许删除',
  'key_fileNumber_is_repeat': '员工档案编号不可重复',
  'key_user_start_end_date_error': '开始日期不能大于结束日期',
  'key_user_name_repeat': '用户账户重复',
  'key_mobile_repeat': '手机号码重复',
  'key_email _repeat': '邮箱重复',
  'key_permission_has_same_name': '已经有重名的权限模板',
  'key_role_is_using': '正在使用中的角色不允许删除！',
  'key_no_role_error': '请先分配角色',

  'key_welfare_movement': '福利异动',
  'key_welfare_supplement': '福利补缴',
  'key_employee_set': '员工设置',
  'KEY_CONFIRM_LEAVE_FAILURE': '只有审批完成后才可以确认离职',

  'A social programme with the same name already exists': '区域名称重复,请换一个名称',
  'A fund programme with the same name already exists': '区域名称重复, 请换一个名称',
  'key_reset_user_password_error': '用户已被锁定，无法重置密码！',
  'key_reset_user_password_false': '重置密码邮件发送失败'
}
const position = {
  'key_position_name_is_repeat': '职位名称重复',
  'key_post_delete_error': '正在使用的职业不允许删除',
  'key_name_error': '职务名称重复',
  'key_position_prepare_num_is_exceed': '职位超编',
  'salary celling must be great than or equal to floor': '薪资上限必须大于等于薪资下限',
  'name is repetitive in same company': '职级名称重复'
}
const stayPositiveInfo = {
  'workflow_close': '审批流程关闭',
  'workflow_employee_empty': '审批流程适用人未配置',
  'workflow_failed_to_pass_empty': '审批流程分支条件判断未通过',
  'workflow_condition_type_empty': '审批流程分支条件类型为空',
  'workflow_employee_category_empty': '审批流程分支用工条件为空',
  'workflow_post_empty': '审批流程分支职务条件为空',
  'workflow_level_empty': '审批流程分支职级条件为空',
  'workflow_department_empty': '审批流程分支调动后部门条件为空',
  'workflow_contract_empty': '审批流程分支合同协议条件为空',
  'workflow_renewal_times_empty': '审批流程分支续签次数条件为空'
}
const addWarning = {
  'key_field_add_name_exist': '字段项名称重复',
  'define_name_is_repeat': '审批流名称不能重复',
  'key_send_test_err': '服务器连接无效,请你检查设置后确认',
  'key_employee_certificate_num_repeat_error': '员工证件号码重复',
  'employee_phone_repeat_error_key': '员工手机号码重复',
  'employee_email_repeat_error_key': '员工邮箱重复'
}
const role = {
  'key_baocun': '保存',
  'key_quxiao': '取消'
}
export default {
  login,
  mainIndex,
  employee,
  organization,
  salary,
  changePassword,
  department,
  welfare,
  common,
  error,
  systemSettings,
  salaryaccount,
  bankOffer,
  payroll,
  position,
  stayPositiveInfo,
  addWarning,
  employeRoster,
  role
}
