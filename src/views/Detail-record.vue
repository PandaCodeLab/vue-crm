<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb"> {{ record.typeName }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.catTitle }}</p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>
      Такой записи нет! <router-link to="/record">Добавить запись.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "detail-record",
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const recordId = this.$route.params.id;

    const record = await this.$store.dispatch("fetchRecordById", recordId);

    if (Object.keys(record).length) {
      const category = await this.$store.dispatch(
        "fetchCategoryById",
        record.catId
      );

      this.record = {
        ...record,
        catTitle: category.title,
        typeClass: record.type === "outcome" ? "red" : "green",
        typeName: record.type === "outcome" ? "Расход" : "Доход",
      };
    }

    this.loading = false;
  },
};
</script>
