<template>
  <div class="Main">
    <div class="div-header">
      <h1>Covid-19 Dashboard</h1>
    </div>
    <div class="div-buttons" />
    <div class="div-body">
      <div class="div-datepicker">
        <v-date-picker
          v-model="range"
          is-range
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
              >
              ~
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
              >
            </div>
          </template>
        </v-date-picker>
      </div>
      <div class="div-chart">
        <wj-flex-chart
          :initialized="initChart"
          :items-source="data"
          binding-x="createDt"
          selection-mode="Point"
          binding-x-type="DATE"
          date-format="yyyy-MM-dd"
          chart-type="Line"
          :palette="palette"
        />
      </div>
    </div>
  </div>
</template>

<script src="./Main.js" />
<style src="./Main.scss" lang="scss" />