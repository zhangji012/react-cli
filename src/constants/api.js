// @ts-ignore
export const host = HOST

// 简历
export const API_RESUME = {
  get_all_info: `${host}/share-m/resume/get_all_info`,                  // 获取所有简历信息
  upload_avatar: `${host}/share-m/resume/upload_avatar`,                // 简历-头像上传

  get_base: `${host}/share-m/resume/get_base`,                          // 简历-基本信息-获取
  set_base: `${host}/share-m/resume/set_base`,                          // 简历-基本信息-设置

  get_intention: `${host}/share-m/resume/get_intention`,                // 简历-求职意向-获取
  set_intention: `${host}/share-m/resume/set_intention`,                // 简历-求职意向-设置

  get_work_exp: `${host}/share-m/resume/get_work_exps`,                 // 简历-工作经历-获取
  set_work_exp: `${host}/share-m/resume/set_work_exp`,                  // 简历-工作经历-设置
  delete_work_exp: `${host}/share-m/resume/delete_work_exp`,            // 简历-工作经历-删除
  get_company_tips: `${host}/share-m/resume/get_company_tips`,          // 简历-工作经历-公司联想
  get_jcategory_tips: `${host}/share-m/resume/get_jcategory_tips`,      // 简历-工作经历-职位联想
  get_work_example: `${host}/share-m/resume/get_work_example`,          // 简历-工作经历-岗位职责-看看别人怎么写

  get_edu_exp: `${host}/share-m/resume/get_edu_exps`,                   // 简历-教育经历-获取
  set_edu_exp: `${host}/share-m/resume/set_edu_exp`,                    // 简历-教育经历-设置
  delete_edu_exp: `${host}/share-m/resume/delete_edu_exp`,              // 简历-教育经历-删除
  get_school_tips: `${host}/share-m/resume/get_school_tips`,            // 简历-教育经历-学校联想
  get_major_tips: `${host}/share-m/resume/get_major_tips`,              // 简历-教育经历-专业联想

  get_lan_skills: `${host}/share-m/resume/get_lan_skills`,              // 简历-语言技能-获取
  set_lan_skills: `${host}/share-m/resume/set_lan_skills`,              // 简历-语言技能-设置

  get_self_description: `${host}/share-m/resume/get_self_description`,  // 简历-自我描述-获取
  set_self_description: `${host}/share-m/resume/set_self_description`,  // 简历-自我描述-设置
}

// 手机
export const API_MOBILE = {
  code: `${host}/share-sso/u/mobile_verify_code`,       // 获取手机验证码
  bind: `${host}/share-m/client-service/api/mobile`,       // 绑定手机
}
// 邮箱
export const API_EMAIL = {
  code: `${host}/share-m/user/email_verify_code`,         // 获取邮箱验证码
  bind: `${host}/share-m/user/email_verify`,              // 邮箱绑定
}

