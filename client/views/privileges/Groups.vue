<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">用户列表</h4>


          <view-table :total="10" :colspan="4" v-on:page-changed="pageChanged" v-on:stop-docker="stopDocker" v-on:attribute-groups="attributeGroups" v-on:open-monitor="openMonitor" v-on:see-application='seeApplication' :operations.sync="operations" :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>



<!-- 应用列表的ｍｏｄｅｌ -->
    </card-modal>

      <card-modal :html.sync="true"  v-on:mounted="apMounted" v-on:confirm="saveApplication" transition="zoom" title="查看应用列表" :visible.sync="false">
        <div slot="modal-body">
          <div class="block">

            <view-table :total="10" :showOperations="false"  :fields.sync="appFields" :columns.sync="appColums" :operations.sync='usersOperations' ></view-table>

          </div>
        </div>
      </card-modal>


<!-- 用户组信息的ｍｏｄｅｌ -->
      <card-modal :html.sync="true"   v-on:mounted="groupsAmmount" v-on:confirm="saveGroups" transition="zoom" title="分配用户组" :visible.sync="false">
        <div slot="modal-body">
          <div class="block">
            <view-table :total="10"  :showOperations="false" :fields.sync="groupsFields" :columns.sync="groupColums" :operations.sync='usersOperations' ></view-table>
          </div>
        </div>
      </card-modal>

  </div>
</template>

<script>

  import ViewTable from '../components/Table.vue'
  import CardModal from '../components/modal/CardModal.vue'

  export default {
    data: function() {
      return {

// 用户组信息
        columns: ['用户组', '用户组名称', '用户组类型', '权限'],
        fields: [{
          name: 'gospel',
          phone: '14506078834',
          password: '1234567890',
          identify: '612429199923455764',
        },{
         name: 'kimi',
          phone: '15970457619',
          password: 'qwerty',
          identify: '61031140495',
        }],

// 应用列表信息
        appColums: ['应用名称','访问端口','资源存储地址','域名'],
        appFields: [{
          name: 'iOS',
          port: '14506078834',
          sshPort: '12345ss67890',
          source: '612429199923455764',
        },{
          name: 'kismi',
          port: '15970ss457619',
          sshport: 'qwerty',
          source: 'aa61031140495',
        }],



        operations: [{
          icon: 'fa-street-view',
          title: '分配权限',
          event: 'attribute-groups'
        },{
          icon: 'fa-square-o',
          title: '查看应用列表',
          event: 'see-application'
        },{
          icon: 'fa-remove',
          title: '删除当前用户组',
          event: 'stop-docker'
        }],


        applicationForm: null,
        applicationDatail:{},

        groupsForm: null,
        groupsDatail: {}

      }
    },


    methods: {


// 打开应用列表详情
      apMounted: function(modal){
        this.applicationForm = modal;
      },
      seeApplication: function(data){
        this.applicationForm.open();
        this.applicationDatail = this.appFields;
      },

// 分配权限
      groupsAmmount: function(modal){
        this.groupsForm = modal;
      },
      attributeGroups: function(data){
        this.groupsForm.open();
        this.groupsDatail  = this.groupsFields;
      },


      pageChanged: function(currentPage) {
        console.log(currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
      },
      saveApplication: function(){
          this.applicationForm.close();

      },
      saveGroups: function(){
          this.groupsForm.close();

          openNotification({
            title: '分配用户组',
            message: '分配用户组成功',
            type: 'primary'
          })
      },


// 删除用户组
      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '删除用户',
          body: '确定要删除该用户吗，一旦删除将清除所有数据',
          confirm: function(modal) {
            console.log('confirmed');
            modal.close();

            openNotification({
              title: '删除用户',
              message: '删除用户成功',
              type: 'primary'
            })

          }
        });
      },

    },


    components: {
      ViewTable,
      CardModal
    }

  }

</script>

<style lang="scss">


</style>
