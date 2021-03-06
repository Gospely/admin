<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">{{title}}</h4>
          <view-table :all.sync="all" :total="10" v-on:page-changed="pageChanged" :operations.sync="operations" v-on:stop-docker="stopDocker" v-on:refresh-docker="refreshDocker" v-on:open-monitor="openMonitor"  :fields.sync="fields" :columns.sync="columns"></view-table>
        </article>
      </div>
    </div>

    <card-modal :html.sync="true" v-on:mounted="mounted" v-on:confirm="save" transition="zoom" title="查看docker详情" :visible.sync="false">

      <div slot="modal-body">
        <div　class="block">

          <label class="label">应用名称</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.name" type="text" placeholder="容器名称" disabled>
          </p>
          <label class="label">应用启动端口</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.port" type="text" placeholder="单价" disabled>
          </p>
          <label class="label">资源存储地址</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.source" type="text" placeholder="核心数量" disabled>
          </p>
          <label class="label">域名</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.domain" type="text" placeholder="cpu类型" disabled>
          </p>
          <label class="label">开发者成员</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.members" type="text" placeholder="内存大小" disabled>
          </p>
          <label class="label">所属团队</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.team" type="text" placeholder="内存大小" disabled>
          </p>
          <label class="label">创建人</label>
          <p class="control">
            <input class="input" v-model="dockerDetail.creator" type="text" placeholder="内存大小" disabled>
          </p>
          <div v-show="showLine">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h4 class="title">CPU监控</h4>
                <chart :type="'line'" :data="seriesData" :options="options_3"></chart>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h4 class="title">内存监控</h4>
                <chart :type="'line'" :data="seriesMemData" :options="options_3"></chart>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <h4 class="title">网络监控</h4>
                <chart :type="'line'" :data="seriesNetData" :options="options_3"></chart>
              </article>
            </div>
          </div>
        </div>
      </div>

    </card-modal>

  </div>
</template>

