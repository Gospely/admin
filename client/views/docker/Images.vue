<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">容器镜像列表</h4>

          <p class="control">
            <button @click="newConfig" class="button is-primary">新增</button>
          </p>

          <view-table :total="10" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" :operations="operations" :fields="fields" :columns="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" :title.sync="formTitle" :visible.sync="false">

      <div slot="modal-body">
        <div class="block">
          <label class="label">名称</label>
          <p class="control">
            <input class="input" v-model="name" type="text" placeholder="名称">
          </p>
          <label class="label">dockerfiles</label>
          <p class="control">
            <textarea class="textarea"  v-model="file"></textarea>
          </p>
          <p>
            <label class="label">标签</label>
            <input type="text" class="input"　 v-model="lable" >
          </p>

        </div>

    </card-modal>

  </div>
</template>

<script>

  import ViewTable from '../components/Table.vue'
  import CardModal from '../components/modal/CardModal.vue'

  export default {

    data: function() {
      var self = this;
      return {
        columns: ['镜像名称', '描述', '标签'],

        fields: [],

        operations: [{
          icon: 'fa-remove',
          title: '删除此版本',
          event: 'stop-docker'
        }],

        configDetailForm: null,
        configDetail: {},
        //新增镜像的数据
        name: null,
        file: null,
        lable: null,
        oldImages: [],
        id: "",

        state: 'NEW_VERSION', //EDIT_VERSION || NEW_VERSION

        formTitle: '查看配置详情'
      }
    },

    methods: {

      mounted: function(modal) {
        this.configDetailForm = modal;
      },

      pageChanged: function(currentPage) {
        console.log(currentPage);
      },

      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '删除配置信息',
          body: '确定要删除此配置吗，一旦删除所有子元素也将被删除',
          confirm: function(modal) {
            console.log('confirmed');
            modal.close();

            openNotification({
              title: '停止Docker',
              message: '停止Docker成功',
              type: 'primary'
            })
          }
        });
      },

      newConfig: function() {
        this.configDetail = {};
        this.formTitle = '新增容器镜像';
        this.configDetailForm.open();
      },
      save: function(id) {
        // 如果填的容器镜像的名字已经存在则修改.并取ID.　并且样式提示，此镜像名称以存在。
        if(this.name==null & this.file==null & this.lable==null){
          this.configDetailForm.close();
          return;
        }else {

        if(this.name!=null){
        var _self = this;
        var options = {
            param: {
                cur: 1, //当前页码
                limit: 1,   //限制条数
                show: 'id_name'
            },
            url: "images",
            ctx: _self,
            target:  'oldImages',
        };
        services.Common.list(options);

        for(var key in  this.oldImages){
            // alert(_self.oldImages[key].name);
          if(this.oldImages[key].name = this.name) {
              // alert(_self.oldImages[key].name);
              _self.state = 'DELI_VERSION';
              _self.id = this.oldImages[key].id;
              }
            }
        }
        var _self = this;
        this.configDetailForm.close();
        if(this.state == 'NEW_VERSION') {
          //增加
          var options = {
            param: {
              contain: this.newImages,
            },
            msg: {
                success:{
                  title: '新增容器镜像',
                  message: '新增容器镜像成功',
                  type: 'primary'
                },
                failed: {
                  title: '新增容器镜像',
                  message: '新增容器镜像失败',
                  type: 'warning'
                }
            },
            url: 'images',
            ctx: self,
            reload: _self.init,
          };
          services.Common.create(options);
        }else {
          //修改
          var options = {
            param: {
              id: _self.id,
              desciption: _self.file,
              label: _self.lable,
            },
            msg: {
                success:{
                  title: '修改容器镜像',
                  message: '修改容器镜像成功',
                  type: 'primary'
                },
                failed: {
                  title: '修改容器镜像',
                  message: '修改容器镜像失败',
                  type: 'warning'
                }
            },
            url: 'images',
            ctx: self,
            reload: _self.init,
          };
          services.Common.update(options);

        }}},

      init: function(cur) {

        console.log("init " + cur);
        var _self = this;
        var options = {
            param: {
                cur: cur, //当前页码
                limit: 2,   //限制条数
                show: 'id_name_description_label' //要查询的列
            },
            url: "images", //操作的表 实体（根据这个生产请求url）
            ctx: _self,  //当前vue（this）
        };
        services.Common.list(options); //列表查询（delete：删除，getOne:获取某个，create:创建插入，put:更新）实现在CommonService.js中
      }

    },

    components: {
      ViewTable,
      CardModal
    },
    mounted() {
        var self = this;
        self.init(1);
    }

  }

</script>

<style lang="scss">


</style>
