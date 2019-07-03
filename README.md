### Injectable
将使用 `Injectable` 注解的 `class` 保存到 `store` 中

### Inject
将使用 `Inject` 注解的构造函数参数，信息会保存到当前 `Class` 上，保存值为 `[id, index]`，id store中保存的key，用来获取 Injectable 注解的类，index 构造函数中参数的位置

### InjectProp
将使用 `InjectProp` 注解的属性，信息会保存到当前 `Class` 上，保存值为 `[id, key]`，key 为当前属性的属性名

### factory
递归遍历当前 `Class` ，获取注入的信息，创建实例