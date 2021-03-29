<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить категорию.</router-link>
    </p>

    <p class="center" v-else-if="!records.length">
      Записей пока нет. <router-link to="/record">Добавить запись.</router-link>
    </p>

    <section v-else>
      <HistoryTable :page="page" :pageSize="pageSize" :records="records" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('HistoryTitle')
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    console.log(this.records.length)
    console.log(this.categories.length)

    if (!!this.records.length && !!this.categories.length) {
      this.setup(this.records, this.categories)
    }

    this.loading = false
  },
  methods: {
    setup(records, categories) {
      this.setupPagination(
        records.map(rec => ({
          amount: rec.amount,
          date: rec.date,
          type: rec.type,
          description: rec.description,
          id: rec.id,
          catTitle: categories.find(cat => cat.id === rec.catId).title
        }))
      )

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [
          {
            label: 'Расходы по категориям',
            data: categories.map(cat => {
              return records
                .filter(r => r.catId === cat.id)
                .filter(r => r.type === 'outcome')
                .reduce((total, record) => {
                  return (total += +record.amount)
                }, 0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>
