### api needs

## 1 小程序 登录接口
不太清除到底要怎么处理。

我理解的登录：
1. 新用户进入小程序,授权手机号码后，调用接口创建一个新用户，并返回一个唯一标识，后续可以用来查询关联的访客数据。
2. 授权过的用户进入小程序，调用接口查到对应的唯一标识，后续可以用来查询关联的访客数据。

现有问题：
1. 现在用户登录只有账号密码的登录方式。
2. 创建用户:需要管理员 登录后台系统进行创建。
3. 创建用户（/evo-apigw/evo-brm/1.2.0/person/subsystem/add），身份证号码要必填。

## 2 访客申请查询接口  

不知道用哪一个

## 3 来访园区查询/访问区域接口 /evo-apigw/evo-visitor/1.0.0/area

问题：需要登录才可以调用

## 4 被访人查询接口 /evo-apigw/evo-brm/1.2.0/person/subsystem/page

问题：需要登录才可以调用

## 5 访客申请详情接口 /evo-apigw/evo-visitor/1.0.0/card/visitor/getAppointmentByCode/{appointmemntCode}

无需登录即可调用。
问题： 用新增访客申请接口返回的appointmemntCode来查询，接口返回“预约码非法”

## 6 新增访客申请接口 /evo-apigw/evo-visitor/1.0.0/card/visitor/appointment

无需登录即可访问。

## 7 编辑申请接口

没有此接口
