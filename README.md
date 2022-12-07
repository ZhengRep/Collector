# 学生意愿收集系统

## 课设要求

### 微信小程序之学生意愿收集系统

#### **内容：**

关注学生需求，收集学生意愿。每个学生可作为意愿发起人，分为实名发起与匿名发起两种情况，匿名发起需经管理员审核。

#### **功能：**

1. 学生利用微信账号进行小程序登录。

2. 当发起人选择实名制意愿发起时，需要输入学号、姓名以及意愿简单描述。发起后，展示平台显示发起人信息。

3. 当发起人选择匿名制意愿发起时，只需输入意愿描述，但需经管理员审核是否通过。通过后，展示平台不显示发起人信息。

4. 意愿发起后，其他同学可进行投票，设计投票累计函数，每个登录账号对一个意愿只能投票一次。

5. 根据点赞数（即投票数）和意愿发起时间对意愿列表进行排序，对超过一定点赞数的意愿进行置顶排序，并标记为热门意愿。

6. 当无新点赞7日后，非热门意愿自动删除，热门意愿统计存储于往期热门意愿中。
