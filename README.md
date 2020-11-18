
# day 1
+ 使用脚手架创建了一个项目
+ 配置开发前的准备 （git 、 eslint ...）
+ 拆分路由 --> 配置、注册、使用路由 --> 拆分静态页面（html -> css -> 图片资源等）

***skill*** : 使用vue绑定class 可以采用对象方式如 :class="{on:'/search' === $route.path}

# day 2
+ 使用swiper 做轮播效果（6.0版本以上不显示分页）
+ 使用 slot 来进行组件标签通信（相当于传递一个标签）
+ 测试了后台接口，封装了Ajax函数，根据 api 写了前台接口函数

    使用 axios + promise 对返回的数据进行 trim,注意返回的是一个promise对象

*注意* ：在 vue中设置代理添加 api 拦截代理，需要在路由路径前添加 ‘/api’

# day 3
* 将 home 页面上的一些静态资源如食物分类、商家列表，转化为获取数据显示，在加载
期间会做一个铺垫（使用一个模型SVG）
* 抽取了评价星级为一个普通组件 ，并根据传入的评分显示星级（重点：需要掌握）
+ 完成了 vuex 部分

*skill*: 路由组件有一个 $route 对象代表当前路由组件，可以对其中的 meta 属性进行判断来对组件进行隐藏操作

# day 4
+ 登录界面完善了短信登陆以及密码登录，登录信息根据动态绑定class显示（但实际上还是同一张表单）
+ 切换按钮显示密码(利用两个input 加上双向数据绑定进行切换)
+ **前台工作**
  - 封装 Ajax 请求，接收数据
  - vuex 实现解析数据并更新状态
    - state
    - mutation-types
    - actions
    - mutations
  - 组件内处理数据
+ 验证码切换问题解决: 在请求的结尾添加日期以达到切换的目的
+ 表单验证
  + a. 切换登陆方式
  + b. 手机号合法检查
  + c. 倒计时效果（打开的时机与关闭的时机）
  + d. 切换显示或隐藏密码
  + g. 前台验证提示
+ 手机验证码需要用到 容联云服务

*思考* ：
   + 什么情况下在组件内直接请求，什么情况下需要 dispatch ?
   + vuex 的一套写作流程是什么？
     > 一般来讲
       + state -> mutation-types -> mutations() -> action(同步/异步操作)
       + 应用层级的状态应该集中到单个 store 对象中。
       + 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
       + 异步逻辑都应该封装到 action 里面。

# day 5
+ 对 mint-ui 按需打包（babel-plugin-component）
+ 关于页面引入双层表达式 undefined 报错的问题：使用 v-if 对数据进行判断是否往下执行
+ 商家界面路由的分析
+ 使用 mockjs 完成了前端拦截
    + json 数据结构设计 需要重点掌握
    + 需要写一个 路由拦截JS文件 ，但无需暴露，只需导入打包运行即可
    + 只能是 ajax 请求

*skill* : 拆分路由时可以试着划分一下路径 例如 home/item/info ...

*注意* ：
> 双层大括号表达式的使用注意点 : a = {} , {{a.b}} ==> true ,{{a.b.c}} ==> false
>> 如果对象为 undefined ，则会报错

# day 6
+ shop goods 组件，以及添加购物车、查看食物详情等组件
+ 关于点餐页面的逻辑
    - 当前分类
    - 当滑动右侧列表时，更新当前分类
        + 使用类名标识当前分类
        - 设计一个计算属性：currentIndex
        - 根据哪些数据计算？
            + scrollY : 右侧滑动的 Y轴坐标 （ 滑动过程中变化）
            + tops : 右侧分类 li 组成的数组（列表第一次显示后不再变化）
    - 点击某个分类项目，右侧列表滑动到对应位置
+ 父组件调用子组件方法
    - 使用 $ref 标识子组件调用
+ 完成添加按钮组件的逻辑：
    + 给food 添加 count属性无法更新界面的解决：
        - 使用 Vue.set() 来进行新增属性绑定
    + 利用 count 属性来控制减号以及数量显示的按钮出现

*skill* :
    1. 在组件里要显示商品信息时，应在组件挂载完成之后获取数据
    2. 一些类似于 swipper 、 betterScroll 的对象创建使用的库，可以等
       数据在action里异步获取结束后用$nextTick调用

# day 7
+ 在底部购物车组件的数量以及总价上使用vuex 的 getters 模块进行管理
+ 完成了底部购物车的UI交互
+ 完成了评论界面的显示
    + 评论的滚动
    + 评论的筛选
    + 更换了 better-scroll 的版本，解决往上滑动的一些 bug

*注意* :
> 在购物车列表使用 better-scroll 时，出现了点击一次却增加了好几次
增加的调用，怎么解决？
+ 原因:由于创建了多个 BScroll 实例
+ 解决：实例单例（单一实例）

# day 8
+ 完成了搜索的逻辑以及商家信息页面
+ 评论页面评论时间的格式化（moment）,moment 文件略大，可以采用date-fns
+ 应用优化
    - 图片懒加载 vue-lazyLoad
    - 组件懒加载 components = () => import 'xxx' from './xx'






