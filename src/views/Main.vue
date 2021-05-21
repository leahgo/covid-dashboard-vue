<template>
  <div class="Main">
    <div class="div-header">
      <h1>Covid Dashboard</h1>
    </div>
    <div class="div-buttons" />
    <div class="div-body">
      <h1>Charts</h1>
      <wj-flex-chart
        :initialized="initChart"
        :items-source="data"
        binding-x="createDt"
        selection-mode="Point"
        binding-x-type="DATE"
        date-format="yyyy-MM-dd"
        chart-type="Line"
      />
    </div>
  </div>
</template>

<script src="./Main.js" />
<style src="./Main.scss" lang="scss" />