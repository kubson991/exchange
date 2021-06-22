<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-5">
        <div class="flex items-center flex-shrink-0 text-white mr-6  ">
          <pxIcon class="mr-3"></pxIcon>
          <router-link
            class="font-semibold text-xl tracking-tight"
            :to="{ name: 'home' }"
            >PlatziExchange</router-link
          >
        </div>
        <div
          class="
            hidden
            sm:block
            w-6/6
            blok
            lg:flex lg:items-center lg:wauto
          "
        >
          <div class="text-sm lg:flex-grow">
            <router-link
              v-for="l in links"
              :key="l.title"
            :to="l.to"
              class="
                block
                mt-4
                lg:inline-block lg:mt-0
                text-teal-200
                hover:text-white
                mr-4
              "
            >{{l.title}}</router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import pxIcon from "@/components/pxIcon";

export default {
  name: "pxHeader",
  components: { pxIcon },
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
