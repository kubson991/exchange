<template>
  <div class="flex-col">
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ percenFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
          @click="toggleConverter"
            class="
              bg-green-500
              hover:bg-green-700
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
             {{fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD`}}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
              v-model="convertValue"
                id="convertValue"
                type="number"
                class="
                  text-center
                  bg-white
                  focus:outline-none focus:shadow-outline
                  border border-gray-300
                  rounded-lg
                  py-2
                  px-4
                  block
                  w-full
                  appearance-none
                  leading-normal
                "
                :placeholder="`valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>
          <span class="text-xl">{{ converResult }} {{fromUsd ? asset.symbol: `USD`}}</span>
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />
    </template>
  </div>
</template>
<script>
import api from "@/api.js";
import { dollarFilter, percenFilter } from "@/filters";
export default {
  name: "CoinDetail",

  data() {
    return {
      asset: {},
      history: [],
      fromUsd: true,
      convertValue: null,
    };
  },
  computed: {
    converResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;

      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      let sum = 0;
      let promedio = 0;
      this.history.forEach((element) => {
        sum = sum + parseFloat(element.priceUsd);
      });
      promedio = sum / this.history.length;
      return promedio.toFixed(2);
    },
  },
  setup() {
    return {
      dollarFilter,
      percenFilter,
    };
  },
  watch: {
    $route() {
      this.getCoin();
    },
  },
  created() {
    this.getCoin();
  },
  methods: {
    toggleConverter(){
      this.fromUsd=!this.fromUsd
    },
    getCoin() {
      const id = this.$route.params.id;
      Promise.all([api.getAsset(id), api.getAssetHistory(id)]).then(
        ([asset, history]) => {
          this.asset = asset;
          this.history = history;
        }
      );
    },
  },
};
</script>
