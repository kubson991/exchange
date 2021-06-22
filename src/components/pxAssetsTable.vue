<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: sortOrder === 1, down: sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="
              bg-gray-100
              focus:outline-none
              border-b border-gray-400
              py-2
              px-4
              block
              w-full
              appearance-none
              leading-normal
            "
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`"
            :alt="a.name"
          />
        </td>
        <td>
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: a.id } }"
          >
            {{ a.name }}</router-link
          >
          <small class="m-1 tex-gray-500">
            {{ a.symbol }}
          </small>
        </td>
        <td>{{ dollarFilter(a.priceUsd) }}</td>
        <td>{{ dollarFilter(a.marketCapUsd) }}</td>
        <td
          :class="
            a.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ percenFilter(a.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block mb-5">
          <px-button v-on:click="goTocoin(a.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dollarFilter, percenFilter } from "@/filters";
import PxButton from "@/components/pxButton";
export default {
  name: "pxAssetsTable",
  components: { PxButton },
  data() {
    return {
      filter: "",
      sortOrder: 1,
    };
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? 1 : -1;
      return (
        this.assets
          .filter((a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase())
          )
          .sort((a, b) => {
            if (parseInt(a.rank) > parseInt(b.rank)) {
              return this.sortOrder;
            }
            return altOrder;
          }) ||
        this.assets
          .filter((a) =>
            a.name.toLowerCase().includes(this.filter.toLowerCase())
          )
          .sort((a, b) => {
            if (parseInt(a.rank) > parseInt(b.rank)) {
              return this.sortOrder;
            }
            return altOrder;
          })
      );
    },
  },
  methods: {
    goTocoin(id) {
      console.log("se pudo");
      this.$router.push({ name: "coin-detail", params: { id } });
    },
    changeSortOrder() {
      if (this.sortOrder === 1) {
        this.sortOrder = -1;
      } else {
        this.sortOrder = 1;
      }
    },
  },
  setup() {
    return {
      dollarFilter,
      percenFilter,
    };
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
