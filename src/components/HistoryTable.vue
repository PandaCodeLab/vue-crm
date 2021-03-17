<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, i) in records" :key="rec.date">
        <td>{{ i + 1 + (page - 1) * pageSize }}</td>
        <td>{{ rec.amount | currency }}</td>
        <td>{{ rec.date | date("datetime") }}</td>
        <td>{{ rec.catTitle }}</td>
        <td>
          <span
            class="white-text badge"
            :class="{
              red: rec.type === 'outcome',
              green: rec.type === 'income',
            }"
            >{{ rec.type === "outcome" ? "Расход" : "Доход" }}</span
          >
        </td>
        <td>
          <button
            v-tooltip="rec.description"
            class="btn-small btn"
            @click="$router.push('/detail-record/' + rec.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "historyTable",
  props: {
    records: {
      required: true,
      type: Array,
    },
    page: {
      required: true,
    },
    pageSize: {
      required: true,
    },
  },
};
</script>