<script>
  import Chart from 'vue-bulma-chartjs'
  import ViewTable from '../Table.vue'
  import CardModal from './CardModal.vue'

  export default {

    data: function() {
      return {
        id: 1,
        all:1,
        aur:1,
        columns: [{
          column: 'name',
          label: '应用名称'
        },{
          column: 'port',
          label: '应用启动端口'
        },{
          column: 'source',
          label: '资源存储地址'
        },{
          column: 'domain',
          label: '域名'
        },{
          column: 'team',
          label: '所属团队'
        },{
          column: 'creator',
          label: '创建人'
        },],
        fields: [],

        operations: [{
          icon: 'fa-search-plus',
          title: '监控详情',
          event: 'open-monitor'
        }, {
          icon: 'fa-refresh',
          title: '重新启动',
          event: 'refresh-docker'
        }, {
          icon: 'fa-remove',
          title: '停止当前容器',
          event: 'stop-docker'
        }],

        dockerDetailForm: null,
        dockerDetail: {},
        // cpu监控数据
        labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
        cpuData: [
          [65, 59, 90, 81, 56, 55, 40],
        ],
        cpuSeries: ['CPU使用率(%)'],
        cpuBackgroundColor: [
          'rgba(31, 200, 219, 1)',
        ],
        options_3: {
          tooltips: {
            mode: 'label'
          }
        },

        memoryData: [
          [65, 59, 90, 81, 56, 55, 40],
        ],
        memorySeries: ['内存使用率(%)'],
        cpuBackgroundColor: [
          'rgba(31, 200, 219, 1)',
        ],

        netData: [
          [65, 59, 90, 81, 56, 55, 40],
          [34, 56, 89, 56, 12, 89, 45]
        ],
        netSeries: ['入带宽(kb/s)','出带宽(kb/s)'],
        netBackgroundColor: [
          'rgba(31, 200, 219, 1)',
          'rgba(151, 205, 118, 1)'
        ],
      }
    },
    computed: {
      seriesData () {
        let data = {
          labels: this.labels_3
        }
        data.datasets = this.cpuSeries.map((e, i) => {
          return {
            data: this.cpuData[i],
            label: this.cpuSeries[i],
            borderColor: this.cpuBackgroundColor[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.cpuBackgroundColor[i],
            backgroundColor: this.cpuBackgroundColor[i].replace(/1\)$/, '.5)')
          }
        })
        return data
      },

      seriesMemData () {
        let data = {
          labels: this.labels_3
        }
        data.datasets = this.memorySeries.map((e, i) => {
          return {
            data: this.memoryData[i],
            label: this.memorySeries[i],
            borderColor: this.cpuBackgroundColor[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.cpuBackgroundColor[i],
            backgroundColor: this.cpuBackgroundColor[i].replace(/1\)$/, '.5)')
          }
        })
        return data
      },

      seriesNetData () {
        let data = {
          labels: this.labels_3
        }
        data.datasets = this.netSeries.map((e, i) => {
          return {
            data: this.netData[i],
            label: this.netSeries[i],
            borderColor: this.netBackgroundColor[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.netBackgroundColor[i],
            backgroundColor: this.netBackgroundColor[i].replace(/1\)$/, '.5)')
          }
        })
        return data
      },
    },

    props: {
      title: {
        type: String,
        default () {
          return '运行中的IDE';
        }
      },
      status: {
        type: Number,
        default (){
          return 1;
        }
      },
      showLine: {
        type: Boolean,
        default (){
          return true;
        }
      }
    },

    methods: {
      stats: function(datadatil) {
        var self = this;
        console.log('stats');
        var option = {
          param: {
            containerName: datadatil.id,
          },
          cb: function(res) {
            if(res.status == 200){
                var data = res.data;

                if(data.code == 200) {
                    var stats = JSON.parse(data.fields);
                    console.log(stats);

                    //CPU
                    console.log(stats.cpu_stats);
                    console.log(stats.cpu_stats.system);
                    console.log(stats.cpu_stats.system_cpu_usage);
                    var totalCPU = stats.cpu_stats.system_cpu_usage;
                    var usage = stats.cpu_stats.cpu_usage.total_usage;
                    usage = ((usage / totalCPU) * 100).toFixed(2);
                    self.cpuData.push(usage);

                    if(self.cpuData.length > 7) {
                        self.cpu.data.splice(0, 1);
                    }

                    //Memory

                    var memory = stats.memory_stats;
                    var totalMemory = memory.limit;
                    var usage = (memory.usage / totalMemory * 100).toFixed(2);
                    self.memoryData.push(usage);

                    if(self.memory.data.length > 7) {
                        self.memory.data.splice(0, 1);
                    }

                    //Network

                    var network = stats.networks.eth0;
                    var rx = (network.rx_bytes / 1024).toFixed(2);
                    var tx = (network.tx_bytes / 1024).toFixed(2);

                    self.network[1].push(rx);
                    self.network[2].push(tx);

                    if(self.network.inner.length > 7) {
                        self.network.inner.splice(0, 1);
                        self.network.outer.splice(0, 1);
                    }

                    }else {
                      console.log(data.message);
                    }
                  }

                },
                url: "container/stats"
            };
            services.Common.containerOperate(option);
      },

      init: function(cur) {
        var _self = this;
        var options = {
            param: {
                cur: cur,
                limit: 15,
                status: _self.status,
                show: 'id_name_port_source_domain_members_team_creator'
            },
            url: "applications",
            ctx: _self,
        };
        services.Common.list(options);
      },

      mounted: function(modal) {
        this.dockerDetailForm = modal;
        this.init(1);
      },
      openMonitor: function(data) {
        this.dockerDetailForm.open();
        this.dockerDetail = data;
        this.stats(data);
      },
      pageChanged: function(currentPage) {
        this.init(currentPage.currentPage);
      },

      save: function(modal) {
        this.dockerDetailForm.close();
      },

      refreshDocker: function(data) {
        openNotification({
          title: '重启Docker',
          message: '重启Docker成功',
          type: 'primary'
        })
      },

      stopDocker: function(data) {
        var Modal = openAlertModal({
          title: '停止Docker',
          body: '确定要停止此Docker吗，一旦停止所有运行中的程序都将暂停',
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
      }
    },

    components: {
      ViewTable,
      CardModal,
      Chart,
    }

  }

</script>

<style lang="scss">


</style>
