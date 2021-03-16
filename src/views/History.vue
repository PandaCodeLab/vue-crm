<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет. <router-link to="/record">Добавить запись.</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map((rec) => ({
      amount: rec.amount,
      date: rec.date,
      type: rec.type,
      description: rec.description,
      id: rec.id,
      catTitle: categories.find((cat) => cat.id === rec.catId).title,
    }));

    this.loading = false;
  },
  components: {
    HistoryTable,
  },
};
</script>
