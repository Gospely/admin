<template>


<div class="">
  <article class="tile is-child box">
    <h1 class="title">发送消息</h1>
    <div class="block">
      <label class="label">消息标题</label>
      <p class="control">
        <input class="input" type="text" placeholder="请输入消息标题">
      </p>

      <label class="label">选择发送对象</label>
      <p class="control">
        <span class="select">
          <select>
            <option>全部</option>
            <option>options１</option>
            <option>options２</option>
            <option>options３</option>
            <option>options４</option>
          </select>
        </span>
      </p>
      <label class="label">发送消息内容</label>
      <p class="control">
        <textarea class="textarea" placeholder="请输入消息内容"></textarea>
      </p>
      <p class="control">
        <button class="button is-primary">发送</button>
        <button class="button is-link">取消</button>
      </p>
    </div>
  </article>
</div>

</template>
<script>

</script>

<style lang="scss">
.smessage{
  font-weight: bold;
  color: black;
}
</style>
